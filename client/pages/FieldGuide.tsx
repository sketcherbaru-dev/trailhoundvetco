import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Article, Product } from "@shared/api";

const categoryBg: Record<string, string> = {
  PHYSIOLOGY: "bg-th-brown",
  BEHAVIOR: "bg-th-teal",
  NUTRITION: "bg-th-dark-teal",
  INJURY: "bg-th-orange",
  TRAINING: "bg-th-dark",
};

const DEFAULT_FEATURES = [
  "Build for the moments you don't plan for.",
  "Everything you need to handle emergencies on the trail with confidence.",
  "Step-by-step triage for emergent situations.",
];

export default function FieldGuide() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((res) => setArticles((res.data || []).slice(0, 3)))
      .catch(() => {});

    fetch("/api/products/field-guide-featured")
      .then((r) => r.json())
      .then((res) => setFeaturedProduct(res.data || null))
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
      {featuredProduct !== undefined && (
        <section id="book" className="py-20 bg-th-warm">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Book Cover */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative max-w-sm w-full">
                  <div className="absolute inset-0 -rotate-2 bg-th-warm-mid rounded-xl blur-sm opacity-60" />
                  <img
                    src={featuredProduct?.image || "https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=800"}
                    alt={featuredProduct?.name || "Trailhound Field Guide Book Cover"}
                    className="relative w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="flex flex-col gap-6">
                {/* Best Seller Badge */}
                <div className="inline-flex self-start">
                  <span className="font-body text-xs font-semibold text-th-brown border border-th-brown/30 bg-th-light-peach px-3 py-1.5 rounded-sm tracking-widest uppercase">
                    {featuredProduct?.badge || "BEST SELLER"}
                  </span>
                </div>

                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-dark leading-tight mb-4">
                    {featuredProduct?.name || "Trailhound Field Guide: First Aid for Pets"}
                  </h2>
                  <p className="font-body text-th-dark/70 text-base leading-relaxed">
                    {featuredProduct?.description || "This field guide was written due to one single, and powerful truth: when something goes wrong in the field, the person holding the leash becomes the first responder."}
                  </p>
                </div>

                {/* Feature Bullets */}
                <ul className="flex flex-col gap-3">
                  {DEFAULT_FEATURES.map((feature, i) => (
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

                {/* Price + CTA */}
                {featuredProduct && (
                  <p className="font-heading text-2xl font-bold text-th-dark">
                    ${featuredProduct.price.toFixed(2)}
                  </p>
                )}
                {featuredProduct?.external_link ? (
                  <a
                    href={featuredProduct.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)] mt-2 text-center block"
                  >
                    Buy Now
                  </a>
                ) : (
                  <button className="w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)] mt-2">
                    Pre-Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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

      <NewsletterSection />

      <Footer />
    </div>
  );
}
