import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db.js";

const cors = (res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const mapArticle = (a: any) => ({
  ...a,
  readTime: a.read_time || "5 min read",
  date: a.date ? new Date(a.date).toISOString().split("T")[0] : "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const slugFromQuery = Array.isArray(req.query.slug)
    ? req.query.slug
    : req.query.slug
    ? [req.query.slug as string]
    : [];

  // Fallback: parse langsung dari URL bila Vercel tidak mengisi req.query.slug
  // (catch-all [...slug] kadang tidak ter-populate tergantung konfigurasi build).
  const slugFromUrl = (() => {
    const raw = (req.url || "").split("?")[0]; // buang query string
    const parts = raw.split("/").filter(Boolean); // ["api", "hero-images", ...]
    if (parts[0] === "api") return parts.slice(1);
    return parts;
  })();

  const slugParts = slugFromQuery.length > 0 ? slugFromQuery : slugFromUrl;

  const [resource, sub] = slugParts;

  try {
    // GET /api/ping
    if (resource === "ping") {
      return res.json({ message: process.env.PING_MESSAGE ?? "ping" });
    }

    // GET /api/articles
    if (resource === "articles" && !sub) {
      const { data, error } = await db
        .from("articles")
        .select("*")
        .order("date", { ascending: false });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: (data || []).map(mapArticle) });
    }

    // GET /api/articles/featured
    if (resource === "articles" && sub === "featured") {
      const { data, error } = await db
        .from("articles")
        .select("*")
        .eq("featured", true)
        .order("date", { ascending: false })
        .limit(5);
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: (data || []).map(mapArticle) });
    }

    // GET /api/articles/home-featured
    if (resource === "articles" && sub === "home-featured") {
      const { data, error } = await db
        .from("articles")
        .select("*")
        .eq("home_featured", true)
        .order("date", { ascending: false })
        .limit(3);
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: (data || []).map(mapArticle) });
    }

    // GET /api/articles/:id
    if (resource === "articles" && sub) {
      const { data, error } = await db.from("articles").select("*").eq("id", sub).single();
      if (error) return res.status(404).json({ data: null, error: "Article not found" });
      return res.json({ data: mapArticle(data) });
    }

    // GET /api/courses
    if (resource === "courses" && !sub) {
      const { data, error } = await db
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/courses/featured
    if (resource === "courses" && sub === "featured") {
      const { data, error } = await db
        .from("courses")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/courses/:id
    if (resource === "courses" && sub) {
      const { data, error } = await db.from("courses").select("*").eq("id", sub).single();
      if (error) return res.status(404).json({ data: null, error: "Course not found" });
      return res.json({ data });
    }

    // GET /api/products
    if (resource === "products" && !sub) {
      const { data, error } = await db
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/products/featured
    if (resource === "products" && sub === "featured") {
      const { data, error } = await db
        .from("products")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/products/field-guide-featured
    if (resource === "products" && sub === "field-guide-featured") {
      const { data, error } = await db
        .from("products")
        .select("*")
        .eq("field_guide_featured", true)
        .limit(1)
        .maybeSingle();
      if (error) return res.status(400).json({ data: null, error: error.message });
      return res.json({ data: data || null });
    }

    // GET /api/products/shop-hero-featured
    if (resource === "products" && sub === "shop-hero-featured") {
      const { data, error } = await db
        .from("products")
        .select("*")
        .eq("shop_hero_featured", true)
        .limit(1)
        .maybeSingle();
      if (error) return res.status(400).json({ data: null, error: error.message });
      return res.json({ data: data || null });
    }

    // GET /api/products/:id
    if (resource === "products" && sub) {
      const { data, error } = await db.from("products").select("*").eq("id", sub).single();
      if (error) return res.status(404).json({ data: null, error: "Product not found" });
      return res.json({ data });
    }

    // GET /api/podcasts
    if (resource === "podcasts" && !sub) {
      const { data, error } = await db
        .from("podcasts")
        .select("*")
        .order("episode_number", { ascending: false });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/podcasts/:id
    if (resource === "podcasts" && sub) {
      const { data, error } = await db.from("podcasts").select("*").eq("id", sub).single();
      if (error) return res.status(404).json({ data: null, error: "Podcast not found" });
      return res.json({ data });
    }

    // GET /api/hero-images?page=X
    if (resource === "hero-images") {
      const page = (req.query.page as string) || "home";
      const { data, error } = await db
        .from("hero_images")
        .select("*")
        .eq("active", true)
        .eq("page", page)
        .order("display_order", { ascending: true })
        .limit(6);
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/pack-field-reports
    if (resource === "pack-field-reports") {
      const { data, error } = await db
        .from("field_reports")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/pack-testimonials
    if (resource === "pack-testimonials") {
      const { data, error } = await db
        .from("pack_testimonials")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // GET /api/pack-gallery
    if (resource === "pack-gallery") {
      const { data, error } = await db
        .from("pack_gallery")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) return res.status(400).json({ data: [], error: error.message });
      return res.json({ data: data || [] });
    }

    // POST /api/subscribe
    if (resource === "subscribe" && req.method === "POST") {
      const { email } = req.body || {};
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Valid email required" });
      }
      const { error } = await db.from("subscribers").insert([{ email }]);
      if (error) {
        if (error.code === "23505") {
          return res.status(409).json({ error: "This email is already subscribed." });
        }
        return res.status(400).json({ error: error.message });
      }
      return res.status(201).json({ message: "Successfully subscribed! Welcome to the pack." });
    }

    return res.status(404).json({ error: "Not found" });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Internal server error" });
  }
}
