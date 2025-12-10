import { useParams } from "react-router-dom";
import { useContext } from "react";
import BlogContext from "../context/data/myContext";

export default function BlogInfo() {
  const { id } = useParams(); // GET ID PROPERLY
  const { blogs } = useContext(BlogContext);

  // Find blog by ID
  const blog = blogs.find((b) => b.id === id);

  // If blog not found (user manually enters URL)
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
        <span className="font-medium">{blog.author}</span>
        <span>•</span>
        <span>{blog.date}</span>
      </div>

      {/* Cover Image */}
      {blog.cover && (
        <img
          src={blog.cover}
          alt="Blog Cover"
          className="w-full mt-8 rounded-2xl shadow-lg"
        />
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mt-10 leading-relaxed text-gray-800 whitespace-pre-line">
        {blog.content}
      </div>

      {/* Actions */}
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
