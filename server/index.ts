import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import authRoutes from "./routes/auth";
import { publicContent, adminContent } from "./routes/content";
import uploadRoutes from "./routes/upload";
import { checkout, webhook } from "./routes/payments";

export function createServer() {
  const app = express();

  app.use(cors());

  // Stripe webhook must receive the raw body, so mount it BEFORE json parsing.
  app.use("/api/stripe", webhook);

  // Middleware
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Health / examples
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);

  // Auth
  app.use("/api/auth", authRoutes);

  // Public content + checkout
  app.use("/api", publicContent);
  app.use("/api", checkout);

  // Admin (protected inside the routers)
  app.use("/api/admin", adminContent);
  app.use("/api/admin", uploadRoutes);

  return app;
}
