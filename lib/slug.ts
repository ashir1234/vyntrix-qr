/**
 * Custom short-link slug helpers for Pro dynamic QR codes.
 * Slugs appear in /r/{slug} and must stay URL-safe and conflict-free.
 */

const RESERVED = new Set([
  "api",
  "studio",
  "gallery",
  "guides",
  "manage",
  "dashboard",
  "pricing",
  "privacy",
  "terms",
  "sign-in",
  "sign-up",
  "signin",
  "signup",
  "login",
  "r",
  "admin",
  "www",
  "static",
  "assets",
  "favicon",
  "robots",
  "sitemap",
  "ads",
  "llms",
  "manifest",
  "opengraph-image",
  "icon",
]);

/** Normalize user input: trim, lowercase, collapse separators. */
export function normalizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Validate a custom slug. Returns an error message, or null if valid.
 * Rules: 3–32 chars, lowercase letters/numbers/hyphens, not reserved.
 */
export function validateCustomSlug(raw: string): string | null {
  const slug = normalizeSlug(raw);
  if (slug.length < 3) {
    return "Custom slug must be at least 3 characters.";
  }
  if (slug.length > 32) {
    return "Custom slug must be 32 characters or fewer.";
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return "Use only letters, numbers, and hyphens (e.g. my-menu).";
  }
  if (RESERVED.has(slug)) {
    return "That slug is reserved. Please choose another.";
  }
  return null;
}
