import dotenv from "dotenv";
import path from "path";
import express from "express";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getArticles, getArticleById, getFeaturedArticles } from "./routes/articles";
import { getProducts, getProductById, getFeaturedProducts } from "./routes/products";
import { getCourses, getCourseById, getFeaturedCourses } from "./routes/courses";
import { getPodcasts, getPodcastById } from "./routes/podcasts";
import { createArticle, updateArticle, deleteArticle } from "./routes/admin-articles";
import { createProduct, updateProduct, deleteProduct } from "./routes/admin-products";
import { createCourse, updateCourse, deleteCourse } from "./routes/admin-courses";
import { createPodcast, updatePodcast, deletePodcast } from "./routes/admin-podcasts";

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

  return app;
}
