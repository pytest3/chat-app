const express = require("express");
const router = express.Router();

//get all conversations
router.get("/", async (req, res) => {
  const allConvos = await req.context.models.conversation.findAll({
    include: req.context.models.message,
  });
  res.send(allConvos);
});

//get conversations of current user
router.get("/user", async (req, res) => {
  if (!req.context.me) {
    return res.status(400).send({ message: "User does not exist in db" });
  }

  const currentUser = await req.context.models.user.findByPk(req.context.me.id);
  const userConvos = await currentUser.getConversations({
    include: [
      {
        model: req.context.models.message,
        attributes: { exclude: ["createdAt", "updatedAt", "conversationId"] },
      },
      {
        model: req.context.models.user,
        attributes: ["id", "name", "email"],
        through: {
          attributes: ["joined_timestamp", "left_timestamp"],
        },
      },
    ],
    joinTableAttributes: [],
  });

  res.send(userConvos);
});

//get conversations by conversation id
router.get("/:convoId", async (req, res) => {
  const user = await req.context.models.user.findOne({
    where: { id: req.context.me.id },
  });
  const conversations = await user.getConversations({
    where: {
      id: req.params.convoId,
    },
    include: [
      { model: req.context.models.message },
      { model: req.context.models.user },
    ],
  });

  res.send(conversations);
});

// create conversation
router.post("/create", async (req, res) => {
  const convoExists = await req.context.models.conversation.findOne({
    where: { name: req.body.convoName },
  });

  if (convoExists) return res.send({ convoId: convoExists.id });

  const convo = await req.context.models.conversation.create({
    name: req.body.convoName,
  });

  const convoParticipants = [
    { name: req.context.me.name },
    { name: req.body.username },
  ];

  console.log("convoParticipants", convoParticipants);

  for (const participant of convoParticipants) {
    const user = await req.context.models.user.findOne({
      where: { name: participant.name },
    });
    await user.addConversation(convo.id, {
      through: {
        conversationId: convo.id,
        userId: user.id,
        joined_timestamp: new Date(),
      },
    });
  }

  const createdConvo = await req.context.models.conversation.findOne({
    where: { id: convo.id },
    include: [
      {
        model: req.context.models.user,
      },
    ],
  });

  console.log("createdConvo!!", createdConvo.id);

  res.send({ convoId: createdConvo.id });
});

//get conversations of user by user id
// router.get("/:id", async (req, res) => {
//   const user = await req.context.models.user.findByPk(req.params.id);
//   const userConvos = await user.getConversations({
//     attributes: { exclude: ["createdAt", "updatedAt"] },
//     include: [{ model: req.context.models.message }],
//     joinTableAttributes: { exclude: ["createdAt", "updatedAt"] },
//   });
//   res.send(userConvos);
// });

module.exports = router;
