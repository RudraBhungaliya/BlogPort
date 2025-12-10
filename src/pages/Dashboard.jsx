import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import BlogContext from "../context/data/myContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { blogs } = useContext(BlogContext);

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
        {blogs.length === 0 && <p>You haven't created any blogs yet.</p>}

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-medium">{blog.title}</h3>
              <p className="text-gray-500 text-sm">{blog.date}</p>
            </div>

            <div className="flex gap-4 text-sm">
              <a
                href={`/blog/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </a>
              <a
                href={`/edit-blog/${blog.id}`}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </a>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
