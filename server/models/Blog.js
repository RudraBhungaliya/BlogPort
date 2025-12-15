import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);