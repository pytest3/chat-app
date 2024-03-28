import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const user = await req.context.models.user.findOne({
    where: { id: req.context.me.id },
  });
  res.send(user);
});

export default router;
