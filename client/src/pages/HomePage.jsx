import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function HomePage() {
  const { blogs, loaded } = useContext(BlogContext);

  if(!loaded) return <Loader />;

  const latest = [...blogs].reverse().slice(0, 6);

  return (
    <main className="max-w-7xl mx-auto px-5 py-8">
      <section className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">BlogPort</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Publish your ideas. Read interesting posts. Simple and fast.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="/blogs" className="px-4 py-2 bg-blue-600 text-white rounded">
            Explore blogs
          </a>
          <a href="/dashboard" className="px-4 py-2 border rounded">
            Dashboard
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest posts</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full object-cover">
          {latest.length === 0 && <p>No posts yet.</p>}

          {latest.map((p) => (
            <BlogCard key={p._id} post={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
