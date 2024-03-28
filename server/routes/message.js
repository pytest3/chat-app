const express = require("express");
const router = express.Router();

// create messages
router.post("/create", async (req, res) => {
  console.log("creating message");

  const { text, conversationId } = req.body;
  const convo = await req.context.models.conversation.findOne({
    where: { id: conversationId },
  });

  if (!convo) return res.send("convo not found");

  const message = await req.context.models.message.create({
    userId: req.context.me.id,
    conversationId,
    text,
    sent_timestamp: new Date(),
  });
  const updatedConvo = await convo.addMessage(message);
  res.send(updatedConvo);
});

module.exports = router;
