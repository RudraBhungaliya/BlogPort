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
  const [user, setUser] = useState(null);
  const savingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const savedBlogs = await localforage.getItem("blogs");
        const savedUser = await localforage.getItem("user");
        if (!cancelled) {
          if (Array.isArray(savedBlogs)) setBlogs(savedBlogs);
          if (savedUser) setUser(savedUser);  
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
        await localforage.setItem("user", user);
      } catch (err) {
        console.error("Failed to save to IndexedDB:", err);
      } finally {
        savingRef.current = false;
      }
    })();
  }, [blogs, user, loaded]);


  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const loginUser = (username) => {
    setUser({
      username,       
      role: "author", 
    });
  };
  
  const logoutUser = () => setUser(null);

  const syncBlogToServer = async (blog) => {
    // POST /api/blogs or use supabase/storage
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog, loaded, user, loginUser, logoutUser }}>
      {children}
    </BlogContext.Provider>
  );
}
