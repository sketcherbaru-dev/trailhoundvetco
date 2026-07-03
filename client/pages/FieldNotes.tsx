import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Article } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";

const categories = [
  { id: "all", label: "All Notes" },
  { id: "PHYSIOLOGY", label: "Physiology" },
  { id: "BEHAVIOR", label: "Behavior" },
  { id: "NUTRITION", label: "Nutrition" },
  { id: "INJURY", label: "Injury" },
  { id: "TRAINING", label: "Training" },
];

interface ArticleDisplay extends Article {
  readTime: string;
}

export default function FieldNotes() {
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("field-notes");
  const currentHero = heroImages[heroIndex];
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamQuery = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [selectedArticle, setSelectedArticle] = useState<ArticleDisplay | null>(null);
  const [articles, setArticles] = useState<ArticleDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        const result = await response.json();
        if (result.error) {
          setError(result.error);
          setArticles([]);
        } else {
          const mapped = (result.data || []).map((a: Article): ArticleDisplay => ({
            ...a,
            readTime: a.readTime || "5 min read",
          }));
          setArticles(mapped);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Sync search query state with URL param
  useEffect(() => {
    setSearchQuery(searchParamQuery);
  }, [searchParamQuery]);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-th-dark-teal">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100" : "opacity-0"}`}>
              <img src={img.image_url} alt={img.title || "Hero"} className="w-full h-full object-cover object-center" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-th-dark/80 via-th-dark/50 to-th-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-th-dark/60 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-xl">
            <p className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase mb-3">
              EDUCATION HUB
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {currentHero?.title || "Field Notes"}
            </h1>
            <p className="font-body text-white/80 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              {currentHero?.subtitle || "Searchable veterinary first aid articles, trail tips, and expert guides — written for pet owners who go further."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#articles"
                className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-bold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Articles
              </a>
              <button
                onClick={() => document.getElementById("field-notes-search")?.focus()}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-body font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Search Notes
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

      {/* Search & Categories Bar */}
      <section className="bg-th-cream border-b border-th-warm-mid sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-th-dark text-white"
                    : "text-th-teal hover:bg-th-warm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <input
              id="field-notes-search"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-th-warm-mid bg-white font-body text-sm text-th-dark outline-none focus:border-th-orange focus:ring-1 focus:ring-th-orange transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-th-teal/50">
              <svg width="18" height="18" viewBox="0 0 23 23" fill="none">
                <path
                  d="M17.1 9.5C17.1 5.3105 13.6895 1.9 9.50002 1.9C5.31052 1.9 1.90002 5.3105 1.90002 9.5C1.90002 13.6895 5.31052 17.1 9.50002 17.1C11.2575 17.1 12.863 16.5015 14.155 15.4945L19 20.3395L20.3395 19L15.4945 14.155C16.5315 12.8245 17.0963 11.1868 17.1 9.5ZM3.80002 9.5C3.80002 6.3555 6.35552 3.8 9.50002 3.8C12.6445 3.8 15.2 6.3555 15.2 9.5C15.2 12.6445 12.6445 15.2 9.50002 15.2C6.35552 15.2 3.80002 12.6445 3.80002 9.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchParams({});
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-th-teal/50 hover:text-th-dark text-xs font-semibold font-body"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles" className="py-16 flex-1">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-th-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-body text-th-teal">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-body text-red-500">{error}</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-th-warm-dim overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-th-dark text-th-cream font-body text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <div className="flex items-center gap-2 text-xs text-th-teal font-body font-medium">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="font-heading text-xl font-bold text-th-dark leading-snug group-hover:text-th-orange transition-colors">
                      {article.title}
                    </h2>

                    <p className="font-body text-sm text-th-dark/70 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-1 text-th-orange font-body text-sm font-bold mt-2">
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-th-warm mx-auto flex items-center justify-center mb-6 text-th-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-th-dark mb-2">
                No articles found
              </h3>
              <p className="font-body text-th-teal max-w-sm mx-auto">
                We couldn't find any articles matching "{searchQuery}". Try
                searching for "Study", "Winter", or select another category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Immersive Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-th-dark/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-th-cream max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            {/* Header image */}
            <div className="relative h-64 md:h-80 bg-th-warm-dim">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-th-dark/60 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-th-dark hover:bg-th-orange hover:text-white flex items-center justify-center shadow-lg transition-colors font-bold text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-th-orange text-white font-body text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                  {selectedArticle.category}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-white mt-2 leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4 text-sm text-th-teal font-body font-semibold border-b border-th-warm-mid pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-th-dark">{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="font-body text-base text-th-dark/90 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <div className="flex justify-end pt-4 border-t border-th-warm-mid">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-th-dark text-white font-body font-semibold text-sm rounded-lg hover:bg-th-teal transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <NewsletterSection />
      <Footer />
    </div>
  );
}
