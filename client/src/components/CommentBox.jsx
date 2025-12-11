import { useState, useContext } from "react";
import BlogContext from "../context/data/myContext";

export default function CommentBox({ blog }) {
  const [text, setText] = useState("");
  const { updateBlog } = useContext(BlogContext); // MUST have updateBlog

  const handleAdd = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };

    // FIX: use fallback for old blogs without comments
    const updatedBlog = {
      ...blog,
      comments: [...(blog.comments || []), newComment],
    };

    updateBlog(updatedBlog); // MUST run
    setText("");
  };

  return (
    <div className="mb-6">
      <textarea
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
        rows="3"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAdd}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Comment
      </button>
    </div>
  );
}
