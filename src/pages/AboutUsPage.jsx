export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900">About BlogPort</h1>

      <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
        BlogPort is a simple and modern blogging platform designed for creators,
        thinkers, and storytellers. Our mission is to make publishing effortless
        and enjoyable for everyone — whether you're writing your first post or your
        hundredth.
      </p>

      <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
        Built with React and local storage technology, BlogPort keeps your blogs
        safely stored in your browser while offering a smooth, distraction-free writing
        experience. More features will be added over time as the platform grows.
      </p>

      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
        <p className="mt-3 text-gray-600">
          To empower everyone to express their ideas freely and effortlessly.
        </p>
      </div>
    </main>
  );
}
