import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@shared/api";

const badgeStyles: Record<string, string> = {
  "PRE-ORDER": "bg-th-orange text-white",
  "COMING SOON": "bg-th-light-peach text-th-brown",
  "BEST SELLER": "bg-th-dark text-th-cream",
  "NEW": "bg-th-teal text-white",
  "EXTERNAL": "bg-th-mint text-th-dark",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.error || !res.data) {
          setNotFound(true);
        } else {
          setProduct(res.data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-th-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-th-orange border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-th-cream">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <h1 className="font-heading text-3xl font-bold text-th-dark">Product Not Found</h1>
          <p className="font-body text-th-dark/60">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="mt-2 px-6 py-3 bg-th-orange text-white font-body font-semibold rounded-lg hover:bg-orange-600 transition-colors">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasExternalLink = !!(product.external_link);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-8 pb-2">
          <nav className="flex items-center gap-2 font-body text-sm text-th-dark/50">
            <Link to="/" className="hover:text-th-orange transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-th-orange transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-th-dark font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="py-12">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Product Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative max-w-md w-full">
                  <div className="absolute inset-0 rotate-1 bg-th-warm-mid rounded-2xl opacity-50 blur-sm" />
                  <img
                    src={product.image || "https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=800"}
                    alt={product.name}
                    className={`relative w-full rounded-2xl shadow-2xl aspect-square object-center ${
                      (product.image_fit || (product.category === "books" ? "contain" : "cover")) === "contain"
                        ? "object-contain bg-white p-6"
                        : "object-cover"
                    }`}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-6 lg:pt-4">
                {/* Badge */}
                {product.badge && (
                  <div className="inline-flex self-start">
                    <span className={`${badgeStyles[product.badge] || "bg-th-teal text-white"} font-body text-xs font-semibold px-3 py-1.5 rounded-sm tracking-widest uppercase`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-th-dark leading-tight mb-3">
                    {product.name}
                  </h1>
                  <p className="font-body text-th-dark/60 text-sm uppercase tracking-widest">
                    {product.category}
                  </p>
                </div>

                {/* Price */}
                {product.price != null && (
                  <p className="font-heading text-4xl font-black text-th-dark">
                    ${(product.price as number).toFixed(2)}
                  </p>
                )}

                {/* Description */}
                <p className="font-body text-th-dark/70 text-base leading-relaxed border-t border-th-warm-mid pt-6">
                  {product.description}
                </p>

                {/* CTA */}
                <div className="flex flex-col gap-3 mt-2">
                  {hasExternalLink ? (
                    <a
                      href={product.external_link!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-xl hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                    >
                      Buy Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : product.badge === "PRE-ORDER" ? (
                    <button className="w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-xl hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
                      Pre-Order Now
                    </button>
                  ) : product.badge === "COMING SOON" ? (
                    <button disabled className="w-full py-4 bg-th-warm-mid text-th-dark/40 font-body font-bold text-lg rounded-xl cursor-not-allowed">
                      Coming Soon
                    </button>
                  ) : (
                    <button className="w-full py-4 bg-th-orange text-white font-body font-bold text-lg rounded-xl hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
                      Add to Cart
                    </button>
                  )}

                  <Link
                    to="/shop"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-th-teal text-th-teal font-body font-semibold text-base rounded-xl hover:bg-th-teal hover:text-white transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back to Shop
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-th-warm-mid">
                  <div className="flex items-center gap-2 text-th-dark/50 font-body text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Vet-Approved
                  </div>
                  <div className="flex items-center gap-2 text-th-dark/50 font-body text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Field-Tested
                  </div>
                  <div className="flex items-center gap-2 text-th-dark/50 font-body text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    Free Shipping over $50
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
