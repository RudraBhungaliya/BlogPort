import { useState, useEffect } from "react";

export default function About() {
  const phrases = [
    "Write freely.",
    "Think loudly.",
    "Create boldly.",
    "Publish instantly.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Animated Heading */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900">
        BlogPort
        <span className="block text-blue-600 transition-all duration-500 ease-in-out">
          {phrases[index]}
        </span>
      </h1>

      <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
        A living platform built for creators, readers, and anyone with something
        to say.
      </p>

      {/* Feature Grid */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Lightning Fast",
            desc: "Open, read, publish — instantly. No lag, no nonsense.",
          },
          {
            title: "Local First",
            desc: "Everything lives on your device. Completely private.",
          },
          {
            title: "Creator Friendly",
            desc: "Write long, short, weird, serious — we don’t judge.",
          },
          {
            title: "Evolving Daily",
            desc: "Likes, comments, profiles, more coming soon.",
          },
          {
            title: "Minimal UI",
            desc: "Clean design. Zero distractions. Maximum clarity.",
          },
          {
            title: "Made with ❤️",
            desc: "Built by one curious developer and a lot of caffeine.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-10 text-center">
        {[
          { num: "500+", label: "Words Written" },
          { num: "20+", label: "Blogs Created" },
          { num: "∞", label: "Ideas Incoming" },
        ].map((s, i) => (
          <div key={i}>
            <p className="text-4xl font-bold text-blue-600">{s.num}</p>
            <p className="text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="mt-16 text-gray-700 leading-relaxed text-lg space-y-5 max-w-3xl mx-auto">
        <p>
          BlogPort wasn’t built in a boardroom. It wasn’t planned by a marketing
          team. It started because writing online feels way too complicated
          today — heavy dashboards, annoying signup walls, and algorithms
          deciding what people see.
        </p>

        <p>
          So this project took a different route. A handwritten, simple platform
          where you own your words, and your thoughts don’t get buried under ads
          or sponsored garbage.
        </p>

        <p className="font-semibold text-gray-900">
          BlogPort is growing — one idea, one reader, one creator at a time. And
          you’re now part of that story.
        </p>
      </div>

      <div className="mt-14 text-center">
        <a
          href="/blogs"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
        >
          Dive Into Blogs →
        </a>
      </div>
    </main>
  );
}
