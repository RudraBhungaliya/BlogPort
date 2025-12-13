// BlogState.jsx
import { useEffect, useState } from "react";
import BlogContext from "./myContext";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function BlogState({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Load user when token changes (persist login across pages)
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // invalid token or server error
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
      }
    };

    loadUser();
  }, [token]);

  // LOAD ALL BLOGS
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API}/blogs`);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ msg: "Server Error" }));
          throw new Error(errorData.msg || `HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API returned invalid data");
        }

        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      } finally {
        setLoaded(true);
      }
    };

    loadBlogs();
  }, []);


  // CREATE BLOG
  const addBlog = async (blogData) => {
    try {
      const res = await fetch(`${API}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Failed to create blog" }));
        return { error: errorData.msg || `HTTP error! Status: ${res.status}` };
      }

      const saved = await res.json();
      setBlogs((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error("Failed to add blog:", err);
      return { error: err.message };
    }
  };

  // UPDATE BLOG
  const updateBlog = async (id, updatedBlog) => {
    try {
      const res = await fetch(`${API}/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Failed to update blog" }));
        return { error: errorData.msg };
      }

      const updated = await res.json();

      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );

      return updated;
    } catch (err) {
      console.error("Update failed:", err);
      return { error: err.message };
    }
  };

  // DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`${API}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Failed to delete blog" }));
        return { error: errorData.msg };
      }

      setBlogs((prev) => prev.filter((b) => b._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete failed:", err);
      return { error: err.message };
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        loaded,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
