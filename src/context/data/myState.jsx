import { useEffect, useState, useRef } from "react";
import localforage from "localforage";
import BlogContext from "./myContext";

/*
  myState.jsx using localForage (IndexedDB wrapper).
  - Loads asynchronously on mount
  - Avoids overwriting until load completes
  - Persists changes async
  - Ready for later server-sync hooks
*/

localforage.config({
  name: "BlogPort",
  storeName: "blogs_store", 
});

export default function BlogState({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const savingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const saved = await localforage.getItem("blogs");
        if (!cancelled && Array.isArray(saved)) {
          setBlogs(saved);
        }
      } catch (err) {
        console.error("Failed to load blogs from IndexedDB:", err);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (savingRef.current) return;
    savingRef.current = true;
    (async () => {
      try {
        await localforage.setItem("blogs", blogs);
      } catch (err) {
        console.error("Failed to save blogs to IndexedDB:", err);
      } finally {
        savingRef.current = false;
      }
    })();
  }, [blogs, loaded]);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const syncBlogToServer = async (blog) => {
    // POST /api/blogs or use supabase/storage
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog, loaded }}>
      {children}
    </BlogContext.Provider>
  );
}
