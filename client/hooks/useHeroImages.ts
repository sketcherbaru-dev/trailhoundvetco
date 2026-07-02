import { useState, useEffect } from "react";
import { HeroImage } from "@shared/api";

function readCache(page: string): HeroImage[] {
  try {
    const raw = localStorage.getItem(`th_hero_${page}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function writeCache(page: string, data: HeroImage[]) {
  try { localStorage.setItem(`th_hero_${page}`, JSON.stringify(data)); } catch {}
}

export function useHeroImages(page: string) {
  const [images, setImages] = useState<HeroImage[]>(() => readCache(page));
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => readCache(page).length > 0);

  useEffect(() => {
    fetch(`/api/hero-images?page=${encodeURIComponent(page)}`)
      .then((r) => r.json())
      .then((res) => {
        const data: HeroImage[] = res.data || [];
        setImages(data);
        setLoaded(true);
        if (data.length > 0) writeCache(page, data);
      })
      .catch(() => setLoaded(true));
  }, [page]);

  // Auto-advance carousel when multiple images
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return { images, index, setIndex, loaded, current: images[index] ?? null };
}
