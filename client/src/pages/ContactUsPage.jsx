import { useState, useEffect } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const phrases = [
    "Reach Out.",
    "Say Hello.",
    "Drop a Thought.",
    "We're Listening."
  ];

  const [index, setIndex] = useState(0);

  // Animated heading cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 2500);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">

      {/* Animated Title */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900">
        Contact Us
        <span className="block text-blue-600 transition-all duration-500 ease-in-out">
          {phrases[index]}
        </span>
      </h1>

      <p className="mt-4 text-gray-600 text-center text-lg max-w-xl mx-auto">
        Whether it's feedback, a bug report, or you just want to say hi — this space is yours.
      </p>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-xl mx-auto border"
      >
        <div className="grid gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg shadow-md hover:shadow-lg"
        >
          Send Message
        </button>

        {/* Animated success bubble */}
        {sent && (
          <div className="mt-6 text-center text-green-600 font-semibold animate-fadeIn">
            Message sent successfully! 🚀
          </div>
        )}
      </form>

      {/* Bonus contact details */}
      <div className="mt-16 text-center text-gray-700">
        <p className="text-lg">Prefer direct contact?</p>
        <p className="font-semibold text-blue-600 mt-1">
          support@blogport.com
        </p>
      </div>
    </main>
  );
}
