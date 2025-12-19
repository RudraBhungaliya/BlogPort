import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import BlogContext from "../context/data/myContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, editBlog } = useContext(BlogContext);

  const curr = blogs.find((b) => b._id === id);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");

  useEffect(() => {
    if (!curr) return;

    setTitle(curr.title);
    setExcerpt(curr.excerpt);
    setContent(curr.content);
    setCover(curr.cover);
  }, [curr]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

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

  const handleSave = async () => {
    const updated = {
      title,
      excerpt,
      content,
      cover,
    };

    const res = await editBlog(curr._id, updated);

    if (res?.error) {
      alert("Failed to update blog");
      return;
    }

    alert("Blog updated successfully!");
    navigate("/dashboard");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Edit Blog</h1>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Excerpt</label>
          <input
            className="w-full border rounded-lg p-3 mt-1"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Cover Image</label>
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

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            className="w-full border rounded-lg p-3 mt-1 h-48"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

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
