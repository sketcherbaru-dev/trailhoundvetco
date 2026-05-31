import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PlaceholderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function Placeholder({ title, subtitle, icon }: PlaceholderProps) {
  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-th-dark-teal py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-th-mint blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-th-peach blur-3xl" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
          <p className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase mb-4">
            Trailhound Veterinary Collective
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-black text-th-cream leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-th-cream/70 text-xl mt-4 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="flex-1 py-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-th-warm mx-auto flex items-center justify-center mb-8">
              {icon ?? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#45645E" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              )}
            </div>

            <h2 className="font-heading text-3xl font-bold text-th-dark mb-4">
              This page is on the trail.
            </h2>
            <p className="font-body text-th-teal text-lg leading-relaxed mb-8">
              We're crafting this section of the site. Keep prompting to build
              out the full{" "}
              <span className="font-semibold text-th-dark">{title}</span>{" "}
              experience — or explore what's already live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/field-notes"
                className="inline-flex items-center px-6 py-3 border border-th-teal text-th-teal font-body font-semibold rounded-lg hover:bg-th-warm transition-colors"
              >
                Read Field Notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
