import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function BlogInfo() {
  const { id } = useParams();
  const { blogs, loaded, token, toggleLike, addComment } = useContext(BlogContext);
  const [isLiking, setIsLiking] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

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

  const handleLike = async () => {
    if (!token) return alert("Please login to like posts");
    setIsLiking(true);
    await toggleLike(blog._id);
    setIsLiking(false);
  };

  const handleAddComment = async () => {
    if (!token) return alert("Please login to comment");
    if (!commentText.trim()) return;
    setIsCommenting(true);
    const res = await addComment(blog._id, commentText.trim());
    setIsCommenting(false);
    if (!res.error) setCommentText("");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>

      {/* Author + Date */}
      <div className="flex items-center gap-4 mt-4 text-gray-600 text-sm">
        <span className="font-medium">{blog.userId?.name || "Unknown User"}</span>
        <span>•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Excerpt */}
      {blog.excerpt && (
        <p className="mt-4 text-lg text-gray-700 italic">{blog.excerpt}</p>
      )}

      {/* Cover Image */}
      {blog.cover && (
        <div className="mt-6 w-full flex justify-center">
          <img src={blog.cover} alt={blog.title} className="max-h-96 object-contain" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mt-10 leading-relaxed text-gray-800 whitespace-pre-line">{blog.content}</div>

      {/* LIKE BUTTON */}
      <div className="mt-10 flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          👍 Like ({blog.likesCount ?? blog.likes?.length ?? 0})
        </button>
      </div>

      {/* COMMENTS */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Comments</h3>

        <div className="space-y-4">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((c) => (
              <div key={c._id} className="border p-3 rounded">
                <div className="text-sm font-medium">{c.userId?.name || 'Unknown'}</div>
                <div className="text-sm text-gray-700">{c.text}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No comments yet.</div>
          )}
        </div>

        <div className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Write a comment..."
          />
          <div className="mt-2">
            <button onClick={handleAddComment} disabled={isCommenting} className="px-4 py-2 bg-green-600 text-white rounded">
              {isCommenting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-6 flex justify-between text-sm text-gray-600">
        <a href="/blogs" className="hover:text-blue-600 transition">← Back to all blogs</a>
        <a href="/" className="hover:text-blue-600 transition">Home →</a>
      </div>
    </main>
  );
}