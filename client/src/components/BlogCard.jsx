export default function BlogCard({ post }) {
  return (
    <article className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">

      {/* FIXED SIZE IMAGE */}
      <div className="w-full h-48 flex justify-center items-center bg-gray-100">
        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-auto object-contain"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>

        <p className="mt-1 text-gray-500 text-sm">{post.excerpt}</p>

        <div className="mt-4 flex justify-between text-sm text-gray-500 px-1">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>

        <a
          href={`/blog/${post.id}`}
          className="inline-block mt-3 text-blue-600 hover:underline text-sm"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}
