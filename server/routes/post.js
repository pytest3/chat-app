import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const posts = await req.context.models.post.findAll();
  res.send(posts);
});

router.get("/liked", async (req, res) => {
  const liked_posts = await req.context.models.liked_post.findAll();
  res.send(liked_posts);
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await req.context.models.post.findByPk(postId);
  res.send(post);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const createdpost = await req.context.models.post.create({
    text,
    userId: req.context.me.id,
  });
  res.send(createdpost);
});

router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const deletedpost = await req.context.models.post.findOne({
    where: { id: postId },
  });
  await req.context.models.post.destroy({
    where: { id: postId },
  });
  res.send(deletedpost);
});

// router.delete("/:postId", (req, res) => {
//   const id = req.params.postId;
//   const { [id]: post, ...otherposts } = req.context.models.posts;
//   req.context.models.posts = otherposts;
//   res.send(req.context.models.posts);
// });

export default router;
