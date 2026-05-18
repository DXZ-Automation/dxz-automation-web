"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "bot"; text: string };

const SUGGESTED = [
  "I miss calls when I'm on a job site",
  "How do I stop estimate no-shows?",
  "What does it cost for all three systems?",
  "How fast can you have this running?",
];

export function DXZChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "What do you want to know? I'll give you a straight answer.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer ?? "Something went wrong. Try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Connection error. Try again or book a call at cal.com/dxz-automation." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask DXZ Automation"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors duration-200 shadow-[0_0_24px_rgba(220,38,38,0.5)] flex items-center justify-center group"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col bg-[#0a0a0a] border border-white/[0.07] shadow-2xl overflow-hidden"
          style={{ maxHeight: "min(540px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400">DXZ Automation</p>
              <p className="font-serif text-sm font-bold text-white leading-tight">Revenue Recovery</p>
            </div>
            <a
              href="https://cal.com/dxz-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-[9px] tracking-widest uppercase text-red-500 border border-red-600/30 px-2 py-1 hover:bg-red-600/10 transition-colors"
            >
              Book a call
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-red-600 text-white font-sans"
                      : "bg-[#141414] text-zinc-300 font-sans border border-white/[0.05]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#141414] border border-white/[0.05] px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions — only show at start */}
            {messages.length === 1 && !loading && (
              <div className="pt-2 space-y-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="w-full text-left font-mono text-[10px] tracking-wide text-zinc-500 border border-white/[0.05] px-3 py-2 hover:border-red-600/30 hover:text-zinc-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.06] px-4 py-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything…"
              disabled={loading}
              maxLength={500}
              className="flex-1 bg-[#141414] border border-white/[0.07] px-3 py-2 text-sm text-white placeholder:text-zinc-700 font-sans outline-none focus:border-red-600/40 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors flex items-center justify-center text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
