import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "../context/data/myContext";

export default function CreateBlogs() {
  const { addBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const getCurrentUser = () => {
    return {
      name: "Rudra",
      avatar: "",
    };
  };

  const user = getCurrentUser();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result);
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cover) {
      alert("Please upload a cover image");
      return;
    }

    const newBlog = {
      id: Date.now().toString(),
      title,
      excerpt,
      content,
      cover,
      author: user.name,
      avatar: user.avatar,
      date: new Date().toLocaleDateString(),
    };

    addBlog(newBlog);
    alert("Blog created successfully");
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

        {/* COVER IMAGE */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="block text-sm file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 file:rounded file:bg-gray-300 file:text-black-700 file:cursor-pointer"
            style={{ width: "auto" }}
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block mb-1 font-medium">Short Excerpt</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </main>
  );
}
