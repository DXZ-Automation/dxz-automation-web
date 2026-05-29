/**
 * Startup environment validation.
 * Call validateEnvironment() at app boot to surface missing required vars
 * before they cause silent failures deep in request handling.
 *
 * Logs warnings in production rather than throwing — preserves uptime while
 * making misconfiguration obvious in Vercel runtime logs.
 */

const REQUIRED_ENV_VARS: string[] = [
  // OpenAI — used for AI fallback in the chat widget
  'OPENAI_API_KEY',
]

const OPTIONAL_ENV_VARS: string[] = [
  // Upstash Redis — enables persistent rate limiting across serverless instances.
  // Without these the rate limiter falls back to allowing all requests.
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  // Optional: override the default OpenAI model (gpt-4o-mini)
  'OPENAI_MODEL',
]

export function validateEnvironment(): void {
  const missing = REQUIRED_ENV_VARS.filter((v) => !process.env[v])
  const missingOptional = OPTIONAL_ENV_VARS.filter((v) => !process.env[v])

  if (missing.length > 0) {
    const msg = `[env] MISSING required environment variables: ${missing.join(', ')}`
    if (process.env.NODE_ENV === 'production') {
      // Don't crash the server — log loudly so it shows in Vercel runtime logs
      console.error(msg)
    } else {
      // Throw in dev/CI so the developer catches it immediately
      throw new Error(msg)
    }
  }

  if (missingOptional.length > 0 && process.env.NODE_ENV !== 'test') {
    console.warn(
      `[env] Optional environment variables not set: ${missingOptional.join(', ')}. ` +
        'Some features will use fallback behavior.'
    )
  }
}
