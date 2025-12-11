export default function Loader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">

      {/* Dot Pulse Animation */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
      </div>

      <p className="text-gray-600 text-sm tracking-wide">
        Loading your content…
      </p>
    </div>
  );
}
