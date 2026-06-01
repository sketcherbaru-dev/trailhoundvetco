import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

const fieldReports = [
  {
    id: 1,
    badge: "SUMMIT DOG",
    badgeColor: "bg-th-teal",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ad8f3a13ae04700fff0d5e5575df04c10274c8fc?width=600",
    quote:
      "Finding a community that understands the risks of high-altitude hiking changed everything for us.",
    attribution: "MARCUS & LUNA",
  },
  {
    id: 2,
    badge: "ALPINE CATS",
    badgeColor: "bg-th-orange",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=600",
    quote:
      "Trailhound gave us the confidence to take Oliver on his first multi-day paddle board trip.",
    attribution: "SARAH & OLIVER",
  },
  {
    id: 3,
    badge: "BACKCOUNTRY PUPS",
    badgeColor: "bg-th-dark-teal",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600",
    quote:
      "The emergency tele-health support while we were in the Sierras was literally a lifesaver.",
    attribution: "THE JENKINS FAMILY",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Finally a vet service that doesn't just tolerate my dog's lifestyle—they advocate for it.",
    name: "DR. ELENA C.",
    role: "DVM, Private Vet",
    date: "Aug 2023",
    avatar: "E",
  },
  {
    id: 2,
    quote:
      "The packing lists for winter camping saved us from a very cold night in the Tetons.",
    name: "JAMIE L.",
    role: "Hiker & Dog Mom",
    date: "Nov 2023",
    avatar: "J",
  },
  {
    id: 3,
    quote:
      "Having access to adventure-specific first aid training made me a better pet parent.",
    name: "TOM R.",
    role: "Hiker",
    date: "Feb 2023",
    avatar: "T",
  },
  {
    id: 4,
    quote:
      "The pack meetups are the highlight of our month. The community is so supportive.",
    name: "ANNA G.",
    role: "Wild Kids",
    date: "March 2023",
    avatar: "A",
  },
];

const galleryImages = [
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/bb28d6b4166b51557c80243e645c464b4f94a88e?width=600",
    alt: "Adventure with dog near water",
    tall: false,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=600",
    alt: "Outdoor hiking with pets",
    tall: true,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/ad8f3a13ae04700fff0d5e5575df04c10274c8fc?width=600",
    alt: "Person with dog on trail",
    tall: false,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=600",
    alt: "Cat in outdoor adventure",
    tall: false,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/38398c6854188508193d665e6b1695a39ac29f21?width=600",
    alt: "Hiking with dog through forest",
    tall: false,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/83f81d20f77c0a6af91203230ba0026aa266323d?width=600",
    alt: "Mountain trail adventure",
    tall: true,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600",
    alt: "Person with dog in snow",
    tall: false,
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=600",
    alt: "Cat in nature",
    tall: false,
  },
];

export default function ThePack() {
  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bd22f6066058cc97279f9c8528b918497242a159?width=1560"
            alt="Life with a pack"
            className="w-full h-full object-cover object-top"
          />
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
          </div>
        </div>
      </section>

      {/* Field Reports Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Header */}
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

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fieldReports.map((report) => (
              <div key={report.id} className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-th-warm-dim">
                  <img
                    src={report.image}
                    alt={report.attribution}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`${report.badgeColor} text-white font-body text-xs font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-sm`}
                    >
                      {report.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
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
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">
              From the Pack
            </h2>
            <p className="font-body text-th-teal text-sm mt-1">
              Community Wisdom
            </p>
          </div>

          {/* Testimonial Cards */}
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
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold text-th-dark tracking-wide">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-th-teal/80">
                      {t.role} | {t.date}
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
            {/* Sky gradient fill */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <rect width="1440" height="280" fill="url(#skyGrad)" />

            {/* Mountain peak — snowy, light blue-grey */}
            <polygon
              points="500,40 720,240 280,240"
              fill="#B2C8D8"
            />
            {/* Snow cap */}
            <polygon
              points="500,40 560,130 440,130"
              fill="#E8F4F8"
            />

            {/* Background ridge left */}
            <polygon
              points="0,200 200,100 400,200"
              fill="#9BB8C8"
              opacity="0.6"
            />
            {/* Background ridge right */}
            <polygon
              points="900,180 1100,90 1300,180"
              fill="#9BB8C8"
              opacity="0.55"
            />

            {/* Ground fill */}
            <rect y="200" width="1440" height="80" fill="#6B9E8A" />

            {/* Pine trees — back row */}
            {[80, 160, 240, 320, 380, 440, 500, 560, 620, 700, 780, 860, 940, 1000, 1060, 1140, 1220, 1300, 1380].map(
              (x, i) => (
                <g key={i} transform={`translate(${x}, ${200 - (i % 3) * 12})`}>
                  <polygon
                    points="0,-55 12,0 -12,0"
                    fill={i % 3 === 0 ? "#3D7A63" : "#4E8C74"}
                  />
                  <polygon
                    points="0,-40 10,0 -10,0"
                    fill={i % 3 === 0 ? "#2F6350" : "#3D7A63"}
                  />
                  <rect x="-3" y="0" width="6" height="12" fill="#2F6350" />
                </g>
              )
            )}

            {/* Pine trees — front row (larger) */}
            {[40, 120, 200, 310, 410, 530, 640, 750, 870, 980, 1080, 1170, 1260, 1370].map(
              (x, i) => (
                <g key={i} transform={`translate(${x}, ${220 - (i % 2) * 8})`}>
                  <polygon
                    points="0,-70 14,0 -14,0"
                    fill={i % 2 === 0 ? "#2F6350" : "#3D7A63"}
                  />
                  <polygon
                    points="0,-50 11,0 -11,0"
                    fill={i % 2 === 0 ? "#255040" : "#2F6350"}
                  />
                  <rect x="-4" y="0" width="8" height="15" fill="#255040" />
                </g>
              )
            )}

            {/* Ground strip */}
            <rect y="250" width="1440" height="30" fill="#4E8C74" />
          </svg>
        </div>
      </section>

      {/* Collective Moments — Photo Grid */}
      <section className="py-16 bg-th-cream">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-th-orange">
              Collective Moments
            </h2>
            <p className="font-body text-th-teal text-sm mt-1">
              Pack Adventures
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden h-52 bg-th-warm-dim">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-44 bg-th-warm-dim">
                <img
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden h-36 bg-th-warm-dim">
                <img
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-60 bg-th-warm-dim">
                <img
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden h-56 bg-th-warm-dim">
                <img
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-40 bg-th-warm-dim">
                <img
                  src={galleryImages[6].src}
                  alt={galleryImages[6].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden h-44 bg-th-warm-dim">
                <img
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-52 bg-th-warm-dim">
                <img
                  src={galleryImages[7].src}
                  alt={galleryImages[7].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
