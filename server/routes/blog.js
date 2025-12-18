import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ===================== CREATE BLOG ===================== */
router.post("/", auth, async (req, res) => {
  try {
    const { title, excerpt, content, cover } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      cover: cover || "",
      userId: req.userId,
    });

    await blog.populate("userId", "name");

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== GET ALL BLOGS ===================== */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name")
      .populate("comments.userId", "name")
      .populate("comments.replies.userId", "name");

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== GET SINGLE BLOG ===================== */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("userId", "name")
      .populate("comments.userId", "name")
      .populate("comments.replies.userId", "name");

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== LIKE / UNLIKE BLOG ===================== */
router.post("/:id/like", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const index = blog.likes.findIndex((id) => id.toString() === req.userId);

    if (index === -1) blog.likes.push(req.userId);
    else blog.likes.splice(index, 1);

    await blog.save();

    res.json({ likes: blog.likes.length });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== ADD COMMENT ===================== */
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "Comment text required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    blog.comments.push({
      userId: req.userId,
      text,
    });

    await blog.save();

    const populatedBlog = await Blog.findById(req.params.id)
      .populate("comments.userId", "name")
      .populate("comments.replies.userId", "name");

    await blog.populate("comments.userId", "name");

    res.json({ comments: populatedBlog.comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== LIKE / UNLIKE COMMENT ===================== */
router.post("/:blogId/comment/:commentId/like", auth, async (req, res) => {
  const { blogId, commentId } = req.params;
  const userId = req.userId;

  const blog = await Blog.findById(blogId);
  if (!blog) return res.status(404).json({ msg: "Blog not found" });

  const comment = blog.comments.id(commentId);
  if (!comment) return res.status(404).json({ msg: "Comment not found" });

  const index = comment.likes.findIndex((id) => id.toString() === userId);

  if (index === -1) comment.likes.push(userId);
  else comment.likes.splice(index, 1);

  await blog.save();

  const populatedBlog = await Blog.findById(blogId)
    .populate("comments.userId", "name")
    .populate("comments.replies.userId", "name");

  const updatedComment = populatedBlog.comments.id(commentId);
  res.json(updatedComment);
});

/* ===================== REPLY TO COMMENT ===================== */
router.post("/:blogId/comment/:commentId/reply", auth, async (req, res) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ msg: "Reply text required" });
  }

  const blog = await Blog.findById(blogId);
  if (!blog) return res.status(404).json({ msg: "Blog not found" });

  const comment = blog.comments.id(commentId);
  if (!comment) return res.status(404).json({ msg: "Comment not found" });

  comment.replies.push({
    userId: req.userId,
    text,
    createdAt: new Date(),
  });

  await blog.save();

  const populatedBlog = await Blog.findById(blogId)
    .populate("comments.userId", "name")
    .populate("comments.replies.userId", "name");

  const updatedComment = populatedBlog.comments.id(commentId);
  res.json(updatedComment);
});

/* ===================== DELETE REPLY ===================== */
router.delete(
  "/:blogId/comment/:commentId/reply/:replyId",
  auth,
  async (req, res) => {
    const { blogId, commentId, replyId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ msg: "Blog not founf" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ msg: "Reply not found" });

    if (reply.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this reply" });
    }

    reply.deleteOne();
    await blog.save();

    const populatedBlog = await Blog.findById(blogId)
      .populate("comments.userId", "name")
      .populate("comments.replies.userId", "name");

    const updatedComment = populatedBlog.comments.id(commentId);
    res.json(updatedComment);
  }
);

/* ===================== UPDATE BLOG ===================== */
router.put("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    Object.assign(blog, req.body);
    await blog.save();
    await blog.populate("userId", "name");

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ===================== DELETE BLOG ===================== */
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
