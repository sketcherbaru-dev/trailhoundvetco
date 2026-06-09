import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { Product } from "@shared/api";
import { useHeroImages } from "@/hooks/useHeroImages";

const categories = [
  { id: "all", label: "All Products" },
  { id: "books", label: "Field Guides" },
  { id: "kits", label: "First Aid Kits" },
  { id: "gear", label: "Trail Gear" },
  { id: "courses", label: "Courses" },
];

type BadgeType = "PRE-ORDER" | "COMING SOON" | "BEST SELLER" | "NEW" | "EXTERNAL";

const badgeStyles: Record<BadgeType, string> = {
  "PRE-ORDER": "bg-th-orange text-white",
  "COMING SOON": "bg-th-light-peach text-th-brown",
  "BEST SELLER": "bg-th-dark text-th-cream",
  "NEW": "bg-th-teal text-white",
  "EXTERNAL": "bg-th-mint text-th-dark",
};

interface ProductDisplay {
  id: string;
  name: string;
  description: string;
  price: number | string;
  badge: BadgeType;
  category: string;
  image: string;
  external?: boolean;
  href: string;
}

export default function Shop() {
  const { images: heroImages, index: heroIndex } = useHeroImages("shop");
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const heroBg = heroImages[heroIndex] ?? null;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();
        if (result.error) {
          setError(result.error);
          setProducts([]);
        } else {
          // Map database products to display format
          const mapped = (result.data || []).map((p: Product): ProductDisplay => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price != null ? `$${(p.price as number).toFixed(2)}` : "—",
            badge: (p.badge as BadgeType) || "NEW",
            category: p.category,
            image: p.image,
            external: !!(p.external_link),
            href: p.external_link || `/shop/${p.id}`,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-th-dark-teal py-20">
        {/* Background image dari DB (jika ada) dengan overlay agar teks terbaca */}
        {heroBg && (
          <div className="absolute inset-0">
            <img src={heroBg.image_url} alt={heroBg.title || "Shop"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-th-dark-teal/95 via-th-dark-teal/80 to-th-dark-teal/50" />
          </div>
        )}
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-th-peach opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-th-mint opacity-10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1">
              <p className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase mb-4">
                THE TRAILHOUND STORE
              </p>
              <h1 className="font-heading text-5xl md:text-6xl font-black text-th-cream leading-tight mb-5">
                Gear Up for the Trail.
              </h1>
              <p className="font-body text-th-cream/70 text-lg leading-relaxed max-w-lg mb-8">
                Field guides, first aid kits, trail gear, and courses — every
                product curated to keep you and your adventure companion safe
                out there.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCategory("books")}
                  className="px-6 py-3 bg-th-orange text-white font-body font-semibold text-sm rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Shop Field Guides
                </button>
                <button
                  onClick={() => setActiveCategory("kits")}
                  className="px-6 py-3 border border-th-cream/20 bg-th-cream/10 text-th-cream font-body font-semibold text-sm rounded-lg hover:bg-th-cream/20 transition-colors"
                >
                  First Aid Kits
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:w-[400px] xl:w-[480px] flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-th-mint/10 rounded-2xl blur-xl" />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=800"
                  alt="Trailhound Field Guide"
                  className="relative w-full rounded-2xl shadow-2xl object-cover"
                />
                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-th-orange text-white font-body text-xs font-bold px-4 py-2 rounded-full shadow-lg tracking-wide">
                  PRE-ORDER NOW
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-th-cream border-b border-th-warm-mid sticky top-[73px] z-40">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? "bg-th-dark text-white"
                      : "text-th-teal hover:bg-th-warm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="text-th-teal/60 font-body text-sm hidden sm:block flex-shrink-0">
              {filtered.length} items
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 flex-1">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-52 bg-th-warm-dim overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`font-body text-xs font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-sm ${
                        badgeStyles[product.badge]
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                  {/* External indicator */}
                  {product.external && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#45645E" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-bold text-th-dark leading-snug mb-1.5 group-hover:text-th-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-th-dark/60 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-th-warm-mid">
                    <span className="font-heading text-lg font-bold text-th-dark">
                      {product.price}
                    </span>
                    {product.external ? (
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-th-orange text-white font-body text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                      >
                        Shop Now
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        to={product.href}
                        className="px-4 py-2 bg-th-orange text-white font-body text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                      >
                        {product.badge === "PRE-ORDER"
                          ? "Pre-Order"
                          : product.badge === "COMING SOON"
                          ? "Learn More"
                          : "Shop Now"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-14 bg-th-warm border-t border-th-warm-mid">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-th-orange/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F45E15" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-heading text-base font-bold text-th-dark">
                Vet-Approved Gear
              </h3>
              <p className="font-body text-sm text-th-dark/60">
                Every product is reviewed and approved by our veterinary team.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-th-orange/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F45E15" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-heading text-base font-bold text-th-dark">
                Free Shipping Over $75
              </h3>
              <p className="font-body text-sm text-th-dark/60">
                On all domestic orders — gear up without the added cost.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-th-orange/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F45E15" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-heading text-base font-bold text-th-dark">
                Purpose-Driven Brand
              </h3>
              <p className="font-body text-sm text-th-dark/60">
                10% of proceeds fund wilderness pet rescue operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
