import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { data, error } = await db
      .from("products")
      .select("*")
      .eq("field_guide_featured", true)
      .limit(1)
      .maybeSingle();

    if (error) return res.status(400).json({ data: null, error: error.message });
    res.json({ data: data || null });
  } catch (error) {
    res.status(500).json({ data: null, error: "Failed to fetch featured product" });
  }
}
