import { useEffect, useState } from "react";

const messages = [
  "Loading...",
  "Warming up the servers…",
  "Fetching data…",
  "Polishing the pixels…",
  "Compiling thoughts into words…",
  "Almost there, promise.",
  "Just a little bit of your time...",
  "Thank you for your patience",
];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-white">
      
      {/* Spinner Ring */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full bg-blue-600/20 animate-pulse"></div>
      </div>

      {/* Text */}
      <p className="text-sm text-gray-600 tracking-wide">
        {messages[index]}
      </p>
    </div>
  );
}
