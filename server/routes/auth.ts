import { Router } from "express";
import {
  checkCredentials,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  isAuthed,
} from "../lib/auth";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({
      error:
        "Admin credentials are not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD.",
    });
  }
  if (!checkCredentials(email, password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  setSessionCookie(res, createSessionToken());
  res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  res.json({ authenticated: isAuthed(req) });
});

export default router;
