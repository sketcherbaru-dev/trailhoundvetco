import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getArticles, getArticleById, getFeaturedArticles } from "./routes/articles";
import { getProducts, getProductById, getFeaturedProducts } from "./routes/products";
import { getCourses, getCourseById, getFeaturedCourses } from "./routes/courses";
import { getPodcasts, getPodcastById } from "./routes/podcasts";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Articles routes
  app.get("/api/articles", getArticles);
  app.get("/api/articles/featured", getFeaturedArticles);
  app.get("/api/articles/:id", getArticleById);

  // Products routes
  app.get("/api/products", getProducts);
  app.get("/api/products/featured", getFeaturedProducts);
  app.get("/api/products/:id", getProductById);

  // Courses routes
  app.get("/api/courses", getCourses);
  app.get("/api/courses/featured", getFeaturedCourses);
  app.get("/api/courses/:id", getCourseById);

  // Podcasts routes (ready for future use)
  app.get("/api/podcasts", getPodcasts);
  app.get("/api/podcasts/:id", getPodcastById);

  return app;
}
