// BlogState.jsx
import { useEffect, useState, useCallback } from "react";
import BlogContext from "./myContext";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function BlogState({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /* ===================== LOAD USER ===================== */
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
        if (!res.ok) throw new Error();
        setUser(await res.json());
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, [token]);

  /* ===================== LOAD BLOGS ===================== */
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API}/blogs`);
        if (!res.ok) throw new Error();
        setBlogs(await res.json());
      } catch (e) {
        console.error("Load blogs failed", e);
      } finally {
        setLoaded(true);
      }
    };

    loadBlogs();
  }, []);

  /* ===================== LIKE BLOG ===================== */
  const toggleLike = async (blogId) => {
    const res = await fetch(`${API}/blogs/${blogId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Like failed");
    const { likes } = await res.json();

    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId ? { ...b, likes: Array(likes).fill(1) } : b
      )
    );
  };

  /* ===================== ADD COMMENT ===================== */
  const addComment = async (blogId, text) => {
    const res = await fetch(`${API}/blogs/${blogId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("Comment failed");
    const { comments } = await res.json();

    setBlogs((prev) =>
      prev.map((b) => (b._id === blogId ? { ...b, comments } : b))
    );
  };

  /* ===================== DELETE REPLY ===================== */
  const deleteReply = async (blogId, commentId, replyId) => {
    const res = await fetch(
      `${API}/blogs/${blogId}/comment/${commentId}/reply/${replyId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) throw new Error("Delete reply failed");

    const updatedComment = await res.json();

    setBlogs((prev) =>
      prev.map((b) =>
        b._id !== blogId
          ? b
          : {
              ...b,
              comments: b.comments.map((c) =>
                c._id === commentId ? updatedComment : c
              ),
            }
      )
    );
  };

  /* ===================== LIKE COMMENT ===================== */
  const likeComment = useCallback(
    async (blogId, commentId) => {
      const res = await fetch(
        `${API}/blogs/${blogId}/comment/${commentId}/like`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Comment like failed");

      const updatedComment = await res.json();

      setBlogs((prev) =>
        prev.map((b) =>
          b._id !== blogId
            ? b
            : {
                ...b,
                comments: b.comments.map((c) =>
                  c._id === commentId ? updatedComment : c
                ),
              }
        )
      );
    },
    [token]
  );

  /* ===================== REPLY TO COMMENT ===================== */
  const replyToComment = useCallback(
    async (blogId, commentId, text) => {
      const res = await fetch(
        `${API}/blogs/${blogId}/comment/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!res.ok) throw new Error("Reply failed");

      const updatedComment = await res.json();

      setBlogs((prev) =>
        prev.map((b) =>
          b._id !== blogId
            ? b
            : {
                ...b,
                comments: b.comments.map((c) =>
                  c._id === commentId ? updatedComment : c
                ),
              }
        )
      );
    },
    [token]
  );

  /* ===================== DELETE COMMENT ===================== */
  const deleteComment = async (blogId, commentId) => {
    const res = await fetch(`${API}/blogs/${blogId}/comment/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Delete comment failed");

    const { comments } = await res.json();

    setBlogs((prev) =>
      prev.map((b) => (b._id === blogId ? { ...b, comments } : b))
    );
  };

  /* ===================== ADD BLOG ===================== */
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
        const err = await res.json();
        return { error: err.msg || "Create blog failed" };
      }

      const newBlog = await res.json();

      setBlogs((prev) => [newBlog, ...prev]);

      return newBlog;
    } catch (err) {
      console.error("Add blog error:", err);
      return { error: "Network error" };
    }
  };

  /* ===================== EDIT BLOG ===================== */
  const editBlog = async (blogId, updatedData) => {
    try {
      const res = await fetch(`${API}/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const err = await res.json();
        return { error: err.msg || "Edit failed" };
      }

      const updatedBlog = await res.json();

      setBlogs((prev) => prev.map((b) => (b._id === blogId ? updatedBlog : b)));

      return updatedBlog;
    } catch (err) {
      console.error("Edit blog error:", err);
      return { error: "Network error" };
    }
  };

  /* ===================== DELETE BLOG ===================== */
  const deleteBlog = async (blogId) => {
    try {
      const res = await fetch(`${API}/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        return { error: err.msg || "Delete failed" };
      }

      setBlogs((prev) => prev.filter((b) => b._id !== blogId));

      return { success: true };
    } catch (err) {
      console.error("Delete blog error:", err);
      return { error: "Network error" };
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loaded,
        user,
        token,
        setToken,
        toggleLike,
        addComment,
        likeComment,
        replyToComment,
        deleteReply,
        deleteComment,
        addBlog,
        editBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
