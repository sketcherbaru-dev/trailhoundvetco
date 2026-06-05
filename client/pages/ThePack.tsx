import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { FieldReport, PackTestimonial, PackGalleryImage } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";

const STATIC_REPORTS: FieldReport[] = [
  { id: "1", badge: "SUMMIT DOG", badge_color: "bg-th-teal", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/ad8f3a13ae04700fff0d5e5575df04c10274c8fc?width=600", quote: "Finding a community that understands the risks of high-altitude hiking changed everything for us.", attribution: "MARCUS & LUNA", display_order: 0, active: true, created_at: "", updated_at: "" },
  { id: "2", badge: "ALPINE CATS", badge_color: "bg-th-orange", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=600", quote: "Trailhound gave us the confidence to take Oliver on his first multi-day paddle board trip.", attribution: "SARAH & OLIVER", display_order: 1, active: true, created_at: "", updated_at: "" },
  { id: "3", badge: "BACKCOUNTRY PUPS", badge_color: "bg-th-dark-teal", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600", quote: "The emergency tele-health support while we were in the Sierras was literally a lifesaver.", attribution: "THE JENKINS FAMILY", display_order: 2, active: true, created_at: "", updated_at: "" },
];

const STATIC_TESTIMONIALS: PackTestimonial[] = [
  { id: "1", quote: "Finally a vet service that doesn't just tolerate my dog's lifestyle—they advocate for it.", name: "DR. ELENA C.", role: "DVM, Private Vet", date: "Aug 2023", avatar_initial: "E", display_order: 0, active: true, created_at: "", updated_at: "" },
  { id: "2", quote: "The packing lists for winter camping saved us from a very cold night in the Tetons.", name: "JAMIE L.", role: "Hiker & Dog Mom", date: "Nov 2023", avatar_initial: "J", display_order: 1, active: true, created_at: "", updated_at: "" },
  { id: "3", quote: "Having access to adventure-specific first aid training made me a better pet parent.", name: "TOM R.", role: "Hiker", date: "Feb 2023", avatar_initial: "T", display_order: 2, active: true, created_at: "", updated_at: "" },
  { id: "4", quote: "The pack meetups are the highlight of our month. The community is so supportive.", name: "ANNA G.", role: "Wild Kids", date: "March 2023", avatar_initial: "A", display_order: 3, active: true, created_at: "", updated_at: "" },
];

const STATIC_GALLERY: PackGalleryImage[] = [
  { id: "1", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/bb28d6b4166b51557c80243e645c464b4f94a88e?width=600", alt_text: "Adventure with dog near water", display_order: 0, active: true, created_at: "", updated_at: "" },
  { id: "2", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=600", alt_text: "Outdoor hiking with pets", display_order: 1, active: true, created_at: "", updated_at: "" },
  { id: "3", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/ad8f3a13ae04700fff0d5e5575df04c10274c8fc?width=600", alt_text: "Person with dog on trail", display_order: 2, active: true, created_at: "", updated_at: "" },
  { id: "4", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=600", alt_text: "Cat in outdoor adventure", display_order: 3, active: true, created_at: "", updated_at: "" },
  { id: "5", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/38398c6854188508193d665e6b1695a39ac29f21?width=600", alt_text: "Hiking with dog through forest", display_order: 4, active: true, created_at: "", updated_at: "" },
  { id: "6", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/83f81d20f77c0a6af91203230ba0026aa266323d?width=600", alt_text: "Mountain trail adventure", display_order: 5, active: true, created_at: "", updated_at: "" },
  { id: "7", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600", alt_text: "Person with dog in snow", display_order: 6, active: true, created_at: "", updated_at: "" },
  { id: "8", image_url: "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=600", alt_text: "Cat in nature", display_order: 7, active: true, created_at: "", updated_at: "" },
];

const FALLBACK_HERO = "https://api.builder.io/api/v1/image/assets/TEMP/bd22f6066058cc97279f9c8528b918497242a159?width=1560";

export default function ThePack() {
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("the-pack");
  const [fieldReports, setFieldReports] = useState<FieldReport[]>([]);
  const [testimonials, setTestimonials] = useState<PackTestimonial[]>([]);
  const [gallery, setGallery] = useState<PackGalleryImage[]>([]);

  useEffect(() => {
    fetch("/api/pack-field-reports")
      .then((r) => r.json())
      .then((res) => { if (res.data?.length) setFieldReports(res.data); else setFieldReports(STATIC_REPORTS); })
      .catch(() => setFieldReports(STATIC_REPORTS));

    fetch("/api/pack-testimonials")
      .then((r) => r.json())
      .then((res) => { if (res.data?.length) setTestimonials(res.data); else setTestimonials(STATIC_TESTIMONIALS); })
      .catch(() => setTestimonials(STATIC_TESTIMONIALS));

    fetch("/api/pack-gallery")
      .then((r) => r.json())
      .then((res) => { if (res.data?.length) setGallery(res.data); else setGallery(STATIC_GALLERY); })
      .catch(() => setGallery(STATIC_GALLERY));
  }, []);

  const gallerySlots = [...gallery, ...Array(Math.max(0, 8 - gallery.length)).fill(null)].slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            heroImages.map((img, idx) => (
              <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100" : "opacity-0"}`}>
                <img src={img.image_url} alt={img.title || "Hero"} className="w-full h-full object-cover object-top" />
              </div>
            ))
          ) : (
            <img src={FALLBACK_HERO} alt="Life with a pack" className="w-full h-full object-cover object-top" />
          )}
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
              <p className="font-body text-th-teal text-sm mt-1">
                Tales from the Trail
              </p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fieldReports.map((report) => (
              <div key={report.id} className="flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-th-warm-dim">
                  <img
                    src={report.image_url}
                    alt={report.attribution}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`${report.badge_color} text-white font-body text-xs font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-sm`}
                    >
                      {report.badge}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="font-body text-sm text-th-dark/80 italic leading-relaxed">
                    "{report.quote}"
                  </p>
                  <div>
                    <p className="font-body text-xs font-bold text-th-orange tracking-widest uppercase">
                      → {report.attribution}
                    </p>
                  </div>
                  <Link
                    to="#"
                    className="font-body text-xs font-bold text-th-dark hover:text-th-orange transition-colors flex items-center gap-1"
                  >
                    READ THEIR STORY
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Pack / Testimonials */}
      <section className="relative overflow-hidden bg-amber-50 pt-16 pb-0">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">
              From the Pack
            </h2>
            <p className="font-body text-th-teal text-sm mt-1">
              Community Wisdom
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-0 relative z-10">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-5 flex flex-col gap-4 shadow-sm"
              >
                <p className="font-body text-sm text-th-dark/80 italic leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-th-warm-mid flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-sm font-bold text-th-teal">
                      {t.avatar_initial}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold text-th-dark tracking-wide">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-th-teal/80">
                      {[t.role, t.date].filter(Boolean).join(" | ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mountain Illustration */}
        <div className="w-full mt-6" aria-hidden="true">
          <svg
            viewBox="0 0 1440 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <rect width="1440" height="280" fill="url(#skyGrad)" />
            <polygon points="500,40 720,240 280,240" fill="#B2C8D8" />
            <polygon points="500,40 560,130 440,130" fill="#E8F4F8" />
            <polygon points="0,200 200,100 400,200" fill="#9BB8C8" opacity="0.6" />
            <polygon points="900,180 1100,90 1300,180" fill="#9BB8C8" opacity="0.55" />
            <rect y="200" width="1440" height="80" fill="#6B9E8A" />
            {[80,160,240,320,380,440,500,560,620,700,780,860,940,1000,1060,1140,1220,1300,1380].map((x,i) => (
              <g key={i} transform={`translate(${x}, ${200 - (i % 3) * 12})`}>
                <polygon points="0,-55 12,0 -12,0" fill={i%3===0?"#3D7A63":"#4E8C74"} />
                <polygon points="0,-40 10,0 -10,0" fill={i%3===0?"#2F6350":"#3D7A63"} />
                <rect x="-3" y="0" width="6" height="12" fill="#2F6350" />
              </g>
            ))}
            {[40,120,200,310,410,530,640,750,870,980,1080,1170,1260,1370].map((x,i) => (
              <g key={i} transform={`translate(${x}, ${220 - (i % 2) * 8})`}>
                <polygon points="0,-70 14,0 -14,0" fill={i%2===0?"#2F6350":"#3D7A63"} />
                <polygon points="0,-50 11,0 -11,0" fill={i%2===0?"#255040":"#2F6350"} />
                <rect x="-4" y="0" width="8" height="15" fill="#255040" />
              </g>
            ))}
            <rect y="250" width="1440" height="30" fill="#4E8C74" />
          </svg>
        </div>
      </section>

      {/* Collective Moments — Photo Grid */}
      <section className="py-16 bg-th-cream">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">
              Collective Moments
            </h2>
            <p className="font-body text-th-teal text-sm mt-1">
              Pack Adventures
            </p>
          </div>

          {gallery.length === 0 ? (
            <div className="text-center py-12 text-th-teal/60 font-body">No gallery photos yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col gap-3">
                {gallerySlots[0] && <div className="rounded-xl overflow-hidden h-52 bg-th-warm-dim"><img src={gallerySlots[0].image_url} alt={gallerySlots[0].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
                {gallerySlots[4] && <div className="rounded-xl overflow-hidden h-44 bg-th-warm-dim"><img src={gallerySlots[4].image_url} alt={gallerySlots[4].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
              </div>
              <div className="flex flex-col gap-3">
                {gallerySlots[1] && <div className="rounded-xl overflow-hidden h-36 bg-th-warm-dim"><img src={gallerySlots[1].image_url} alt={gallerySlots[1].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
                {gallerySlots[5] && <div className="rounded-xl overflow-hidden h-60 bg-th-warm-dim"><img src={gallerySlots[5].image_url} alt={gallerySlots[5].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
              </div>
              <div className="flex flex-col gap-3">
                {gallerySlots[2] && <div className="rounded-xl overflow-hidden h-56 bg-th-warm-dim"><img src={gallerySlots[2].image_url} alt={gallerySlots[2].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
                {gallerySlots[6] && <div className="rounded-xl overflow-hidden h-40 bg-th-warm-dim"><img src={gallerySlots[6].image_url} alt={gallerySlots[6].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
              </div>
              <div className="flex flex-col gap-3">
                {gallerySlots[3] && <div className="rounded-xl overflow-hidden h-44 bg-th-warm-dim"><img src={gallerySlots[3].image_url} alt={gallerySlots[3].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
                {gallerySlots[7] && <div className="rounded-xl overflow-hidden h-52 bg-th-warm-dim"><img src={gallerySlots[7].image_url} alt={gallerySlots[7].alt_text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
              </div>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
