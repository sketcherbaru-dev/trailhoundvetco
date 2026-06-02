import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/field-guide", label: "Field Guide" },
  { href: "/basecamp-courses", label: "Basecamp Course" },
  { href: "/the-pack", label: "The Pack" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/field-notes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-th-cream/95 backdrop-blur-md shadow-[0_32px_64px_-15px_rgba(27,52,55,0.06)]">
      <nav className="max-w-screen-2xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between gap-8">
        {/* Logo + Desktop Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/63ca0851b6698667c0b5b23c24aa3cb2fc450a9f?width=420"
              alt="Trailhound Logo"
              className="h-11 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-base py-0.5 px-0.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-th-orange font-bold border-b-2 border-th-orange"
                      : "text-th-teal font-medium hover:text-th-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Icons + Mobile Trigger */}
        <div className="flex items-center gap-5">
          {/* Search bar expandable container */}
          {searchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center bg-white border border-th-warm-mid rounded-lg px-3 py-1.5 transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Search Field Notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-sm text-th-dark placeholder-th-teal/50 outline-none w-48 font-body"
              />
              <button type="submit" aria-label="Submit search">
                <svg width="18" height="18" viewBox="0 0 23 23" fill="none">
                  <path
                    d="M17.1 9.5C17.1 5.3105 13.6895 1.9 9.50002 1.9C5.31052 1.9 1.90002 5.3105 1.90002 9.5C1.90002 13.6895 5.31052 17.1 9.50002 17.1C11.2575 17.1 12.863 16.5015 14.155 15.4945L19 20.3395L20.3395 19L15.4945 14.155C16.5315 12.8245 17.0963 11.1868 17.1 9.5ZM3.80002 9.5C3.80002 6.3555 6.35552 3.8 9.50002 3.8C12.6445 3.8 15.2 6.3555 15.2 9.5C15.2 12.6445 12.6445 15.2 9.50002 15.2C6.35552 15.2 3.80002 12.6445 3.80002 9.5Z"
                    fill="#1B3437"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="ml-2 text-th-teal/60 hover:text-th-dark text-xs font-semibold font-body"
              >
                Close
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search bar"
              className="hidden sm:flex p-2 rounded-lg hover:bg-th-warm transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 23 23" fill="none">
                <path
                  d="M17.1 9.5C17.1 5.3105 13.6895 1.9 9.50002 1.9C5.31052 1.9 1.90002 5.3105 1.90002 9.5C1.90002 13.6895 5.31052 17.1 9.50002 17.1C11.2575 17.1 12.863 16.5015 14.155 15.4945L19 20.3395L20.3395 19L15.4945 14.155C16.5315 12.8245 17.0963 11.1868 17.1 9.5ZM3.80002 9.5C3.80002 6.3555 6.35552 3.8 9.50002 3.8C12.6445 3.8 15.2 6.3555 15.2 9.5C15.2 12.6445 12.6445 15.2 9.50002 15.2C6.35552 15.2 3.80002 12.6445 3.80002 9.5Z"
                  fill="#1B3437"
                />
              </svg>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg hover:bg-th-warm transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3437" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3437" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-th-warm-mid bg-th-cream px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-base py-3 px-2 border-b border-th-warm-mid last:border-0 transition-colors ${
                  isActive ? "text-th-orange font-bold" : "text-th-teal font-medium"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
