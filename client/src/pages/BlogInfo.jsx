import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function BlogInfo() {
  const { id } = useParams();
  const { blogs, loaded } = useContext(BlogContext);
  const [liked, setLiked] = useState(false);

  if (!loaded) return <Loader />;

  const blog = blogs.find((b) => b._id === id);

  if (!blog) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <a href="/blogs" className="text-blue-600 underline mt-3 block">
          Go back to all blogs
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        {blog.title}
      </h1>

      {/* Author + Date */}
      <div className="flex items-center gap-4 mt-4 text-gray-600 text-sm">
        <span className="font-medium">{blog.userId?.name || "Unknown User"}</span>
        <span>•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mt-10 leading-relaxed text-gray-800 whitespace-pre-line">
        {blog.content}
      </div>

      {/* LIKE BUTTON - UI only, not DB */}
      <div className="mt-10 flex items-center gap-3">
        <button
          onClick={() => setLiked(!liked)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          👍 Like ({liked ? 1 : 0})
        </button>
      </div>

      {/* COMMENTS - Removed because backend does NOT support comments */}
      <div className="mt-12 border-t pt-6 flex justify-between text-sm text-gray-600">
        <a href="/blogs" className="hover:text-blue-600 transition">
          ← Back to all blogs
        </a>
        <a href="/" className="hover:text-blue-600 transition">
          Home →
        </a>
      </div>
    </main>
  );
}
