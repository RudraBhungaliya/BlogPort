export default function BlogCard({ post }) {
  // post: { id, title, excerpt, author, date, cover }
  return (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>{post.author}</div>
          <div>{new Date(post.date).toLocaleDateString()}</div>
        </div>
        <a
          href={`/blog/${post.id}`}
          className="inline-block mt-4 text-blue-600 hover:underline text-sm"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}
