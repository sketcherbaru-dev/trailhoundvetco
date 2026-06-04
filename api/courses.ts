import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { data, error } = await db
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[API] Supabase error:", error);
      return res.status(400).json({ data: null, error: error.message });
    }

    res.json({ data: data || [] });
  } catch (error) {
    console.error("[API] Error:", error);
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : "Failed to fetch courses",
    });
  }
}
