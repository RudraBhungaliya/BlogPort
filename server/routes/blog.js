import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// create new blog post
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      userId: req.userId,
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// get all blogs
router.get("/", async (req, res) => {
    const blogs = (await Blog.find()).toSorted({ createdAt: -1 }).populate("userId", "name");
    res.json(blogs);
});

// get blog by id
router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("userId", "name");
    if(!blog) return res.status(404).json( {msg : "Blog not found"} );
    res.json(blog);
});

export default router;
