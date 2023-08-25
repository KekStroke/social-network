const express = require("express");

const { Post } = require("../models/index");

const { authenticateToken } = require("../middlewares/authentication");

const upload = require('../utils/multer.utils')

const router = express.Router();

router.get("/", async (req, res) => {
  const authorId = req.query.authorId;

  try {
    const filteredPosts = await Post.findAll({
      where: { authorId },
      raw: true,
    });
    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post(
  "/",
  [authenticateToken, upload.array("images", 10)],
  async (req, res) => {
    const user = req.user;

    const { content, images } = req.body;
    const files = req.files;
    console.log(files);

    try {
      const newPost = await user.createPost({ content, images });
      await newPost.validate();
      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  }
);

router.patch("/:id", authenticateToken, async (req, res) => {
  const user = req.user;

  const postId = req.params.id;
  const { content, images } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.sendStatus(404); // Not Found
    }
    if (!user.hasPost(post)) {
      return res.sendStatus(403); // Forbidden
    }

    if (content) post.content = content;
    if (images) post.images = images;
    await post.save();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const user = req.user;

  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.sendStatus(404); // Not Found
    }
    if (!user.hasPost(post)) {
      return res.sendStatus(403); // Forbidden
    }

    await post.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
