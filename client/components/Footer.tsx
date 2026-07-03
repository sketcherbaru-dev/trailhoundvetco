import { Link } from "react-router-dom";
import { useSectionBackground } from "@/hooks/useSectionBackground";
import TopographicPattern from "@/components/TopographicPattern";

export default function Footer() {
  const bgImage = useSectionBackground("footer-bg");

  return (
    <footer className="bg-th-dark-teal relative overflow-hidden">
      {/* Topographic pattern */}
      <TopographicPattern />

      {/* Optional custom background image overlay */}
      {bgImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="absolute inset-0 bg-th-dark-teal/90" />
        </>
      )}

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-8">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Col 1: Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/63ca0851b6698667c0b5b23c24aa3cb2fc450a9f?width=420"
                alt="Trailhound Logo"
                className="h-9 w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(48%) sepia(81%) saturate(1200%) hue-rotate(355deg) brightness(100%) contrast(97%)" }}
              />
            </Link>
            <p className="font-body text-th-cream/55 text-sm leading-relaxed max-w-[220px]">
              Because their world is bigger than the backyard.
            </p>
          </div>

          {/* Col 2: The Archive */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-th-orange text-xs font-bold tracking-[0.15em] uppercase">
              THE ARCHIVE
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/field-guide", label: "The Field Guide" },
                { href: "/basecamp-courses", label: "Basecamp Courses" },
                { href: "/the-pack", label: "The Pack" },
                { href: "/field-notes", label: "Field Notes" },
                { href: "/shop", label: "Shop" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm text-th-cream/60 hover:text-th-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-th-orange text-xs font-bold tracking-[0.15em] uppercase">
              CONTACT
            </p>
            <a
              href="mailto:info@trailhoundvetco.com"
              className="font-body text-sm text-th-cream/60 hover:text-th-cream transition-colors"
            >
              info@trailhoundvetco.com
            </a>
          </div>

          {/* Col 4: Connect */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-th-orange text-xs font-bold tracking-[0.15em] uppercase">
              CONNECT
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61589138242328"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg border border-th-cream/20 flex items-center justify-center text-th-cream/60 hover:text-th-cream hover:border-th-cream/50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/trailhoundvetco?igsh=MWRybjh3YTJyb3Y4cQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg border border-th-cream/20 flex items-center justify-center text-th-cream/60 hover:text-th-cream hover:border-th-cream/50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@trailhoundvetco?lang=en&_ga=2.18151034.2118573164.1778768215-1691457772.1746590366"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg border border-th-cream/20 flex items-center justify-center text-th-cream/60 hover:text-th-cream hover:border-th-cream/50 transition-colors"
              >
                <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-th-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-th-cream/40">
            © 2026 Trailhound Veterinary Collective. Trusted Guides in the Wild.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Ethics", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-body text-xs text-th-cream/40 hover:text-th-cream/70 tracking-wider uppercase transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
