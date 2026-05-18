type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

// Purge expired entries every 10 minutes to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 10 * 60 * 1000).unref();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * key      — unique identifier (e.g. "login:1.2.3.4")
 * limit    — max requests in the window
 * windowMs — window duration in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}
