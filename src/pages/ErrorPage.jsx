export default function ErrorPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* Animated Icon */}
      <div className="text-6xl mb-4 animate-bounce">⚠️</div>

      <h1 className="text-3xl font-bold text-gray-900">
        Oops! Something went wrong.
      </h1>

      <p className="text-gray-600 mt-3 max-w-md">
        The page you're looking for doesn't exist, or an unexpected error occurred.
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </a>

        <a
          href="/blogs"
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          View Blogs
        </a>
      </div>
    </main>
  );
}
