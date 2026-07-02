import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Course } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";

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
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("basecamp-courses");
  const [activeFilter, setActiveFilter] = useState("all");
  const [courses, setCourses] = useState<CourseDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseDisplay | null>(null);

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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-th-dark-teal">
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            heroImages.map((img, idx) => (
              <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100" : "opacity-0"}`}>
                <img src={img.image_url} alt={img.title || "Hero"} className="w-full h-full object-cover object-center" />
              </div>
            ))
          ) : null}
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
            {heroImages.length > 1 && (
              <div className="flex items-center gap-2 mt-8">
                {heroImages.map((_, idx) => (
                  <button key={idx} onClick={() => setHeroIndex(idx)} className={`rounded-full transition-all duration-300 ${idx === heroIndex ? "w-8 h-2 bg-th-peach" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} aria-label={`Slide ${idx + 1}`} />
                ))}
              </div>
            )}
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
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-th-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-body text-th-teal">Loading courses...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-th-teal/60">No courses available yet.</p>
            </div>
          ) : null}
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

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-3 bg-th-orange text-white font-body font-bold text-sm rounded-lg text-center hover:bg-orange-600 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => { if (!open) setSelectedCourse(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading font-bold leading-snug pr-8">
                  {selectedCourse.title}
                </DialogTitle>
              </DialogHeader>

              {selectedCourse.thumbnail && (
                <div className="rounded-lg overflow-hidden h-52 bg-th-warm-dim -mx-1">
                  <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded font-body text-xs font-semibold ${levelStyles[selectedCourse.level as LevelKey] || "bg-gray-200 text-gray-700"}`}>
                  {selectedCourse.level}
                </span>
                <span className="px-3 py-1 rounded font-body text-xs font-semibold bg-th-warm text-th-dark">
                  {selectedCourse.format}
                </span>
                <span className="px-3 py-1 rounded font-body text-xs font-semibold bg-th-light-teal text-th-dark-teal">
                  {selectedCourse.category}
                </span>
              </div>

              <p className="font-body text-th-dark/80 leading-relaxed">{selectedCourse.description}</p>

              {(selectedCourse.start_date || selectedCourse.end_date) && (
                <div className="flex flex-wrap gap-6 p-4 bg-th-warm rounded-lg">
                  {selectedCourse.start_date && (
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-widest text-th-teal mb-1">Start Date</p>
                      <p className="font-body font-semibold text-th-dark">
                        {new Date(selectedCourse.start_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  )}
                  {selectedCourse.end_date && (
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-widest text-th-teal mb-1">End Date</p>
                      <p className="font-body font-semibold text-th-dark">
                        {new Date(selectedCourse.end_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedCourse.curriculum && (
                <div>
                  <p className="font-body text-sm font-bold uppercase tracking-widest text-th-teal mb-2">Curriculum</p>
                  <p className="font-body text-sm text-th-dark/80 leading-relaxed whitespace-pre-line">{selectedCourse.curriculum}</p>
                </div>
              )}

              <div className="pt-2">
                <p className="font-body text-xs text-gray-400">
                  Added {new Date(selectedCourse.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
