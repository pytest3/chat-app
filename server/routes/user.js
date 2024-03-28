const express = require("express");
const router = express.Router();
const capitalizeName = require("../utils");

// list all users
router.get("/", async (req, res) => {
  const users = await req.context.models.user.findAll();
  res.send(users);
});

// create user
router.post("/create", async (req, res) => {
  console.log("creating user...");
  const { name, email, auth0_id } = req.body;
  const [user, created] = await req.context.models.user.findOrCreate({
    where: { name: capitalizeName(name), email },
    defaults: { auth0_id },
  });
  res.send([user, created]);
});

// update user
router.put("/update/:id", async (req, res) => {
  const user = await req.context.models.user.findByPk(req.params.id);
  await user.update(req.body);
  const updatedUser = await user.save();
  res.send(updatedUser);
});

// find user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await req.context.models.user.findByPk(id);
  res.send(user);
});

// find user by id
// router.get("/:auth0_id", async (req, res) => {
//   const auth0_id = req.params.auth0_id;
//   const user = await req.context.models.user.findOne({
//     where: { auth0_id: auth0_id },
//   });

//   if (!user) {
//     res.send(null);
//   }

//   res.send(user);
// });

// get user's liked posts
router.get("/:id/liked-posts", async (req, res) => {
  const id = req.params.id;
  const user = await req.context.models.user.findByPk(id);
  const liked_posts = await user.getLiked_posts({
    include: req.context.models.post,
  });
  res.send(liked_posts);
});

// get user's conversations and messages
router.get("/:id/conversations", async (req, res) => {
  const conversations = await req.context.models.user.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "email"],
    include: {
      model: req.context.models.conversation,
      attributes: ["id", "name"], // specify attributes for queries of 1-m models
      // through: { attributes: [] }, // remove all attributes of junction table
      include: { model: req.context.models.message },
    },
  });

  res.send(conversations);
});

module.exports = router;
