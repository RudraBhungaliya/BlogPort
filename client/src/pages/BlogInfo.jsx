import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function BlogInfo() {
  const { id } = useParams();

  const {
    blogs,
    loaded,
    user,
    token,
    toggleLike,
    addComment,
    likeComment,
    replyToComment,
    deleteReply,
  } = useContext(BlogContext);

  const [commentText, setCommentText] = useState("");
  const [replyBox, setReplyBox] = useState(null);
  const [replyText, setReplyText] = useState("");

  if (!loaded) return <Loader />;

  const blog = blogs.find((b) => b._id === id);

  if (!blog) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>

      {/* AUTHOR */}
      <div className="mt-2 text-sm text-gray-600">
        {blog.userId?.name || "Unknown"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>

      {/* EXCERPT */}
      {blog.excerpt && (
        <p className="mt-4 italic text-gray-700">{blog.excerpt}</p>
      )}

      {/* COVER (NOT TOUCHED) */}
      {blog.cover && (
        <div className="mt-6 flex justify-center">
          <img
            src={blog.cover}
            alt={blog.title}
            className="max-h-96 object-contain"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="mt-8 whitespace-pre-line prose max-w-none">
        {blog.content}
      </div>

      {/* BLOG LIKE */}
      <button
        onClick={() => token && toggleLike(blog._id)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        👍 Like ({blog.likes?.length || 0})
      </button>

      {/* COMMENTS */}
      <div className="mt-10">
        <h3 className="font-semibold mb-4">Comments</h3>

        {blog.comments?.length > 0 ? (
          blog.comments.map((c) => (
            <div key={c._id} className="border p-3 rounded mb-4">
              <div className="font-medium">{c.userId?.name || "Unknown"}</div>

              <div className="text-sm mt-1">{c.text}</div>

              <div className="flex gap-4 text-xs mt-2 text-gray-600">
                <button
                  onClick={() => likeComment(blog._id, c._id)}
                  className="hover:text-blue-600"
                >
                  👍 {c.likes?.length || 0}
                </button>

                <button
                  onClick={() => setReplyBox(replyBox === c._id ? null : c._id)}
                  className="hover:text-blue-600"
                >
                  Reply
                </button>
              </div>

              {/* REPLIES */}
              {c.replies?.length > 0 && (
                <div className="ml-4 mt-3 space-y-2 bg-gray-50 p-2 rounded">
                  {c.replies.map((r) => (
                    <div
                      key={r._id}
                      className="border-l pl-3 text-sm flex justify-between items-start gap-4"
                    >
                      <div>
                        <strong className="text-gray-800">
                          {r.userId?.name || "Unknown"}:
                        </strong>{" "}
                        <span className="text-gray-700">{r.text}</span>
                      </div>

                      {user && r.userId?._id === user._id && (
                        <button
                          onClick={() => deleteReply(blog._id, c._id, r._id)}
                          className="text-xs text-red-500 hover:text-red-700 whitespace-nowrap"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* REPLY BOX */}
              {replyBox === c._id && (
                <div className="mt-3 ml-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Write a reply..."
                  />
                  <button
                    onClick={() => {
                      if (replyText.trim()) {
                        replyToComment(blog._id, c._id, replyText.trim());
                      }

                      setReplyText("");
                      setReplyBox(null);
                    }}
                    className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No comments yet.</div>
        )}

        {/* ADD COMMENT */}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full border p-2 rounded mt-4"
          placeholder="Write a comment..."
        />

        <button
          onClick={() => {
            addComment(blog._id, commentText);
            setCommentText("");
          }}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Post Comment
        </button>
      </div>
    </main>
  );
}
