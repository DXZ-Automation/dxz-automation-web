# Security & Stability Remediation Notes

**Branch:** `autonomous-audit-remediation`  
**Date:** 2026-05-29  
**Repo path:** `/Users/zak/DXZ Automation-web/`

---

## Fixes Applied

### A — Rate Limiter: In-memory Map → Upstash Redis
**File:** `src/app/api/chat/route.ts`, `src/lib/rate-limit.ts` (new)  
**Problem:** The `/api/chat` endpoint used a `Map<string, ...>` for rate limiting. In serverless environments (Vercel Edge/Lambda), each cold start gets a fresh Map — limits reset constantly, providing no real protection.  
**Fix:** Replaced with `@upstash/ratelimit` sliding-window limiter backed by Upstash Redis. Falls back to allow-all if the env vars aren't set, so local dev works without Redis.  
**Packages added:** `@upstash/ratelimit`, `@upstash/redis`

### B — Content Security Policy: remove unsafe-eval in production, add HSTS
**File:** `next.config.ts`  
**Problem:** `unsafe-eval` was unconditionally present in `script-src`. This allows arbitrary `eval()` execution and is a meaningful XSS amplifier.  
**Fix:** `unsafe-eval` now only appears in the `script-src` directive when `NODE_ENV=development` (needed for Turbopack HMR). Production builds no longer include it. Also added `Strict-Transport-Security` (HSTS, 2-year max-age, includeSubDomains, preload) for production, and `upgrade-insecure-requests`.

### C — Dead dependencies removed
**File:** `package.json`  
**Removed:**
- `ai` (Vercel AI SDK v6) — not imported anywhere in `src/`
- `shadcn` — this is a CLI scaffolding tool, not a runtime library; was listed as a production dependency

Also removed the `@import "shadcn/tailwind.css"` line from `src/app/globals.css` which broke the build after `shadcn` was uninstalled. All CSS tokens it would have provided are already defined inline in the same file.

### D — Environment variable validation at startup
**Files:** `src/lib/env-check.ts` (new), `src/app/layout.tsx`  
**Problem:** Missing `OPENAI_API_KEY` caused a silent no-op fallback deep in the request handler rather than a clear error.  
**Fix:** `validateEnvironment()` called from `layout.tsx` (server-side, runs on cold start). In dev/CI it throws immediately on missing required vars. In production it logs `console.error` (visible in Vercel runtime logs) without crashing.

### E — require() in TypeScript files
No `require()` calls found in app source (`src/`). Nothing to change.

### F — ESLint config and dead import cleanup
**Files:** `eslint.config.mjs`, `src/components/CTASection.tsx`  
- Added `.vercel/`, `.claude/`, `.agents/`, `.claude-flow/`, `.codex/`, `.swarm/` to ESLint ignore list so linter doesn't scan minified build artifacts or Claude Code hook internals.
- Removed unused `Button` import from `CTASection.tsx`.
- Lint now passes with 0 errors, 0 warnings.

---

## Manual Steps Required (Vercel Dashboard)

### 1. Create Upstash Redis database and add env vars
Rate limiting is currently a no-op in production until these are set:

1. Go to [console.upstash.com](https://console.upstash.com) → create a new Redis database (free tier is fine)
2. Copy the REST URL and token
3. In Vercel dashboard → project settings → Environment Variables, add:
   - `UPSTASH_REDIS_REST_URL` = `https://your-db.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` = `your-token`
4. Redeploy to pick up the new vars

### 2. Verify OPENAI_API_KEY is set in Vercel
The chat widget falls back to a static message if this is missing. Check Vercel → Environment Variables → confirm `OPENAI_API_KEY` is present for Production.

### 3. HSTS preload (optional, future)
Once HSTS is confirmed working via Vercel's SSL, submit the domain to the HSTS preload list at [hstspreload.org](https://hstspreload.org). This is optional but adds extra protection.

---

## Build & Lint Status
- `npm run build` — passes (Turbopack, 0 errors)
- `npm run lint` — passes (0 errors, 0 warnings)
- TypeScript — no errors
