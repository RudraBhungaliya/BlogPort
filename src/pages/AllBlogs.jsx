import { useContext } from "react";
import BlogCard from "../components/BlogCard";
import BlogContext from "../context/data/myContext";

export default function AllBlogs() {
  const { blogs } = useContext(BlogContext);

  return (
    <main className="max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Blogs</h1>

      <input
        type="text"
        placeholder="Search blogs..."
        className="w-full mb-6 p-2 border rounded"
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length === 0 && <p>No blogs yet.</p>}

        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
