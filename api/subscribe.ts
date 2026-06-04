import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body || {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  try {
    const { error } = await db.from("subscribers").insert([{ email: email.toLowerCase().trim() }]);

    if (error) {
      // Duplicate email — treat as success to avoid enumeration
      if (error.code === "23505") {
        return res.json({ message: "You're already subscribed!" });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Successfully subscribed! Welcome to the pack." });
  } catch (error) {
    res.status(500).json({ error: "Failed to subscribe" });
  }
}
