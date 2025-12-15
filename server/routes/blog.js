import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE BLOG
router.post("/", auth, async (req, res) => {
  try {
    const { title, excerpt, content, cover } = req.body;

    if (!title || !content)
      return res.status(400).json({ msg: "Title and content are required" });

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

// GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name")
      .populate({ path: 'comments.userId', select: 'name' });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET SINGLE BLOG
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("userId", "name")
      .populate({ path: 'comments.userId', select: 'name' });

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LIKE / UNLIKE
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    const userId = req.userId;
    const index = blog.likes.findIndex((id) => id.toString() === userId);

    if (index === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(index, 1);
    }

    const updated = await blog.save();
    await updated.populate('userId', 'name');
    await updated.populate({ path: 'comments.userId', select: 'name' });

    res.json({ likes: updated.likes.length, liked: index === -1 });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ADD COMMENT
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'Comment text required' });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    blog.comments.push({ userId: req.userId, text });
    const updated = await blog.save();
    await updated.populate('userId', 'name');
    await updated.populate({ path: 'comments.userId', select: 'name' });

    res.json({ comments: updated.comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE BLOG
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, excerpt, content, cover } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.userId.toString() !== req.userId)
      return res.status(403).json({ msg: "Not authorized" });

    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.cover = cover ?? blog.cover;

    const updated = await blog.save();
    await updated.populate("userId", "name");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE BLOG
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    if (blog.userId.toString() !== req.userId)
      return res.status(403).json({ msg: "Not authorized" });

    await Blog.deleteOne({ _id: blog._id });

    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;