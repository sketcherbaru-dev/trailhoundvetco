import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Course } from "@shared/api";

const filters = [
  { id: "all", label: "All Programs" },
  { id: "pet-owner", label: "Pet Owner" },
  { id: "sar", label: "Working Dog Handlers & SAR" },
  { id: "first-responders", label: "First Responders" },
  { id: "vet", label: "Veterinary Professionals" },
];

type LevelKey = "Beginner" | "Intermediate" | "Advanced" | "Professional";

const levelStyles: Record<LevelKey, string> = {
  Beginner: "bg-th-orange text-white",
  Intermediate: "bg-amber-500 text-white",
  Advanced: "bg-th-dark-teal text-th-cream",
  Professional: "bg-th-dark text-th-cream",
};

interface CourseDisplay extends Course {
  category: string;
}

export default function BasecampCourses() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [courses, setCourses] = useState<CourseDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const result = await response.json();
        if (result.error) {
          setError(result.error);
          setCourses([]);
        } else {
          const mapped = (result.data || []).map((c: Course): CourseDisplay => ({
            ...c,
            category: c.category || "pet-owner",
          }));
          setCourses(mapped);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filtered =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bd22f6066058cc97279f9c8528b918497242a159?width=1560"
            alt="Hiking with dog in the mountains"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-th-dark/80 via-th-dark/55 to-th-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-th-dark/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-lg">
            {/* Badge */}
            <span className="inline-flex items-center px-3 py-1.5 bg-th-orange text-white font-body text-xs font-bold tracking-widest uppercase rounded mb-5">
              FIRST AID TRAINING
            </span>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Every Summit Starts Here
            </h1>

            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-sm">
              Every great summit starts at basecamp — where you build the
              skills, confidence, and preparation to handle whatever the trail
              brings.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#courses"
                className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-bold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                EXPLORE CURRICULUM
              </a>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-body font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-white/10 transition-colors">
                WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-th-cream border-b border-th-warm-mid sticky top-[73px] z-40">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 flex-shrink-0">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.id
                      ? "bg-th-dark text-white"
                      : "text-th-teal hover:bg-th-warm"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0 text-th-teal font-body text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="hidden sm:inline">Sort by:</span>
              <select className="bg-transparent font-body text-sm text-th-dark font-medium outline-none cursor-pointer">
                <option>Trending</option>
                <option>Newest</option>
                <option>Level: Beginner first</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section id="courses" className="py-12 bg-th-cream flex-1">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-5">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white border border-th-warm-mid hover:shadow-md transition-shadow duration-300"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-48 md:w-56 h-44 sm:h-auto flex-shrink-0 overflow-hidden bg-th-warm-dim">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6 gap-4">
                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-th-teal font-body text-xs font-semibold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                      </svg>
                      {course.format}
                    </div>
                    <span
                      className={`px-3 py-1 rounded font-body text-xs font-semibold ${
                        levelStyles[course.level]
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-th-dark leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="font-body text-sm text-th-dark/70 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <Link
                    to="#"
                    className="w-full py-3 bg-th-orange text-white font-body font-bold text-sm rounded-lg text-center hover:bg-orange-600 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
