import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import BlogContext from "../context/data/myContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, updateBlog } = useContext(BlogContext);

  const curr = blogs.find((b) => b.id === id);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // URL
  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    if (!curr) return;

    setTitle(curr.title);
    setExcerpt(curr.excerpt || "");
    setContent(curr.content);
    setImage(curr.image || "");
    setFilePreview(curr.image || "");
  }, [curr]);

  if (!curr) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p className="mt-3 text-gray-600">
          The blog you're trying to edit doesn't exist.
        </p>
      </main>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setFilePreview(previewURL);
    setImage(previewURL);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    updateBlog({
      ...curr,
      title,
      excerpt,
      content,
      image,
      date: new Date().toLocaleDateString(),
    });

    navigate("/dashboard");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Edit Blog</h1>

      <div className="mt-8 space-y-6">

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-2"
            onChange={handleImageUpload}
          />

          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="mt-4 w-full max-h-60 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-medium">Excerpt</label>
          <textarea
            className="w-full border rounded-lg p-3 mt-1 h-24"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          ></textarea>
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            className="w-full border rounded-lg p-3 mt-1 h-48"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}