import { NextRequest, NextResponse } from "next/server";
import faqs from "@/data/dxz-faqs.json";

// ── Rate limiter ──────────────────────────────────────────────────────────────
// 20 requests per IP per 60-second window.
// Map is process-scoped — resets on cold starts, which is acceptable for a
// chat widget. For persistent limiting, move to Vercel KV or WAF rules.
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + RATE_WINDOW_MS };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + RATE_WINDOW_MS;
  }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > RATE_LIMIT;
}

// ── FAQ matching ──────────────────────────────────────────────────────────────
const STOPWORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "at", "to", "for", "of", "and",
  "or", "but", "do", "you", "i", "me", "my", "we", "our", "what", "how",
  "can", "does", "will", "would", "your", "this", "that", "with", "are",
  "be", "have", "has", "get", "us", "about", "up", "if", "just", "more",
  "some", "any", "not", "no", "so", "out", "like", "from", "by",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function findFaq(query: string) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  let bestScore = 0;
  let bestFaq: (typeof faqs)[number] | null = null;

  for (const faq of faqs) {
    const tagTokens = faq.tags.flatMap((t) => tokenize(t));
    const score = tokens.filter((t) => tagTokens.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  return bestScore > 0 ? bestFaq : null;
}

// ── OpenAI fallback ───────────────────────────────────────────────────────────
async function openAIFallback(query: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "I'm best at answering questions about DXZ Automation's services and pricing. For anything else, book a call at cal.com/dxz-automation.";
  }

  const systemPrompt = `You are a concise sales assistant for DXZ Automation, an AI revenue recovery agency that works with trades businesses.
Primary clients: HVAC, plumbing, roofing, electrical, general contracting, landscaping, and other trades.
Core pain points we solve: missed calls while on job sites, slow response to Google/Facebook leads, estimate no-shows, wasted drive time.
Three systems we build:
- Missed Call Text-Back ($1,999): SMS within 60s of any missed call — keeps the lead from calling your competitor. Recovers $3K–$8K/month.
- Speed-to-Lead ($1,999): instant automated reply when a lead comes in via any channel. First-to-respond wins the job.
- No-Show Recovery ($1,999): multi-touch SMS before every appointment. Cuts estimate no-shows and service cancellations 60–80%.
- Bundle: all three for $4,999. Most trades owners recover this in the first month.
- AI Growth Partner retainer: $9,999/month for ongoing builds.
Book a call: cal.com/dxz-automation (15 min, no pitch, straight answer on ROI).
Answer in 2–3 sentences. Use trades language: job site, missed call, estimate trip, service call. Dollar-specific, no fluff. Never use em-dashes or "leverage".`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
      max_tokens: 200,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    return "I'm having trouble answering that right now. Book a 15-minute call at cal.com/dxz-automation for a direct answer.";
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "Book a call at cal.com/dxz-automation for a straight answer.";
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let query: string;
  try {
    const body = await req.json();
    query = typeof body?.message === "string" ? body.message.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!query || query.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const matched = findFaq(query);
  if (matched) {
    return NextResponse.json({ answer: matched.answer, source: "faq" });
  }

  const answer = await openAIFallback(query);
  return NextResponse.json({ answer, source: "ai" });
}
