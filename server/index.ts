import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getArticles, getArticleById, getFeaturedArticles, getHomeFeaturedArticles } from "./routes/articles";
import { getProducts, getProductById, getFeaturedProducts } from "./routes/products";
import { getCourses, getCourseById, getFeaturedCourses } from "./routes/courses";
import { getPodcasts, getPodcastById } from "./routes/podcasts";
import { createArticle, updateArticle, deleteArticle } from "./routes/admin-articles";
import { createProduct, updateProduct, deleteProduct } from "./routes/admin-products";
import { createCourse, updateCourse, deleteCourse } from "./routes/admin-courses";
import { createPodcast, updatePodcast, deletePodcast } from "./routes/admin-podcasts";
import { subscribe } from "./routes/subscribe";
import { genericCreate, genericUpdate, genericDelete } from "./routes/admin-generic";
import { getHeroImages } from "./routes/hero-images";
import { getFieldGuideFeaturedProduct } from "./routes/products-field-guide-featured";
import { getShopHeroFeaturedProduct } from "./routes/products-shop-hero-featured";
import { getPackFieldReports } from "./routes/pack-field-reports";
import { getPackTestimonials } from "./routes/pack-testimonials";
import { getPackGallery } from "./routes/pack-gallery";
import { createCheckoutSession } from "./routes/checkout";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  // Body limit dinaikkan agar upload gambar base64 (setelah kompresi) tidak ditolak
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Articles routes — specific paths must come before /:id
  app.get("/api/articles", getArticles);
  app.get("/api/articles/featured", getFeaturedArticles);
  app.get("/api/articles/home-featured", getHomeFeaturedArticles);
  app.get("/api/articles/:id", getArticleById);

  // Products routes — specific paths must come before /:id
  app.get("/api/products", getProducts);
  app.get("/api/products/featured", getFeaturedProducts);
  app.get("/api/products/field-guide-featured", getFieldGuideFeaturedProduct);
  app.get("/api/products/shop-hero-featured", getShopHeroFeaturedProduct);
  app.get("/api/products/:id", getProductById);

  // Courses routes
  app.get("/api/courses", getCourses);
  app.get("/api/courses/featured", getFeaturedCourses);
  app.get("/api/courses/:id", getCourseById);

  // Podcasts routes (ready for future use)
  app.get("/api/podcasts", getPodcasts);
  app.get("/api/podcasts/:id", getPodcastById);

  // Admin routes
  app.post("/api/admin/articles", createArticle);
  app.put("/api/admin/articles/:id", updateArticle);
  app.delete("/api/admin/articles/:id", deleteArticle);

  app.post("/api/admin/products", createProduct);
  app.put("/api/admin/products/:id", updateProduct);
  app.delete("/api/admin/products/:id", deleteProduct);

  app.post("/api/admin/courses", createCourse);
  app.put("/api/admin/courses/:id", updateCourse);
  app.delete("/api/admin/courses/:id", deleteCourse);

  app.post("/api/admin/podcasts", createPodcast);
  app.put("/api/admin/podcasts/:id", updatePodcast);
  app.delete("/api/admin/podcasts/:id", deletePodcast);

  // Newsletter subscription
  app.post("/api/subscribe", subscribe);

  // Hero images
  app.get("/api/hero-images", getHeroImages);

  // Generic admin routes — must come AFTER specific admin routes
  app.post("/api/admin/:table", genericCreate);
  app.put("/api/admin/:table/:id", genericUpdate);
  app.delete("/api/admin/:table/:id", genericDelete);

  // The Pack data
  app.get("/api/pack-field-reports", getPackFieldReports);
  app.get("/api/pack-testimonials", getPackTestimonials);
  app.get("/api/pack-gallery", getPackGallery);

  // Stripe checkout
  app.post("/api/checkout/create-session", createCheckoutSession);

  return app;
}
