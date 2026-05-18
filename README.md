# DXZ Automation — Marketing Site

AI revenue recovery systems for trades businesses. Built with Next.js 16, Tailwind CSS, deployed on Vercel.

## Deploy your own copy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDXZ-Automation%2Fdxz-automation-web&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20key%20for%20the%20FAQ%20chat%20widget%20(gpt-4o-mini)&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=dxz-automation-web&repository-name=dxz-automation-web)

**One-click install steps:**
1. Click the button above
2. Connect your GitHub account when prompted
3. Paste your [OpenAI API key](https://platform.openai.com/api-keys) when prompted
4. Click Deploy — live in ~30 seconds

## What's included

- Full marketing landing page (hero, services, process, markets, CTA)
- Floating FAQ chat widget (trades-specific, bottom-right)
- `/api/chat` — keyword FAQ matching + OpenAI `gpt-4o-mini` fallback
- Security headers (CSP, X-Frame-Options, HSTS, Referrer-Policy)
- Rate limiting: 20 req/min per IP on the chat API

## Local development

```bash
npm install
# create .env.local and add: OPENAI_API_KEY=your_key_here
npm run dev
```

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS + Framer Motion
- Twilio / Zapier / Google Calendar integrations (configured per-client)
