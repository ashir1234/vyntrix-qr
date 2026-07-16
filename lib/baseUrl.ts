import { siteConfig } from "./site";

/** Resolve the public base URL from the incoming request (works in dev + prod). */
export function getBaseUrl(req: Request): string {
  const h = req.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto =
    h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  if (host) return `${proto}://${host}`;
  return siteConfig.url;
}
