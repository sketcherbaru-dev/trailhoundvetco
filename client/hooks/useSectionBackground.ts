import { useState, useEffect } from "react";

function readCache(section: string): string | null {
  try { return localStorage.getItem(`th_bg_${section}`); } catch { return null; }
}

export function useSectionBackground(section: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(() => readCache(section));

  useEffect(() => {
    fetch(`/api/hero-images?page=${encodeURIComponent(section)}`)
      .then((r) => r.json())
      .then((res) => {
        const first = (res.data || [])[0];
        const url: string | null = first?.image_url ?? null;
        setImageUrl(url);
        if (url) {
          try { localStorage.setItem(`th_bg_${section}`, url); } catch {}
        }
      })
      .catch(() => {});
  }, [section]);

  return imageUrl;
}
