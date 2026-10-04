import { useEffect } from "react";

const SITE_NAME = "Trailhound Veterinary Collective";
const SITE_URL = "https://trailhoundvetco.com";
const DEFAULT_IMAGE = `${SITE_URL}/trailhound-logo-full.png`;
const DEFAULT_DESCRIPTION =
  "Trailhound Veterinary Collective bridges everyday pet ownership and real-world emergency preparedness with field guides, courses, and tools for pet owners, vets, working dog handlers, and first responders.";

export interface SeoProps {
  /** Page-specific title. Rendered as "<title> | Trailhound Veterinary Collective". Omit on the home page. */
  title?: string;
  description?: string;
  /** Path (e.g. "/shop") or absolute URL used for canonical + og:url. Defaults to current path. */
  path?: string;
  /** Absolute or root-relative image URL for social sharing. */
  image?: string;
  /** og:type, defaults to "website". */
  type?: string;
  /** Set true to tell crawlers not to index this page (e.g. admin, cart). */
  noIndex?: boolean;
}

/** Upserts a meta tag by name or property attribute. */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight, dependency-free SEO manager for this SPA.
 * Updates document title, meta description, canonical, Open Graph, and Twitter tags per page.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const resolvedPath =
      path ??
      (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonical = resolvedPath.startsWith("http")
      ? resolvedPath
      : `${SITE_URL}${resolvedPath === "/" ? "/" : resolvedPath.replace(/\/$/, "")}`;
    const absImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow",
    );
    setLink("canonical", canonical);

    // Open Graph
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", absImage);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absImage);
  }, [title, description, path, image, type, noIndex]);

  return null;
}
