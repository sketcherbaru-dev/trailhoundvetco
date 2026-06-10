import { Link } from "react-router-dom";

const footerLinks = [
  { href: "/field-guide", label: "Field Guide" },
  { href: "/basecamp-courses", label: "Basecamp Course" },
  { href: "/the-pack", label: "The Pack" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/shop", label: "Shop" },
];

export default function Footer() {
  return (
    <footer className="bg-th-dark-teal">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-3">
            <Link to="/">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/63ca0851b6698667c0b5b23c24aa3cb2fc450a9f?width=420"
                alt="Trailhound Logo"
                className="h-9 w-auto brightness-0 invert opacity-80"
              />
            </Link>
            <p className="font-body text-th-cream/50 text-sm max-w-xs">
              Field-tested veterinary care for adventurous pets and the people who love them.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-sm text-th-cream/60 hover:text-th-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/TrailhoundVetCo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-th-cream/20 flex items-center justify-center text-th-cream/60 hover:text-th-cream hover:border-th-cream/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@trailhoundvetco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-th-cream/20 flex items-center justify-center text-th-cream/60 hover:text-th-cream hover:border-th-cream/50 transition-colors"
            >
              <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-th-cream/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-th-cream/40">
            © 2026 Trailhound Veterinary Collective. All rights reserved.
          </p>
          <p className="font-body text-xs text-th-cream/40">EST. 2026</p>
        </div>
      </div>
    </footer>
  );
}
