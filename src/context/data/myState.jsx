import { useState, useEffect } from "react";
import BlogContext from "./myContext";

export default function BlogState({ children }) {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("blogs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) => {
      prev.map((e) => {
        e.id === updateBlog.id ? updatedBlog : b;
      });
    });
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog }}>
      {children}
    </BlogContext.Provider>
  );
}
