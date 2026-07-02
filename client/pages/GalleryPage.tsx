import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { PackGalleryImage } from "@shared/api";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<PackGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pack-gallery")
      .then((r) => r.json())
      .then((res) => setGallery(res.data || []))
      .catch(() => setGallery([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-white border-b border-th-warm-mid">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 text-sm font-body text-th-teal/60 mb-4">
            <Link to="/the-pack" className="hover:text-th-orange transition-colors">The Pack</Link>
            <span>/</span>
            <span className="text-th-dark">Gallery</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-th-orange mb-2">
            Collective Moments
          </h1>
          <p className="font-body text-th-teal text-base">
            Pack Adventures — {gallery.length} photos
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 flex-1">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-16 text-th-teal/50 font-body">Loading gallery...</div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-16 text-th-teal/50 font-body text-sm">
              No photos yet. Add them via the{" "}
              <Link to="/admin/the-pack" className="text-th-orange hover:underline font-semibold">
                admin panel
              </Link>
              .
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {gallery.map((img, idx) => (
                <div
                  key={img.id}
                  className="break-inside-avoid rounded-xl overflow-hidden bg-th-warm-dim cursor-pointer relative group"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <svg className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </div>
  );
}
