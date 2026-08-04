@AGENTS.md

# dxz-automation-web

Next.js marketing site for DXZ Automation. Public-facing, no Clerk auth. AI chat widget backed by OpenAI + FAQ matching.

## Commands

```bash
npm run dev    # dev server (Turbopack)
npm run build
npm run start
```

## Deployment

Use `/deploy` to commit, push, and deploy.

- URL: https://dxz-automation.vercel.app
- Team: Vercel DXZ Automation Pro
- Last deploy: 4d ago

## Deployment Verification

After any CSS/UI change: build locally, deploy, then verify the LIVE URL (not localhost) with a browser screenshot before reporting done. Never report a visual change complete based on local-only state.

## Visual Change Protocol

Before editing styling, restate the intended visual behavior in one sentence and wait for confirmation. Never remove or replace existing visual elements (borders, frames, decorative components) unless explicitly asked. One logical visual change per commit so it can be reverted independently.

## Key Routes

| Route | Purpose |
|---|---|
| `POST /api/chat` | FAQ match → OpenAI fallback; rate-limited via Upstash |

## Environment Variables (Vercel)

Required:
- `OPENAI_API_KEY` — server-side only; never exposed to browser
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — rate limiting (20 req/min/IP)
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN` — Vercel KV

## Security Audit (2026-06-03)

**Fixed:**
- MEDIUM: Rate-limit IP key used leftmost `x-forwarded-for` value — attacker-controlled on Vercel. Now uses `req.ip` (Vercel-verified) falling back to rightmost XFF entry (`src/app/api/chat/route.ts`)
- MEDIUM: `connect-src` CSP directive included `https://api.openai.com` — OpenAI is server-side only; browser never connects to it. Removed from CSP to reduce whitelist surface (`next.config.ts`)

**Remaining (no code fix — manual action):**
- `unsafe-inline` in `script-src` — required by Next.js/Tailwind; eliminate in future sprint via nonce-based CSP (Next.js middleware).
- `.claude-flow/` directory contains stale paths referencing `/Users/zak/axon-web` — tooling artifact only, not deployed. Safe to delete if committing `.claude-flow/`.
- Once stable: submit domain to HSTS preload list at hstspreload.org.
