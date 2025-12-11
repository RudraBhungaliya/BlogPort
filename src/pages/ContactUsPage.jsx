import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>

      <p className="mt-4 text-gray-600 max-w-3xl">
        Have questions, suggestions, or feedback? We'd love to hear from you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 max-w-xl"
      >
        <div>
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-1"
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
            className="w-full border p-3 rounded-lg mt-1"
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
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
