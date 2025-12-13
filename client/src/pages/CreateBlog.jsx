import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "../context/data/myContext";

export default function CreateBlogs() {
  const { addBlog, user, token } = useContext(BlogContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in
  if (!user || !token) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Access Denied</h1>
        <p className="text-gray-700">You must be logged in to create a blog.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </main>
    );
  }

  // Convert chosen file → Base64 string (with size limit)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit file size to 1MB
    if (file.size > 1048576) {
      alert("Image size must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const newBlog = { title, excerpt, content, cover };

    const result = await addBlog(newBlog);

  setIsLoading(false);

    if (result?.error) {
      alert(`Failed to create blog: ${result.error}`);
      return;
    }

    alert("Blog created successfully!");
    navigate("/dashboard");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="block mb-1 font-medium">Blog Title</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block mb-1 font-medium">Excerpt</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary..."
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded"
            onChange={handleImageChange}
          />

          {cover && (
            <img
              src={cover}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* CONTENT */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border p-3 rounded min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-3 rounded-lg transition`}
        >
          {isLoading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </main>
  );
}
