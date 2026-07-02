import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Article, Course, HeroImage } from "@shared/api";

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [homeArticles, setHomeArticles] = useState<Article[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetch("/api/articles/featured")
      .then((r) => r.json())
      .then((res) => setArticles((res.data || []).slice(0, 3)))
      .catch(() => {});

    fetch("/api/courses/featured")
      .then((r) => r.json())
      .then((res) => setCourses((res.data || []).slice(0, 2)))
      .catch(() => {});

    fetch("/api/articles/home-featured")
      .then((r) => r.json())
      .then((res) => setHomeArticles((res.data || []).slice(0, 3)))
      .catch(() => {});

    fetch("/api/hero-images")
      .then((r) => r.json())
      .then((res) => setHeroImages(res.data || []))
      .catch(() => {});
  }, []);

  // Auto-advance hero carousel every 5s
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [heroImages.length]);

  const currentHero = heroImages[heroIndex];

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section — Cinematic Carousel */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-th-dark-teal">
        {/* Slides */}
        {heroImages.length > 0 ? (
          heroImages.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === heroIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img.image_url}
                alt={img.title || "Hero"}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms]"
                style={{ transform: idx === heroIndex ? "scale(1)" : "scale(1.05)" }}
              />
              <div className="absolute inset-0 hero-gradient" />
            </div>
          ))
        ) : null}

        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-th-peach" />
              <span className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase">
                EST. 2026
              </span>
            </div>

            {/* Headline — use custom title from active slide if set */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[64px] font-black text-th-cream leading-[1.05] tracking-[0.04em] mb-6 transition-all duration-700">
              {currentHero?.title || "Because their world is bigger than the backyard."}
            </h1>

            {/* Subtitle */}
            <p className="font-body text-xl md:text-2xl text-th-cream/90 font-medium leading-relaxed mb-10 max-w-lg transition-all duration-700">
              {currentHero?.subtitle || "Field-tested first aid for adventurous pets."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/field-guide"
                className="inline-flex items-center px-8 py-4 bg-th-orange text-white font-body font-semibold text-lg rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)] hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Field Guides
              </Link>
              <Link
                to="/basecamp-courses"
                className="inline-flex items-center px-8 py-4 border border-th-cream/20 bg-th-cream/10 backdrop-blur-sm text-th-cream font-body font-semibold text-lg rounded-lg hover:bg-th-cream/20 transition-colors"
              >
                Basecamp Courses
              </Link>
            </div>

            {/* Carousel dots */}
            {heroImages.length > 1 && (
              <div className="flex items-center gap-2 mt-10">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === heroIndex
                        ? "w-8 h-2 bg-th-peach"
                        : "w-2 h-2 bg-th-cream/40 hover:bg-th-cream/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 bg-th-warm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-th-dark leading-none">
                Field-tested first aid for adventurous pets.
              </h2>
              <p className="font-body text-lg text-th-dark/80 leading-[1.625]">
                Traditional veterinary care stops at the clinic door. We believe
                care should follow you into the pines. Your companion isn't just
                a pet; they are your navigator, your protector, and your best
                friend on the trail. They deserve medicine as rugged as their
                spirit.
              </p>
              <Link
                to="/field-guide"
                className="w-full py-5 bg-th-orange text-white font-body font-bold text-xl rounded-lg text-center hover:bg-orange-600 transition-all duration-200 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 mt-2"
              >
                Pre-Order our Field Guides
              </Link>
            </div>

            {/* Right: Image + Quote */}
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/why-it-matters-dog.png"
                  alt="Dog in a field"
                  className="w-full h-[480px] lg:h-[559px] object-contain"
                />
              </div>
              {/* Quote Card */}
              <div className="absolute -bottom-6 -left-0 lg:-left-6 max-w-[320px] bg-th-light-teal rounded-lg p-8 shadow-2xl">
                <blockquote className="font-heading text-xl italic font-bold text-black leading-[1.4] mb-4">
                  "Your dog doesn't hesitate. Neither should you."
                </blockquote>
                <p className="font-body text-xs font-medium tracking-[0.1em] uppercase text-black/70">
                  — Dr. Moe Baum, DVM, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Notes Bento Section — THE COLLECTION (DB-driven) */}
      <section className="py-24 bg-th-dark-teal overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16">
            <div className="flex flex-col gap-4">
              <p className="font-heading text-th-light-peach text-xs font-black tracking-[0.3em] uppercase">
                THE COLLECTION
              </p>
              <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-th-cream tracking-[-0.05em] leading-none">
                Field Notes
              </h2>
            </div>
            <Link
              to="/field-notes"
              className="flex items-center gap-2 text-th-mint font-body font-bold text-base hover:opacity-70 transition-opacity self-start sm:self-auto"
            >
              View Entire Archive
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                  fill="#C7EAE1"
                />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          {homeArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Featured Article — 8 cols */}
              <Link to="/field-notes" className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[400px] lg:h-[700px] group cursor-pointer block">
                {homeArticles[0]?.thumbnail ? (
                  <img
                    src={homeArticles[0].thumbnail}
                    alt={homeArticles[0].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-th-teal opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-th-dark via-th-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col gap-4">
                  <span className="inline-flex self-start px-4 py-1 bg-th-brown rounded-full font-body text-th-cream text-xs font-bold tracking-[0.1em] uppercase">
                    {homeArticles[0]?.category || "ESSENTIAL READING"}
                  </span>
                  <h3 className="font-heading text-2xl md:text-4xl font-bold text-th-cream leading-tight max-w-xl">
                    {homeArticles[0]?.title}
                  </h3>
                  <p className="font-body text-th-cream/80 text-base leading-relaxed max-w-md">
                    {homeArticles[0]?.excerpt}
                  </p>
                </div>
              </Link>

              {/* Right Column — 4 cols */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {homeArticles[1] && (
                  <Link to="/field-notes" className="flex-1 relative rounded-xl overflow-hidden bg-th-mint min-h-[300px] lg:h-auto group cursor-pointer block">
                    {homeArticles[1].thumbnail && (
                      <img
                        src={homeArticles[1].thumbnail}
                        alt={homeArticles[1].title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block font-body text-xs font-bold tracking-widest uppercase text-th-dark/60 mb-2">
                        {homeArticles[1].category}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-th-dark mb-1">
                        {homeArticles[1].title}
                      </h3>
                      <p className="font-body text-sm text-th-dark/70 font-medium">
                        {homeArticles[1].excerpt}
                      </p>
                    </div>
                  </Link>
                )}

                {homeArticles[2] && (
                  <Link to="/field-notes" className="flex-1 relative rounded-xl bg-th-orange overflow-hidden min-h-[280px] lg:h-auto flex flex-col justify-end p-8 cursor-pointer block">
                    {homeArticles[2].thumbnail && (
                      <img
                        src={homeArticles[2].thumbnail}
                        alt={homeArticles[2].title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                    )}
                    <div className="relative flex flex-col gap-2">
                      <span className="font-body text-xs font-bold tracking-widest uppercase text-th-peach/80">
                        {homeArticles[2].category}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-th-peach leading-tight">
                        {homeArticles[2].title}
                      </h3>
                      <p className="font-body text-sm text-th-peach/80">
                        {homeArticles[2].excerpt}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Fallback placeholder grid */}
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[400px] lg:h-[700px] bg-th-teal/20 flex items-end p-10">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex self-start px-4 py-1 bg-th-brown rounded-full font-body text-th-cream text-xs font-bold tracking-[0.1em] uppercase">
                    COMING SOON
                  </span>
                  <h3 className="font-heading text-2xl md:text-4xl font-bold text-th-cream leading-tight max-w-xl">
                    Featured Field Notes Coming Soon
                  </h3>
                  <p className="font-body text-th-cream/80 text-base leading-relaxed max-w-md">
                    Mark articles as "Home Featured" in the admin panel to display them here.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="flex-1 rounded-xl bg-th-mint/20 min-h-[300px] flex items-center justify-center">
                  <p className="text-th-cream/40 text-sm font-body">Article 2</p>
                </div>
                <div className="flex-1 rounded-xl bg-th-orange/20 min-h-[280px] flex items-center justify-center">
                  <p className="text-th-cream/40 text-sm font-body">Article 3</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Field Notes + Courses Section */}
      <section className="py-24 px-6 md:px-12 bg-th-cream overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-16 xl:gap-20">
            {/* Articles Column */}
            <div className="flex-1 min-w-0 flex flex-col gap-12">
              <div className="flex items-center gap-4">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                  <path
                    d="M0 10V8H7V10H0ZM0 6V4H11V6H0ZM0 2V0H11V2H0ZM9 16V12.925L14.525 7.425C14.675 7.275 14.8417 7.16667 15.025 7.1C15.2083 7.03333 15.3917 7 15.575 7C15.775 7 15.9667 7.0375 16.15 7.1125C16.3333 7.1875 16.5 7.3 16.65 7.45L17.575 8.375C17.7083 8.525 17.8125 8.69167 17.8875 8.875C17.9625 9.05833 18 9.24167 18 9.425C18 9.60833 17.9667 9.79583 17.9 9.9875C17.8333 10.1792 17.725 10.35 17.575 10.5L12.075 16H9ZM16.5 9.425L15.575 8.5L16.5 9.425ZM10.5 14.5H11.45L14.475 11.45L14.025 10.975L13.55 10.525L10.5 13.55V14.5ZM14.025 10.975L13.55 10.525L14.475 11.45L14.025 10.975Z"
                    fill="#581E00"
                  />
                </svg>
                <h2 className="font-heading text-3xl font-bold text-th-dark">
                  Recent Field Notes
                </h2>
              </div>

              <div className="flex flex-col gap-12">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to="/field-notes"
                    className="flex items-start gap-6 group"
                  >
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-th-warm-dim overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-body text-xs font-bold tracking-[0.1em] uppercase text-th-teal">
                        {article.category}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-th-dark group-hover:text-th-orange transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="font-body text-sm text-th-dark/80 leading-relaxed mt-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses Column */}
            <div className="w-full lg:w-[520px] xl:w-[560px] flex-shrink-0 bg-th-warm-mid rounded-2xl p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden">
              <h2 className="font-heading text-3xl font-bold text-th-dark">
                Basecamp Courses
              </h2>

              <div className="flex flex-col gap-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col gap-2 rounded-lg border-l-8 border-th-brown bg-white shadow-sm p-6"
                  >
                    <div className="inline-flex self-start">
                      <span className="font-body text-xs font-semibold text-th-brown-dark bg-th-light-peach px-2 py-1 rounded-sm">
                        {course.level || "COMING SOON"}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-th-dark leading-snug mt-1">
                      {course.title}
                    </h3>
                    <p className="font-body text-sm text-th-dark/80">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/basecamp-courses"
                className="inline-flex items-center justify-center py-3 px-6 bg-th-dark text-th-cream font-body font-semibold text-sm rounded-lg hover:bg-th-teal transition-colors"
              >
                View All Courses
              </Link>

              {/* Decorative blur */}
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-2xl bg-th-teal opacity-10 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />

      <Footer />
    </div>
  );
}
