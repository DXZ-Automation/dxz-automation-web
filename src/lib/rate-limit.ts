import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let ratelimit: Ratelimit | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(20, '60 s'),
    analytics: false,
  })
}

/**
 * Check rate limit for the given identifier (typically an IP address).
 * Falls back to allowing all requests if Upstash env vars are not configured.
 */
export async function checkRateLimit(identifier: string): Promise<{ success: boolean }> {
  if (!ratelimit) return { success: true }
  const result = await ratelimit.limit(identifier)
  return { success: result.success }
}
