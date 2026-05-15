"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const stats = [
  { value: "$3K–$8K", label: "Recovered / month" },
  { value: "7 days", label: "To go live" },
  { value: "60–80%", label: "No-show reduction" },
];

const headline = ["You're", "losing", "money", "every", "hour", "you", "wait."];

/* ── node-network SVG background ─────────────────────────────── */
function NetworkBg() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.11]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* connections */}
      <line x1="720" y1="450" x2="400" y2="280" stroke="#dc2626" strokeWidth="0.5" opacity="0.45" />
      <line x1="720" y1="450" x2="1040" y2="300" stroke="#dc2626" strokeWidth="0.5" opacity="0.35" />
      <line x1="720" y1="450" x2="600" y2="650" stroke="#dc2626" strokeWidth="0.5" opacity="0.25" />
      <line x1="720" y1="450" x2="900" y2="620" stroke="#dc2626" strokeWidth="0.5" opacity="0.2" />
      <line x1="400" y1="280" x2="200" y2="400" stroke="#dc2626" strokeWidth="0.3" opacity="0.2" />
      <line x1="1040" y1="300" x2="1240" y2="200" stroke="#dc2626" strokeWidth="0.3" opacity="0.2" />
      <line x1="1040" y1="300" x2="1100" y2="480" stroke="#dc2626" strokeWidth="0.3" opacity="0.15" />
      <line x1="400" y1="280" x2="560" y2="160" stroke="#dc2626" strokeWidth="0.3" opacity="0.15" />
      <line x1="600" y1="650" x2="900" y2="620" stroke="#dc2626" strokeWidth="0.3" opacity="0.12" />
      <line x1="200" y1="400" x2="560" y2="160" stroke="#dc2626" strokeWidth="0.25" opacity="0.1" />
      {/* nodes */}
      <circle cx="720" cy="450" r="4" fill="#dc2626" opacity="0.8" />
      <circle cx="720" cy="450" r="14" fill="url(#ng)" opacity="0.5" />
      <circle cx="400" cy="280" r="2.5" fill="#dc2626" opacity="0.5" />
      <circle cx="1040" cy="300" r="2.5" fill="#dc2626" opacity="0.4" />
      <circle cx="600" cy="650" r="2" fill="#dc2626" opacity="0.3" />
      <circle cx="900" cy="620" r="2" fill="#dc2626" opacity="0.3" />
      <circle cx="200" cy="400" r="1.5" fill="#dc2626" opacity="0.2" />
      <circle cx="1240" cy="200" r="1.5" fill="#dc2626" opacity="0.2" />
      <circle cx="1100" cy="480" r="1.5" fill="#dc2626" opacity="0.2" />
      <circle cx="560" cy="160" r="1.5" fill="#dc2626" opacity="0.2" />
    </svg>
  );
}

/* ── cursor spotlight ─────────────────────────────────────────── */
function CursorSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);

  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(220,38,38,0.04), transparent 70%)`,
      }}
    />
  );
}

/* ── word reveal ──────────────────────────────────────────────── */
function Word({ word, delay }: { word: string; delay: number }) {
  const isAccent = word === "money";
  return (
    <motion.span
      className={`inline-block mr-[0.22em] last:mr-0 ${isAccent ? "italic text-red-500" : ""}`}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  );
}

/* ── main ─────────────────────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const y = useSpring(rawY, { stiffness: 55, damping: 18 });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      <NetworkBg />
      <CursorSpotlight />

      <section
        ref={ref}
        className="relative flex min-h-screen items-center overflow-hidden bg-[#030303]"
      >
        {/* Breathing red glow */}
        <motion.div
          className="pointer-events-none absolute left-[30%] top-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-red-700/[0.06] blur-[160px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Left-aligned content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-[72px] pt-28 pb-20"
        >
          <div className="max-w-[780px]">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-14"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="w-8 h-px bg-red-600 opacity-50" />
              <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-red-500">
                AI Revenue Recovery Systems
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-black leading-[0.92] tracking-tight text-white mb-10">
              {headline.map((word, i) => (
                <Word key={i} word={word} delay={0.2 + i * 0.08} />
              ))}
            </h1>

            {/* Sub */}
            <motion.p
              className="font-sans text-base font-light text-zinc-500 leading-[1.8] max-w-[440px] mb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
            >
              Missed calls. Slow lead response. No-shows.
              <br />
              DXZ Automation builds the systems that stop the bleed — in 7 days.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.55 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-none bg-red-600 hover:bg-red-500 text-white font-sans text-xs tracking-[0.2em] uppercase px-10 h-14 transition-colors"
              >
                Find my revenue leak →
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center rounded-none border border-white/[0.06] bg-transparent text-zinc-500 hover:border-white/[0.15] hover:text-white font-sans text-xs tracking-[0.2em] uppercase px-10 h-14 transition-all"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Stats — right column */}
          <motion.div
            className="hidden lg:flex absolute right-[72px] top-1/2 -translate-y-1/2 flex-col border-l border-white/[0.04]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="px-12 py-8 border-b border-white/[0.04] last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.1, duration: 0.5 }}
              >
                <span className="font-serif text-3xl font-black text-white block mb-1.5">{value}</span>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-zinc-700">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-[72px] flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <div className="relative h-10 w-px overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 to-transparent"
                animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-zinc-800">Scroll</span>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
