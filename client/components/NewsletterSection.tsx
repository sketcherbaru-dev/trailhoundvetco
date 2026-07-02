import { useState } from "react";
import { useSectionBackground } from "@/hooks/useSectionBackground";
import TopographicPattern from "@/components/TopographicPattern";

export default function NewsletterSection() {
  const bgImage = useSectionBackground("newsletter-bg");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already_subscribed" | "unsubscribed">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409 && data.already_subscribed) {
        setStatus("already_subscribed");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setStatus("success");
      setMessage(data.message || "Successfully subscribed! Welcome to the pack.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to unsubscribe");
      setStatus("unsubscribed");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-th-dark-teal relative overflow-hidden">
      {/* Topographic pattern background */}
      <TopographicPattern />

      {/* Optional custom background image overlay */}
      {bgImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="absolute inset-0 bg-th-dark-teal/85" />
        </>
      )}

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Main: centered newsletter content */}
          <div className="flex-1 flex flex-col items-center gap-5 text-center">
            {/* Envelope Icon */}
            <svg width="40" height="40" viewBox="0 0 34 34" fill="none">
              <path
                d="M28.3333 5.66675H5.66667C4.13917 5.66675 2.83333 6.97258 2.83333 8.50008V25.5001C2.83333 27.0276 4.13917 28.3334 5.66667 28.3334H28.3333C29.8608 28.3334 31.1667 27.0276 31.1667 25.5001V8.50008C31.1667 6.97258 29.8608 5.66675 28.3333 5.66675ZM28.3333 11.3334L17 18.4167L5.66667 11.3334V8.50008L17 15.5834L28.3333 8.50008V11.3334Z"
                fill="#FF9C6F"
              />
            </svg>

            <h2 className="font-heading text-4xl md:text-5xl font-black text-th-cream leading-tight">
              Join the Pack.
            </h2>
            <p className="font-body text-th-cream/70 text-base leading-relaxed max-w-lg">
              Receive exclusive Expedition Reports, Field Notes, and new
              Basecamp Course offerings delivered to your inbox.
            </p>

            {status === "success" ? (
              <div className="w-full max-w-lg px-5 py-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                <p className="font-body text-green-300 text-sm font-medium">{message}</p>
              </div>
            ) : status === "unsubscribed" ? (
              <div className="w-full max-w-lg px-5 py-4 bg-white/10 border border-white/20 rounded-lg">
                <p className="font-body text-th-cream/70 text-sm font-medium">You've been unsubscribed. You can re-subscribe anytime.</p>
              </div>
            ) : status === "already_subscribed" ? (
              <div className="w-full max-w-lg flex flex-col gap-3">
                <div className="px-5 py-4 bg-white/10 border border-white/20 rounded-lg">
                  <p className="font-body text-th-cream text-sm font-medium">
                    <span className="text-th-peach font-bold">{email}</span> is already subscribed to Trail updates.
                  </p>
                  <p className="font-body text-th-cream/60 text-xs mt-1">
                    You'll receive Expedition Reports, Field Notes, and new Basecamp Course offerings.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStatus("idle")}
                    className="flex-1 px-4 py-2.5 border border-white/20 text-th-cream/70 font-body text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Keep Subscribed
                  </button>
                  <button
                    onClick={handleUnsubscribe}
                    disabled={status === "loading" as unknown as boolean}
                    className="flex-1 px-4 py-2.5 bg-red-500/30 border border-red-400/30 text-red-300 font-body text-sm font-semibold rounded-lg hover:bg-red-500/40 transition-colors disabled:opacity-60"
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
                onSubmit={handleSubmit}
              >
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                    placeholder="Your Trail Guide Email..."
                    required
                    className={`w-full px-5 py-3.5 bg-white/10 border rounded-lg text-th-cream placeholder-th-cream/40 font-body text-sm outline-none focus:ring-1 transition-colors ${
                      status === "error"
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-white/20 focus:border-th-peach focus:ring-th-peach"
                    }`}
                  />
                  {status === "error" && (
                    <p className="text-red-400 text-xs">{message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3.5 bg-th-orange text-white font-body font-semibold text-sm rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap disabled:opacity-60"
                >
                  {status === "loading" ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}

            <p className="font-body text-th-cream/30 text-xs tracking-widest uppercase">
              No spam. Only the good stuff for the long haul.
            </p>
          </div>

          {/* Right: Follow Us */}
          <div className="w-full lg:w-52 flex-shrink-0">
            <div className="bg-th-orange rounded-xl p-6 flex flex-col gap-4">
              <p className="font-body text-white text-xs font-bold tracking-[0.15em] uppercase text-center">
                FOLLOW US
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61589138242328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/trailhoundvetco?igsh=MWRybjh3YTJyb3Y4cQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@trailhoundvetco?lang=en&_ga=2.18151034.2118573164.1778768215-1691457772.1746590366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                >
                  <svg width="18" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 1a11 11 0 100 22A11 11 0 0012 1zm0 2a9 9 0 110 18A9 9 0 0112 3zm0 3a2 2 0 100 4 2 2 0 000-4zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
