import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const [mobileOpen, setMobileOpen] = useState(false);

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
                  className={`font-body text-base py-0.5 px-0.5 transition-colors ${
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
          {/* Search */}
          <button
            aria-label="Search"
            className="hidden sm:flex p-2 rounded-lg hover:bg-th-warm transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 23 23" fill="none">
              <path
                d="M17.1 9.5C17.1 5.3105 13.6895 1.9 9.50002 1.9C5.31052 1.9 1.90002 5.3105 1.90002 9.5C1.90002 13.6895 5.31052 17.1 9.50002 17.1C11.2575 17.1 12.863 16.5015 14.155 15.4945L19 20.3395L20.3395 19L15.4945 14.155C16.5315 12.8245 17.0963 11.1868 17.1 9.5ZM3.80002 9.5C3.80002 6.3555 6.35552 3.8 9.50002 3.8C12.6445 3.8 15.2 6.3555 15.2 9.5C15.2 12.6445 12.6445 15.2 9.50002 15.2C6.35552 15.2 3.80002 12.6445 3.80002 9.5Z"
                fill="#1B3437"
              />
            </svg>
          </button>

          {/* Account */}
          <button
            aria-label="Account"
            className="hidden sm:flex p-1 hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.8833 18 11.7167 17.8708 12.5 17.6125C13.2833 17.3542 14 16.9833 14.65 16.5C14 16.0167 13.2833 15.6458 12.5 15.3875C11.7167 15.1292 10.8833 15 10 15C9.11667 15 8.28333 15.1292 7.5 15.3875C6.71667 15.6458 6 16.0167 5.35 16.5C6 16.9833 6.71667 17.3542 7.5 17.6125C8.28333 17.8708 9.11667 18 10 18ZM10 9C10.4333 9 10.7917 8.85833 11.075 8.575C11.3583 8.29167 11.5 7.93333 11.5 7.5C11.5 7.06667 11.3583 6.70833 11.075 6.425C10.7917 6.14167 10.4333 6 10 6C9.56667 6 9.20833 6.14167 8.925 6.425C8.64167 6.70833 8.5 7.06667 8.5 7.5C8.5 7.93333 8.64167 8.29167 8.925 8.575C9.20833 8.85833 9.56667 9 10 9Z"
                fill="#1B3437"
              />
            </svg>
          </button>

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
