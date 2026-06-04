import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Article, ArticlesResponse, Course, CoursesResponse } from "@shared/api";

const defaultArticles = [
  {
    id: "1",
    category: "PHYSIOLOGY",
    title: "Hard-Packed vs. Loose Scree: A Paw Study",
    excerpt:
      "New research on how different mountain terrains impact joint wear in high-activity breeds.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=192",
    content: "",
    author: "",
    date: "",
    readTime: "",
    featured: false,
    created_at: "",
    updated_at: "",
  } as Article,
  {
    id: "2",
    category: "BEHAVIOR",
    title: "Recall in High-Prey Environments",
    excerpt:
      "Training protocols for maintaining focus when wildlife enters the frame.",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/5d21bb830868bedc9ed342721e99656d4f3f05c3?width=192",
    content: "",
    author: "",
    date: "",
    readTime: "",
    featured: false,
    created_at: "",
    updated_at: "",
  } as Article,
];

export default function Index() {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, coursesRes] = await Promise.all([
          fetch('/api/articles/featured?limit=2'),
          fetch('/api/courses/featured'),
        ]);

        const articlesData: ArticlesResponse = await articlesRes.json();
        const coursesData: CoursesResponse = await coursesRes.json();

        if (articlesData.data && articlesData.data.length > 0) {
          setArticles(articlesData.data);
        }
        if (coursesData.data && coursesData.data.length > 0) {
          setCourses(coursesData.data);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/83f81d20f77c0a6af91203230ba0026aa266323d?width=1560"
            alt="Adventure dogs in nature"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

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

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[64px] font-black text-th-cream leading-[1.05] tracking-[0.04em] mb-6">
              Because their world is bigger than the backyard.
            </h1>

            {/* Subtitle */}
            <p className="font-body text-xl md:text-2xl text-th-cream/90 font-medium leading-relaxed mb-10 max-w-lg">
              Field-tested first aid for adventurous pets.
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
              <div className="rounded-lg overflow-hidden bg-th-darker-teal">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/bb28d6b4166b51557c80243e645c464b4f94a88e?width=1118"
                  alt="Dog in a field"
                  className="w-full h-[480px] lg:h-[559px] object-cover mix-blend-luminosity"
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

      {/* Field Notes Bento Section */}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Featured Article — 8 cols */}
            <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[400px] lg:h-[700px] group cursor-pointer">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e31a3a82b31fe48292562faebd2a7855b840f1ff?width=1560"
                alt="Winter Expedition"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-th-dark via-th-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col gap-4">
                <span className="inline-flex self-start px-4 py-1 bg-th-brown rounded-full font-body text-th-cream text-xs font-bold tracking-[0.1em] uppercase">
                  ESSENTIAL READING
                </span>
                <h3 className="font-heading text-2xl md:text-4xl font-bold text-th-cream leading-tight max-w-xl">
                  The Winter Expedition Manual
                </h3>
                <p className="font-body text-th-cream/80 text-base leading-relaxed max-w-md">
                  How to protect paws from ice, managing core temperatures, and
                  identifying early-stage hypothermia.
                </p>
              </div>
            </div>

            {/* Right Column — 4 cols */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* First-Aid Kit Audit */}
              <div className="flex-1 relative rounded-xl overflow-hidden bg-th-mint min-h-[300px] lg:h-auto group cursor-pointer">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/38398c6854188508193d665e6b1695a39ac29f21?width=756"
                  alt="Hiking dog"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-2xl font-bold text-th-dark mb-1">
                    First-Aid Kit Audit
                  </h3>
                  <p className="font-body text-sm text-th-dark/70 font-medium">
                    Every ounce matters. What's in yours?
                  </p>
                </div>
              </div>

              {/* Wild Hydration Card */}
              <div className="flex-1 relative rounded-xl bg-th-orange overflow-hidden min-h-[280px] lg:h-auto flex flex-col items-center justify-center p-8 text-center">
                {/* Subtle bg pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="338" height="338" viewBox="0 0 338 338" fill="none">
                    <rect width="338" height="338" fill="black" />
                  </svg>
                </div>

                <div className="relative flex flex-col items-center gap-4">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path
                      d="M22.6667 19.8333H11.3333C10.9576 19.8333 10.5973 19.9825 10.3316 20.2482C10.0659 20.5139 9.91667 20.8742 9.91667 21.2499C9.91667 21.6256 10.0659 21.986 10.3316 22.2517C10.5973 22.5173 10.9576 22.6666 11.3333 22.6666H22.6667C23.0424 22.6666 23.4027 22.5173 23.6684 22.2517C23.9341 21.986 24.0833 21.6256 24.0833 21.2499C24.0833 20.8742 23.9341 20.5139 23.6684 20.2482C23.4027 19.9825 23.0424 19.8333 22.6667 19.8333ZM22.6667 14.1666H14.1667C13.7909 14.1666 13.4306 14.3158 13.1649 14.5815C12.8993 14.8472 12.75 15.2075 12.75 15.5833C12.75 15.959 12.8993 16.3193 13.1649 16.585C13.4306 16.8507 13.7909 16.9999 14.1667 16.9999H22.6667C23.0424 16.9999 23.4027 16.8507 23.6684 16.585C23.9341 16.3193 24.0833 15.959 24.0833 15.5833C24.0833 15.2075 23.9341 14.8472 23.6684 14.5815C23.4027 14.3158 23.0424 14.1666 22.6667 14.1666ZM28.3333 5.66659H24.0833V4.24992C24.0833 3.8742 23.9341 3.51386 23.6684 3.24818C23.4027 2.98251 23.0424 2.83325 22.6667 2.83325C22.2909 2.83325 21.9306 2.98251 21.6649 3.24818C21.3993 3.51386 21.25 3.8742 21.25 4.24992V5.66659H18.4167V4.24992C18.4167 3.8742 18.2674 3.51386 18.0017 3.24818C17.7361 2.98251 17.3757 2.83325 17 2.83325C16.6243 2.83325 16.2639 2.98251 15.9983 3.24818C15.7326 3.51386 15.5833 3.8742 15.5833 4.24992V5.66659H12.75V4.24992C12.75 3.8742 12.6007 3.51386 12.3351 3.24818C12.0694 2.98251 11.7091 2.83325 11.3333 2.83325C10.9576 2.83325 10.5973 2.98251 10.3316 3.24818C10.0659 3.51386 9.91667 3.8742 9.91667 4.24992V5.66659H5.66667C5.29094 5.66659 4.93061 5.81584 4.66493 6.08152C4.39926 6.34719 4.25 6.70753 4.25 7.08325V26.9166C4.25 28.0438 4.69777 29.1248 5.4948 29.9218C6.29183 30.7188 7.37283 31.1666 8.5 31.1666H25.5C26.6272 31.1666 27.7082 30.7188 28.5052 29.9218C29.3022 29.1248 29.75 28.0438 29.75 26.9166V7.08325C29.75 6.70753 29.6007 6.34719 29.3351 6.08152C29.0694 5.81584 28.7091 5.66659 28.3333 5.66659ZM26.9167 26.9166C26.9167 27.2923 26.7674 27.6526 26.5017 27.9183C26.2361 28.184 25.8757 28.3333 25.5 28.3333H8.5C8.12428 28.3333 7.76394 28.184 7.49827 27.9183C7.23259 27.6526 7.08333 27.2923 7.08333 26.9166V8.49992H9.91667V9.91659C9.91667 10.2923 10.0659 10.6526 10.3316 10.9183C10.5973 11.184 10.9576 11.3333 11.3333 11.3333C11.7091 11.3333 12.0694 11.184 12.3351 10.9183C12.6007 10.6526 12.75 10.2923 12.75 9.91659V8.49992H15.5833V9.91659C15.5833 10.2923 15.7326 10.6526 15.9983 10.9183C16.2639 11.184 16.6243 11.3333 17 11.3333C17.3757 11.3333 17.7361 11.184 18.0017 10.9183C18.2674 10.6526 18.4167 10.2923 18.4167 9.91659V8.49992H21.25V9.91659C21.25 10.2923 21.3993 10.6526 21.6649 10.9183C21.9306 11.184 22.2909 11.3333 22.6667 11.3333C23.0424 11.3333 23.4027 11.184 23.6684 10.9183C23.9341 10.6526 24.0833 10.2923 24.0833 9.91659V8.49992H26.9167V26.9166Z"
                      fill="#FF9C6F"
                    />
                  </svg>

                  <h3 className="font-heading text-2xl font-bold text-th-peach leading-tight max-w-[220px]">
                    New Field Notes: Wild Hydration
                  </h3>
                  <p className="font-body text-sm text-th-peach/80 max-w-xs">
                    Preventing water-borne illness in the back country.
                  </p>
                  <Link
                    to="/basecamp-courses"
                    className="mt-2 px-6 py-2 border border-th-peach/30 text-th-cream font-body font-bold text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
                    to={article.href}
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
                        {course.badge}
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

      {/* Newsletter Section */}
      <section className="py-24 bg-th-dark-teal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-th-mint blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-th-peach blur-3xl" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <p className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              JOIN THE COLLECTIVE
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-th-cream leading-tight mb-4">
              Trail wisdom, delivered to your inbox.
            </h2>
            <p className="font-body text-th-cream/70 text-lg leading-relaxed mb-10">
              First aid tips, field notes, gear reviews, and exclusive course
              previews — written for the adventurous pet owner. No spam, only
              trail-worthy content.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-th-cream placeholder-th-cream/40 font-body text-base outline-none focus:border-th-peach focus:ring-1 focus:ring-th-peach transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-th-orange text-white font-body font-semibold text-base rounded-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg whitespace-nowrap"
              >
                Sign Up Free
              </button>
            </form>
            <p className="font-body text-th-cream/40 text-xs mt-4">
              Join 2,000+ adventurous pet owners. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
