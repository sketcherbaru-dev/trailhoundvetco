import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { data, error } = await db
      .from("field_reports")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error) return res.status(400).json({ data: [], error: error.message });
    res.json({ data: data || [] });
  } catch (error) {
    res.status(500).json({ data: [], error: "Failed to fetch field reports" });
  }
}
