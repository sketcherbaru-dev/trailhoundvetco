import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Article } from "@shared/api";

const categoryBg: Record<string, string> = {
  PHYSIOLOGY: "bg-th-brown",
  BEHAVIOR: "bg-th-teal",
  NUTRITION: "bg-th-dark-teal",
  INJURY: "bg-th-orange",
  TRAINING: "bg-th-dark",
};

const bookFeatures = [
  "Build for the moments you don't plan for.",
  "Everything you need to handle emergencies on the trail with confidence.",
  "Step-by-step triage for emergent situations.",
];

export default function FieldGuide() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((res) => setArticles((res.data || []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bd22f6066058cc97279f9c8528b918497242a159?width=1560"
            alt="Adventure with pets outdoors"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-th-dark/80 via-th-dark/50 to-th-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-th-dark/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Field-tested first aid for adventurous pets.
            </h1>
            <p className="font-body text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
              Comprehensive veterinary first aid guides for you and your
              backcountry companion.
            </p>
            <a
              href="#book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-th-orange text-white font-body font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Field Guides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Book Product Section */}
      <section id="book" className="py-20 bg-th-warm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative max-w-sm w-full">
                <div className="absolute inset-0 -rotate-2 bg-th-warm-mid rounded-xl blur-sm opacity-60" />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=800"
                  alt="Trailhound Field Guide Book Cover"
                  className="relative w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col gap-6">
              {/* Best Seller Badge */}
              <div className="inline-flex self-start">
                <span className="font-body text-xs font-semibold text-th-brown border border-th-brown/30 bg-th-light-peach px-3 py-1.5 rounded-sm tracking-widest uppercase">
                  BEST SELLER
                </span>
              </div>

              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-dark leading-tight mb-4">
                  Trailhound Field Guide: First Aid for Pets
                </h2>
                <p className="font-body text-th-dark/70 text-base leading-relaxed">
                  This field guide was written due to one single, and powerful
                  truth: when something goes wrong in the field, the person
                  holding the leash becomes the first responder.
                </p>
              </div>

              {/* Feature Bullets */}
              <ul className="flex flex-col gap-3">
                {bookFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-th-orange/10 flex items-center justify-center mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#F45E15"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-th-dark/80 text-base leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)] mt-2">
                Pre-Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Field Notes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-dark mb-2">
                Field Notes
              </h2>
              <p className="font-body text-th-teal text-base max-w-md leading-relaxed">
                Explore our education hub, where our veterinary team answers you
                veterinary first aid questions in our Field Notes.
              </p>
            </div>
            {/* Nav arrows */}
            <div className="flex items-center gap-2 mt-1">
              <button className="w-9 h-9 rounded border border-th-warm-mid flex items-center justify-center text-th-teal hover:bg-th-warm transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded border border-th-warm-mid flex items-center justify-center text-th-teal hover:bg-th-warm transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                to="/field-notes"
                className="group flex flex-col rounded-xl overflow-hidden border border-th-warm-mid bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Image */}
                <div className="relative h-52 overflow-hidden bg-th-warm-dim">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`${categoryBg[article.category] || "bg-th-brown"} text-th-cream font-body text-xs font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-sm`}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-2 p-5 flex-1">
                  <h3 className="font-heading text-lg font-bold text-th-dark leading-snug group-hover:text-th-orange transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body text-sm text-th-dark/70 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-th-orange font-body text-sm font-bold mt-3">
                    Read Field Note
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Pack / Newsletter Section */}
      <section className="py-20 bg-th-dark-teal">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left: Newsletter Form */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Envelope Icon */}
              <div>
                <svg width="40" height="40" viewBox="0 0 34 34" fill="none">
                  <path
                    d="M28.3333 5.66675H5.66667C4.13917 5.66675 2.83333 6.97258 2.83333 8.50008V25.5001C2.83333 27.0276 4.13917 28.3334 5.66667 28.3334H28.3333C29.8608 28.3334 31.1667 27.0276 31.1667 25.5001V8.50008C31.1667 6.97258 29.8608 5.66675 28.3333 5.66675ZM28.3333 11.3334L17 18.4167L5.66667 11.3334V8.50008L17 15.5834L28.3333 8.50008V11.3334Z"
                    fill="#FF9C6F"
                  />
                </svg>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-black text-th-cream leading-tight">
                Join the Pack.
              </h2>
              <p className="font-body text-th-cream/70 text-base leading-relaxed max-w-md">
                Receive exclusive Expedition Reports, Field Notes, and new
                Basecamp Course offerings delivered to your inbox.
              </p>

              <form
                className="flex flex-col sm:flex-row gap-3 mt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Trail Guide Email..."
                  className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-th-cream placeholder-th-cream/40 font-body text-sm outline-none focus:border-th-peach focus:ring-1 focus:ring-th-peach transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-th-orange text-white font-body font-semibold text-sm rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                >
                  Sign Up
                </button>
              </form>

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
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
                  >
                    <svg width="18" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                  {/* Podcast */}
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

      <Footer />
    </div>
  );
}
