import { useState, useEffect } from "react";

export function useSectionBackground(section: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/hero-images?page=${encodeURIComponent(section)}`)
      .then((r) => r.json())
      .then((res) => {
        const first = (res.data || [])[0];
        setImageUrl(first?.image_url ?? null);
      })
      .catch(() => setImageUrl(null));
  }, [section]);

  return imageUrl;
}
