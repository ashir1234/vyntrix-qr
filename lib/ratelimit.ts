/**
 * Tiny in-memory fixed-window rate limiter. Good enough for a single Node
 * instance. For multi-instance/serverless, swap for Upstash Redis.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000,
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const ok = bucket.count <= limit;
  return { ok, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}

export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}
