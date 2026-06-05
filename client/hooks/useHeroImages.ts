import { useState, useEffect } from "react";
import { HeroImage } from "@shared/api";

export function useHeroImages(page: string) {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/hero-images?page=${encodeURIComponent(page)}`)
      .then((r) => r.json())
      .then((res) => { setImages(res.data || []); setLoaded(true); })
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
