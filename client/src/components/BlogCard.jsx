export default function BlogCard({ post }) {
  return (
    <article className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      {/* IMAGE */}
      <a
        href={`/blog/${post._id}`}
        className="w-full h-48 block bg-gray-100 flex justify-center items-center overflow-hidden"
      >
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-auto object-contain"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </a>

      {/* CONTENT */}
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>

        <p className="mt-1 text-gray-500 text-sm">{post.excerpt}</p>

        <p className="mt-3 text-gray-700 text-sm line-clamp-3 flex-grow">{post.content}</p>

        <div className="mt-4 flex justify-between text-sm text-gray-500 px-1">
          <span>{post.userId?.name || "Unknown"}</span>
          <span>
            {new Date(post.createdAt || post.date).toLocaleDateString()}
          </span>
        </div>

        <a
          href={`/blog/${post._id}`}
          className="inline-block mt-3 text-blue-600 hover:underline text-sm"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}
