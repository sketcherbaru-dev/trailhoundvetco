import express from "express";
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
import { uploadImage } from "./routes/upload";
import { signup, login, logout, verifyToken } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";

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

  // Auth routes
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", authMiddleware, logout);
  app.post("/api/auth/verify", verifyToken);

  // Upload routes
  app.post("/api/upload", uploadImage);

  // Admin routes (protected by auth middleware)
  app.post("/api/admin/articles", authMiddleware, createArticle);
  app.put("/api/admin/articles/:id", authMiddleware, updateArticle);
  app.delete("/api/admin/articles/:id", authMiddleware, deleteArticle);

  app.post("/api/admin/products", authMiddleware, createProduct);
  app.put("/api/admin/products/:id", authMiddleware, updateProduct);
  app.delete("/api/admin/products/:id", authMiddleware, deleteProduct);

  app.post("/api/admin/courses", authMiddleware, createCourse);
  app.put("/api/admin/courses/:id", authMiddleware, updateCourse);
  app.delete("/api/admin/courses/:id", authMiddleware, deleteCourse);

  app.post("/api/admin/podcasts", authMiddleware, createPodcast);
  app.put("/api/admin/podcasts/:id", authMiddleware, updatePodcast);
  app.delete("/api/admin/podcasts/:id", authMiddleware, deletePodcast);

  return app;
}
