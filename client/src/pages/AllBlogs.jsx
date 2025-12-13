import { useContext, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function AllBlogs() {
  const { blogs, loaded } = useContext(BlogContext);

  if (!loaded) return <Loader />;

  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.content.toLowerCase().includes(q)
  );

  return (
    <main className="max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Blogs</h1>

      <input
        type="text"
        value={query}
        placeholder="Search blogs..."
        className="w-full mb-6 p-2 border rounded"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length === 0 && <p>No blogs found.</p>}

        {filteredBlogs.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
