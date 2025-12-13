export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((c, index) => (
        <div
          key={index}
          className="border rounded-lg p-3 bg-gray-50 shadow-sm"
        >
          <p className="text-gray-800">{c.text}</p>

          <span className="text-xs text-gray-500 block mt-2">
            {c.date}
          </span>
        </div>
      ))}
    </div>
  );
}
