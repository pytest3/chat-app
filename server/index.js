require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./db/models");
const routes = require("./routes");
const http = require("http");
const { auth } = require("express-oauth2-jwt-bearer");
const { Server } = require("socket.io");

const host = "0.0.0.0";
const port = process.env.PORT || 3000;

// auth is a express-oauth2-jwt-bearer
// it is configured with API identifier (audience) and
// domain (issuerBaseUrl)
const app = express();

// create a HTTP server and supply the function handler (app)
const server = http.createServer(app);

// create an instance of socket.io that mounts on the HTTP server
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: process.env.FRONTEND_DOMAIN,
  },
});

// checkJwt is a middleware that checks if the user's access token
// included in the request is valid
const checkJwt = auth({
  audience: process.env.AUTH0_AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
  issuer: process.env.AUTH0_DOMAIN,
  jwksUri: process.env.AUTH0_JWKS_ENDPOINT,
});

app.use(cors());
app.use(bodyParser.json()); // for json data

app.use(checkJwt, async (req, res, next) => {
  const auth = req.auth;
  const decodedJWTPayload = auth.payload;
  const user = await models.user.findOne({
    where: { auth0_id: decodedJWTPayload.sub },
  });
  req.context = { models, me: user };
  next();
});

let users = [];
let messages = [];
let conversations = [];

// instantiate socket object
io.use((socket, next) => {
  let { username, sub, roomId } = socket.handshake.auth;
  socket.username = username;
  socket.sub = sub;
  socket.roomId = roomId;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id, socket.username, socket.roomId);

  // instantiate online users array
  for (let [id, socket] of io.of("/").sockets) {
    const existingUser = users.find((i) => i.username === socket.username);
    if (!existingUser) {
      users.push({
        socketId: id, // socket id
        username: socket.username,
        sub: socket.sub,
      });
    }
  }

  if (socket.roomId) {
    console.log("joining", socket.roomId.toString());
    socket.join(socket.roomId.toString());
  }

  // emit to ALL clients
  socket.emit("users", users);
  console.log("emitting users", users);

  //emit to all the other clients EXCEPT the newly created connection.
  socket.broadcast.emit("user connected", {
    socketId: socket.id,
    username: socket.username,
    sub: socket.sub,
    self: false,
  });

  socket.on("join", ({ roomId }) => {
    console.log("joining", roomId.toString());
    socket.join(roomId.toString());
    io.to(socket.id).emit("roomId", roomId);
  });

  socket.on("private conversation", ({ text, to, roomId }) => {
    io.to(roomId.toString()).emit("private conversation", {
      text,
      from: socket.id,
    });
    console.log("emitting", { text, to, roomId });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected,", socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    console.log("remaining users", users);
    io.emit("users", users);
    socket.disconnect();
  });
  // socket.on("chatMessage", (msg) => {
  //   console.log("chatMessage backend ran");
  //   console.log({ msg });
  //   io.emit("chatMessageResponse", msg);
  // });

  // socket.on("initialConversations", (initialConversations) => {
  //   console.log("received convos", initialConversations);
  //   conversations = initialConversations;
  // });

  // socket.on("conversation", (conversation) => {
  //   console.log("emitting conversation", conversation);
  //   io.emit("conversation", conversation);
  // });

  // socket.onAny((event, ...args) => {
  //   console.log(event, args);
  // });
});

io.engine.on("connection_error", (err) => {
  console.log("ERR MAN");
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

app.use("/api/users", routes.user);
app.use("/api/posts", routes.post);
app.use("/api/conversations", checkJwt, routes.conversation);
app.use("/api/session", checkJwt, routes.session);
app.use("/api/messages", routes.message);

app.use((req, res) => {
  res.status(404).send("Opps, route not found");
});

server.listen(port, host, (err) => {
  if (err) {
    console.log("Error listening: ", err);
    return;
  }
  `Express app listening on port: ${port}`;
});
