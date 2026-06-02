import { Router, raw } from "express";
import { put } from "@vercel/blob";
import { requireAdmin } from "../lib/auth";

const router = Router();

// Accepts a raw binary body (the file) and stores it in Vercel Blob.
// Client sends: POST /api/admin/upload?filename=foo.png  with the file as the body.
router.post(
  "/upload",
  requireAdmin,
  raw({ type: "*/*", limit: "25mb" }),
  async (req, res) => {
    try {
      const filename = String(req.query.filename || "upload");
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      if (!req.body || !(req.body instanceof Buffer) || req.body.length === 0) {
        return res.status(400).json({ error: "No file provided" });
      }
      const blob = await put(`trailhound/${Date.now()}-${safeName}`, req.body, {
        access: "public",
        contentType: req.headers["content-type"] || undefined,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      res.json({ url: blob.url });
    } catch (err) {
      console.error("[v0] upload error", err);
      res.status(500).json({ error: "Upload failed" });
    }
  },
);

export default router;
