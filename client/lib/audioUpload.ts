import { supabaseBrowser } from "./supabaseClient";

const BUCKET = "podcast-audio";
const MAX_BYTES = 100 * 1024 * 1024; // 100MB safety cap

/**
 * Uploads an audio file directly from the browser to Supabase Storage
 * (bypassing the serverless function, which caps request bodies at ~4.5MB)
 * and returns the public URL to store in podcasts.audio_url.
 */
export async function uploadAudio(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  if (!file.type.startsWith("audio/")) {
    throw new Error("Please select an audio file (mp3, m4a, wav, etc.)");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Audio file is too large (max 100MB)");
  }

  // Unique, filesystem-safe path
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${safeName}`;

  onProgress?.(10);

  const { error } = await supabaseBrowser.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    const msg = (error.message || "").toLowerCase();
    if (msg.includes("row-level security") || msg.includes("policy") || msg.includes("unauthorized")) {
      throw new Error(
        "Upload blocked by Storage permissions. Run supabase-podcast-audio-storage.sql (or add an INSERT policy for the 'podcast-audio' bucket) in Supabase.",
      );
    }
    if (msg.includes("bucket not found") || msg.includes("not found")) {
      throw new Error("Storage bucket 'podcast-audio' does not exist yet. Run supabase-podcast-audio-storage.sql in Supabase.");
    }
    if (msg.includes("exceeded") || msg.includes("maximum") || msg.includes("size")) {
      throw new Error("Audio file exceeds the bucket size limit. Raise the bucket's file size limit in Supabase Storage settings.");
    }
    throw new Error(error.message || "Failed to upload audio");
  }

  onProgress?.(90);

  const { data } = supabaseBrowser.storage.from(BUCKET).getPublicUrl(path);
  onProgress?.(100);

  if (!data?.publicUrl) throw new Error("Failed to resolve public URL");
  return data.publicUrl;
}
