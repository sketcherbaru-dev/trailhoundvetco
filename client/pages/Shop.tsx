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
  price: string;
  rawPrice: number | null;
  badge: BadgeType;
  category: string;
  image: string;
  external: boolean;
  href: string;
}

export default function Shop() {
  const { images: heroImages, index: heroIndex, setIndex: setHeroIndex } = useHeroImages("shop");
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();
        if (result.error) {
          setError(result.error);
          setProducts([]);
        } else {
          const mapped = (result.data || []).map((p: Product): ProductDisplay => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price != null ? `$${(p.price as number).toFixed(2)}` : "—",
            rawPrice: p.price as number | null,
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

  const handleBuyNow = async (productId: string) => {
    setCheckingOut(productId);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed. Please try again.");
        setCheckingOut(null);
      }
    } catch {
      alert("Checkout failed. Please try again.");
      setCheckingOut(null);
    }
  };

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-th-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-th-dark-teal">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100" : "opacity-0"}`}>
              <img src={img.image_url} alt={img.title || "Shop"} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-th-dark-teal/95 via-th-dark-teal/80 to-th-dark-teal/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-th-dark-teal/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-16 pt-32">
          <div className="max-w-xl">
            <p className="font-body text-th-peach text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              THE TRAILHOUND STORE
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-black text-th-cream leading-tight mb-5">
              Gear for adventurous pets and their humans.
            </h1>
            <p className="font-body text-th-cream/70 text-lg leading-relaxed max-w-lg mb-8">
              Equipment designed for high-altitude excursions, 
              deep woods discovery, and the bond between 
              Trailhound and their human.
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
            {heroImages.length > 1 && (
              <div className="flex items-center gap-2 mt-8">
                {heroImages.map((_, idx) => (
                  <button key={idx} onClick={() => setHeroIndex(idx)} className={`rounded-full transition-all duration-300 ${idx === heroIndex ? "w-8 h-2 bg-th-peach" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} aria-label={`Slide ${idx + 1}`} />
                ))}
              </div>
            )}
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
          {loading ? (
            <div className="text-center py-16 text-th-teal/50 font-body">Loading products...</div>
          ) : error ? (
            <div className="text-center py-16 text-red-500 font-body">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => {
                const canCheckout = !product.external && (product.rawPrice ?? 0) > 0 && product.badge !== "COMING SOON";

                if (product.external) {
                  return (
                    <a
                      key={product.id}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-shadow duration-300"
                    >
                      <ProductCardContent product={product} />
                    </a>
                  );
                }

                if (canCheckout) {
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-shadow duration-300"
                    >
                      <ProductCardContent
                        product={product}
                        onBuyNow={() => handleBuyNow(product.id)}
                        buying={checkingOut === product.id}
                      />
                    </div>
                  );
                }

                return (
                  <Link
                    key={product.id}
                    to={product.href}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-th-warm-mid hover:shadow-xl transition-shadow duration-300"
                  >
                    <ProductCardContent product={product} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* The Collective Promise */}
      <section className="bg-th-orange py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(ellipse at 50% 120%, rgba(255,255,255,0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col items-center gap-5">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <circle cx="22" cy="22" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <line x1="22" y1="2" x2="22" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="36" x2="22" y2="42" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="22" x2="8" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="36" y1="22" x2="42" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h2 className="font-heading text-3xl md:text-4xl font-black leading-tight">
            The Collective Promise.
          </h2>
          <p className="font-body text-white/80 text-base max-w-md leading-relaxed">
            Every purchase supports our Trailhound backcountry safety initiatives.
          </p>
          <div className="w-24 h-px bg-white/30 mt-2" />
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

interface CardProps {
  product: ProductDisplay;
  onBuyNow?: () => void;
  buying?: boolean;
}

function ProductCardContent({ product, onBuyNow, buying }: CardProps) {
  const isExternal = product.external;
  const canBuy = !!onBuyNow;

  return (
    <>
      {/* Image */}
      <div className="relative h-52 bg-th-warm-dim overflow-hidden">
        {canBuy ? (
          <Link to={`/shop/${product.id}`} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`font-body text-xs font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-sm ${
              badgeStyles[product.badge] || "bg-th-dark text-th-cream"
            }`}
          >
            {product.badge}
          </span>
        </div>
        {isExternal && (
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
          {canBuy ? (
            <Link to={`/shop/${product.id}`} onClick={(e) => e.stopPropagation()} className="hover:text-th-orange transition-colors">
              <h3 className="font-heading text-base font-bold text-th-dark leading-snug mb-1.5">
                {product.name}
              </h3>
            </Link>
          ) : (
            <h3 className="font-heading text-base font-bold text-th-dark leading-snug mb-1.5 group-hover:text-th-orange transition-colors">
              {product.name}
            </h3>
          )}
          <p className="font-body text-xs text-th-dark/60 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className={`flex items-center gap-3 pt-2 border-t border-th-warm-mid ${product.badge === "COMING SOON" ? "justify-end" : "justify-between"}`}>
          {product.badge !== "COMING SOON" && (
            <span className="font-heading text-lg font-bold text-th-dark">
              {product.price}
            </span>
          )}

          {canBuy ? (
            <button
              onClick={onBuyNow}
              disabled={buying}
              className="flex items-center gap-1.5 px-4 py-2 bg-th-orange text-white font-body text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-wait"
            >
              {buying ? (
                <>
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Processing...
                </>
              ) : product.badge === "PRE-ORDER" ? "Pre-Order" : "Buy Now"}
            </button>
          ) : isExternal ? (
            <span className="flex items-center gap-1.5 px-4 py-2 bg-th-orange text-white font-body text-xs font-bold rounded-lg group-hover:bg-orange-600 transition-colors whitespace-nowrap">
              Shop Now
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          ) : product.badge === "COMING SOON" ? (
            <span className="px-4 py-2 bg-th-light-peach text-th-brown font-body text-xs font-bold rounded-lg whitespace-nowrap">
              Coming Soon
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 bg-th-orange text-white font-body text-xs font-bold rounded-lg group-hover:bg-orange-600 transition-colors whitespace-nowrap">
              Learn More
            </span>
          )}
        </div>
      </div>
    </>
  );
}
