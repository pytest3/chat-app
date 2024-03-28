const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await req.context.models.user.findOne({
    where: { id: req.context.me.id },
  });
  res.send(user);
});

module.exports = router;
