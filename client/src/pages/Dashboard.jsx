import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import BlogContext from "../context/data/myContext";
import Loader from "../components/Loader";

export default function Dashboard() {
  const navigate = useNavigate();
  const { blogs, user, loaded, deleteBlog } = useContext(BlogContext);

  if (!loaded) return <Loader />;

  // Safe filtering for both object + string userId cases
  const myBlogs = blogs.filter(
    (b) =>
      b.userId === user?._id || // userId is a string
      b.userId?._id === user?._id // userId is a populated object
  );

  // DELETE HANDLER
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const result = await deleteBlog(id);

      if (result?.error) {
        alert(`Failed to delete blog: ${result.error}`);
      } else {
        alert("Blog deleted successfully!");
      }
    }
  };

  // EDIT HANDLER
  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Manage your blogs and write new posts.
      </p>

      <button
        onClick={() => navigate("/create-blog")}
        className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        + Create New Blog
      </button>

      <h2 className="text-2xl font-semibold mt-10 mb-4">My Blogs</h2>

      <div className="space-y-4">
        {myBlogs.length === 0 && <p>You haven't created any blogs yet.</p>}

        {myBlogs.map((blog) => (
          <div
            key={blog._id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-medium">{blog.title}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-4 text-sm">
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </a>

              <button
                onClick={() => handleEdit(blog._id)}
                className="text-green-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}