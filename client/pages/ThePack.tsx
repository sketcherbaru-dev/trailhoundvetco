import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import Lightbox from "@/components/Lightbox";
import TopographicPattern from "@/components/TopographicPattern";
import { FieldReport, PackTestimonial, PackGalleryImage } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";
import { useSectionBackground } from "@/hooks/useSectionBackground";

export default function ThePack() {
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("the-pack");
  const testimonialsBg = useSectionBackground("the-pack-bg");
  const [fieldReports, setFieldReports] = useState<FieldReport[]>([]);
  const [testimonials, setTestimonials] = useState<PackTestimonial[]>([]);
  const [gallery, setGallery] = useState<PackGalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pack-field-reports")
      .then((r) => r.json())
      .then((res) => setFieldReports(res.data || []))
      .catch(() => setFieldReports([]));

    fetch("/api/pack-testimonials")
      .then((r) => r.json())
      .then((res) => setTestimonials(res.data || []))
      .catch(() => setTestimonials([]));

    fetch("/api/pack-gallery")
      .then((r) => r.json())
      .then((res) => setGallery(res.data || []))
      .catch(() => setGallery([]));
  }, []);

  const gallerySlots = [...gallery, ...Array(Math.max(0, 12 - gallery.length)).fill(null)].slice(0, 12);
  const hasMoreGallery = gallery.length > 12;

  const openLightbox = (realIndex: number) => setLightboxIndex(realIndex);
  const closeLightbox = () => setLightboxIndex(null);
  const navigateLightbox = (index: number) => setLightboxIndex(index);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-th-dark-teal">
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            heroImages.map((img, idx) => (
              <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100" : "opacity-0"}`}>
                <img src={img.image_url} alt={img.title || "Hero"} className="w-full h-full object-cover object-top" />
              </div>
            ))
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-th-dark/75 via-th-dark/45 to-th-dark/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-th-dark/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-lg">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Life's Better with a Pack.
            </h1>
            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Join a collective of wilderness enthusiasts and expert
              veterinarians dedicated to keeping our four-legged explorers safe
              on every trail, peak, and paddle.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-semibold text-base rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5">
                Join the Pack
              </button>
              <button className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white font-body font-semibold text-base rounded-lg hover:bg-white/10 transition-colors">
                Explore Stories
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

      {/* Field Reports Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange leading-tight">
                Field Reports
              </h2>
              <p className="font-body text-th-teal text-sm mt-1">Tales from the Trail</p>
            </div>
            <Link
              to="#"
              className="font-body text-sm font-bold text-th-orange hover:underline flex items-center gap-1 mt-1 whitespace-nowrap"
            >
              VIEW ALL STORIES
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {fieldReports.length === 0 ? (
            <div className="text-center py-16 text-th-teal/50 font-body text-sm">
              Belum ada field report. Tambahkan melalui{" "}
              <Link to="/admin/the-pack" className="text-th-orange hover:underline font-semibold">
                admin panel
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fieldReports.map((report) => (
                <div key={report.id} className="flex flex-col gap-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-th-warm-dim">
                    <img src={report.image_url} alt={report.attribution} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className={`${report.badge_color} text-white font-body text-xs font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-sm`}>
                        {report.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-body text-sm text-th-dark/80 italic leading-relaxed">"{report.quote}"</p>
                    <p className="font-body text-xs font-bold text-th-orange tracking-widest uppercase">→ {report.attribution}</p>
                    <Link to="#" className="font-body text-xs font-bold text-th-dark hover:text-th-orange transition-colors flex items-center gap-1">
                      READ THEIR STORY
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* From the Pack / Testimonials */}
      <section
        className="relative overflow-hidden pt-16 pb-0 bg-th-dark-teal"
      >
        {/* Topographic pattern */}
        <TopographicPattern />
        {testimonialsBg && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${testimonialsBg})` }}
            />
            <div className="absolute inset-0 bg-th-dark-teal/85" />
          </>
        )}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">From the Pack</h2>
            <p className="font-body text-th-cream/60 text-sm mt-1">Community Wisdom</p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-th-cream/50 font-body text-sm relative z-10">
              Belum ada testimoni. Tambahkan melalui{" "}
              <Link to="/admin/the-pack" className="text-th-orange hover:underline font-semibold">admin panel</Link>.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-0 relative z-10">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
                  <p className="font-body text-sm text-th-cream/85 italic leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-th-orange/80 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-sm font-bold text-white">{t.avatar_initial}</span>
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold text-th-cream tracking-wide">{t.name}</p>
                      <p className="font-body text-xs text-th-cream/55">{[t.role, t.date].filter(Boolean).join(" | ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pb-16" />
      </section>

      {/* Collective Moments — Photo Grid */}
      <section className="py-16 bg-th-cream">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-10">
            <div className="text-center flex-1">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">Collective Moments</h2>
              <p className="font-body text-th-teal text-sm mt-1">Pack Adventures</p>
            </div>
          </div>

          {gallery.length === 0 ? (
            <div className="text-center py-12 text-th-teal/50 font-body text-sm">
              Belum ada foto galeri. Tambahkan melalui{" "}
              <Link to="/admin/the-pack" className="text-th-orange hover:underline font-semibold">admin panel</Link>.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Column 1: slots 0, 4, 8 */}
                <div className="flex flex-col gap-3">
                  {gallerySlots[0] && <GalleryItem img={gallerySlots[0]} height="h-52" onClick={() => openLightbox(gallery.indexOf(gallerySlots[0]!))} />}
                  {gallerySlots[4] && <GalleryItem img={gallerySlots[4]} height="h-44" onClick={() => openLightbox(gallery.indexOf(gallerySlots[4]!))} />}
                  {gallerySlots[8] && <GalleryItem img={gallerySlots[8]} height="h-48" onClick={() => openLightbox(gallery.indexOf(gallerySlots[8]!))} />}
                </div>
                {/* Column 2: slots 1, 5, 9 */}
                <div className="flex flex-col gap-3">
                  {gallerySlots[1] && <GalleryItem img={gallerySlots[1]} height="h-36" onClick={() => openLightbox(gallery.indexOf(gallerySlots[1]!))} />}
                  {gallerySlots[5] && <GalleryItem img={gallerySlots[5]} height="h-60" onClick={() => openLightbox(gallery.indexOf(gallerySlots[5]!))} />}
                  {gallerySlots[9] && <GalleryItem img={gallerySlots[9]} height="h-44" onClick={() => openLightbox(gallery.indexOf(gallerySlots[9]!))} />}
                </div>
                {/* Column 3: slots 2, 6, 10 */}
                <div className="flex flex-col gap-3">
                  {gallerySlots[2] && <GalleryItem img={gallerySlots[2]} height="h-56" onClick={() => openLightbox(gallery.indexOf(gallerySlots[2]!))} />}
                  {gallerySlots[6] && <GalleryItem img={gallerySlots[6]} height="h-40" onClick={() => openLightbox(gallery.indexOf(gallerySlots[6]!))} />}
                  {gallerySlots[10] && <GalleryItem img={gallerySlots[10]} height="h-52" onClick={() => openLightbox(gallery.indexOf(gallerySlots[10]!))} />}
                </div>
                {/* Column 4: slots 3, 7, 11 */}
                <div className="flex flex-col gap-3">
                  {gallerySlots[3] && <GalleryItem img={gallerySlots[3]} height="h-44" onClick={() => openLightbox(gallery.indexOf(gallerySlots[3]!))} />}
                  {gallerySlots[7] && <GalleryItem img={gallerySlots[7]} height="h-52" onClick={() => openLightbox(gallery.indexOf(gallerySlots[7]!))} />}
                  {gallerySlots[11] && <GalleryItem img={gallerySlots[11]} height="h-40" onClick={() => openLightbox(gallery.indexOf(gallerySlots[11]!))} />}
                </div>
              </div>

              {/* View All Button */}
              <div className="flex justify-center mt-8">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-th-orange text-th-orange font-body font-semibold text-sm rounded-lg hover:bg-th-orange hover:text-white transition-all duration-200"
                >
                  View All Gallery
                  {hasMoreGallery && <span className="text-xs opacity-70">({gallery.length} photos)</span>}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}

function GalleryItem({ img, height, onClick }: { img: PackGalleryImage; height: string; onClick: () => void }) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${height} bg-th-warm-dim cursor-pointer relative group`}
      onClick={onClick}
    >
      <img src={img.image_url} alt={img.alt_text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <svg className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
        </svg>
      </div>
    </div>
  );
}
