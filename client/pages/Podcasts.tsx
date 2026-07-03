import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Podcast } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";

const formatDate = (d: string) => {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

export default function Podcasts() {
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("podcasts");
  const currentHero = heroImages[heroIndex];
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTranscript, setOpenTranscript] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/podcasts")
      .then((r) => r.json())
      .then((res) => setPodcasts(res.data || []))
      .catch(() => setPodcasts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = podcasts[0];
  const rest = podcasts.slice(1);

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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-th-orange text-white font-body text-xs font-bold tracking-widest uppercase rounded mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V24h2v-3.06A9 9 0 0021 12v-2h-2z" />
              </svg>
              THE TRAILHOUND PODCAST
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {currentHero?.title || "Voices from the Trail"}
            </h1>
            <p className="font-body text-white/80 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              {currentHero?.subtitle || "Conversations with veterinarians, handlers, and adventurers on keeping our four-legged explorers safe in the wild."}
            </p>
            <a
              href="#episodes"
              className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-bold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Listen Now
            </a>
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

      {/* Episodes */}
      <section id="episodes" className="py-16 flex-1">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-th-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-body text-th-teal">Loading episodes...</p>
            </div>
          ) : podcasts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-th-warm mx-auto flex items-center justify-center mb-6 text-th-teal">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-th-dark mb-2">No episodes yet</h3>
              <p className="font-body text-th-teal max-w-sm mx-auto">
                New episodes are on the way. Check back soon for conversations from the trail.
              </p>
            </div>
          ) : (
            <>
              {/* Featured / latest episode */}
              {featured && (
                <div className="mb-14">
                  <p className="font-body text-th-orange text-xs font-bold tracking-[0.15em] uppercase mb-4">
                    Latest Episode
                  </p>
                  <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl overflow-hidden border border-th-warm-mid shadow-sm">
                    <div className="lg:w-2/5 h-64 lg:h-auto bg-th-dark-teal relative flex-shrink-0">
                      {featured.image ? (
                        <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-th-cream/40">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-th-orange text-white font-body text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                        Episode {featured.episode_number}
                      </span>
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">
                      <p className="font-body text-xs text-th-teal font-medium">{formatDate(featured.published_date)}</p>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-th-dark leading-snug">
                        {featured.title}
                      </h2>
                      <p className="font-body text-sm md:text-base text-th-dark/70 leading-relaxed">
                        {featured.description}
                      </p>
                      {featured.audio_url && (
                        <audio controls src={featured.audio_url} className="w-full mt-2" preload="none" />
                      )}
                      {featured.transcript && (
                        <div>
                          <button
                            onClick={() => setOpenTranscript(openTranscript === featured.id ? null : featured.id)}
                            className="font-body text-sm font-bold text-th-orange hover:underline flex items-center gap-1"
                          >
                            {openTranscript === featured.id ? "Hide transcript" : "Read transcript"}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${openTranscript === featured.id ? "rotate-180" : ""}`}>
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                          {openTranscript === featured.id && (
                            <p className="mt-3 font-body text-sm text-th-dark/70 leading-relaxed whitespace-pre-line border-t border-th-warm-mid pt-3">
                              {featured.transcript}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining episodes grid */}
              {rest.length > 0 && (
                <>
                  <p className="font-body text-th-orange text-xs font-bold tracking-[0.15em] uppercase mb-6">
                    All Episodes
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((ep) => (
                      <div
                        key={ep.id}
                        className="flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-48 bg-th-dark-teal">
                          {ep.image ? (
                            <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-th-cream/40">
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
                              </svg>
                            </div>
                          )}
                          <span className="absolute top-3 left-3 bg-th-dark text-th-cream font-body text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                            Ep. {ep.episode_number}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-3">
                          <p className="font-body text-xs text-th-teal font-medium">{formatDate(ep.published_date)}</p>
                          <h3 className="font-heading text-lg font-bold text-th-dark leading-snug">{ep.title}</h3>
                          <p className="font-body text-sm text-th-dark/70 leading-relaxed flex-1 line-clamp-3">
                            {ep.description}
                          </p>
                          {ep.audio_url && (
                            <audio controls src={ep.audio_url} className="w-full mt-1" preload="none" />
                          )}
                          {ep.transcript && (
                            <div>
                              <button
                                onClick={() => setOpenTranscript(openTranscript === ep.id ? null : ep.id)}
                                className="font-body text-sm font-bold text-th-orange hover:underline flex items-center gap-1"
                              >
                                {openTranscript === ep.id ? "Hide transcript" : "Read transcript"}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${openTranscript === ep.id ? "rotate-180" : ""}`}>
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              </button>
                              {openTranscript === ep.id && (
                                <p className="mt-2 font-body text-sm text-th-dark/70 leading-relaxed whitespace-pre-line border-t border-th-warm-mid pt-2">
                                  {ep.transcript}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
