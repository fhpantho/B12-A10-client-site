import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("https://habit-tracker-server-eight.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("sent");
      e.target.reset();

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("fallback");
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-base-200 transition-colors duration-300 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 transition-colors duration-300">

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mb-4 shadow-lg">
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 8.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-1.5M16.5 8.25l-4.5 3-4.5-3"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-base-content mb-2">
            Contact Us
          </h1>

          <p className="text-base-content/70 max-w-md">
            Questions, feature requests, or bug reports? Fill out the form and
            we’ll get back to you soon.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">
              Name
            </label>
            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-pink-400 outline-none transition-colors duration-300"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-md hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Success */}
          {status === "sent" && (
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded bg-success/20 text-success font-semibold">
                Message sent — thank you!
              </span>
            </div>
          )}

          {/* Error */}
          {status === "fallback" && (
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded bg-warning/20 text-warning font-semibold">
                Server unreachable. Email us at{" "}
                <a
                  href="mailto:fahim1020pantho@gmail.com"
                  className="underline"
                >
                  fahim1020pantho@gmail.com
                </a>
              </span>
            </div>
          )}

        </form>
      </div>
    </main>
  );
}
