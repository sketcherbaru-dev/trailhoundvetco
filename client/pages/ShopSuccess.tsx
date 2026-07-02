import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopSuccess() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("product") || "your order";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-24 px-6">
        <div className={`max-w-md w-full text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Checkmark icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-black text-th-dark mb-3">
            Order Confirmed!
          </h1>
          <p className="font-body text-th-dark/70 text-base leading-relaxed mb-2">
            Thank you for purchasing <span className="font-semibold text-th-dark">{decodeURIComponent(productName)}</span>.
          </p>
          <p className="font-body text-th-dark/60 text-sm leading-relaxed mb-8">
            A confirmation email will be sent to you shortly. Check your inbox (and spam folder just in case).
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3 bg-th-orange text-white font-body font-semibold text-sm rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border border-th-warm-mid text-th-dark font-body font-semibold text-sm rounded-lg hover:bg-th-warm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
