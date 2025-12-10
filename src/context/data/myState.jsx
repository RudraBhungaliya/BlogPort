import { useState, useEffect } from "react";
import BlogContext from "./myContext";

export default function BlogState({ children }) {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("blogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs, loaded]);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog }}>
      {children}
    </BlogContext.Provider>
  );
}
