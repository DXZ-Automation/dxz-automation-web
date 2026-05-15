"use client";

import { motion } from "framer-motion";

const problems = [
  {
    stat: "$8K/mo",
    label: "lost to missed calls",
    detail:
      "Every call you don't answer is a lead that found your competitor. HVAC, plumbing, roofing — the phone is the business.",
  },
  {
    stat: "10×",
    label: "conversion drop after 5 minutes",
    detail:
      "Lead response speed is the deciding factor. If you're not first, you're paying for leads you'll never close.",
  },
  {
    stat: "30%",
    label: "of appointments never show",
    detail:
      "No-shows are silent revenue destruction. They kill your schedule, your morale, and your margin — every single week.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative bg-[#030303] px-6 py-20 md:py-32 lg:px-[72px]">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-4">
            The Problem
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
            <span className="block">Your business is bleeding.</span>
            <span className="mt-3 block italic text-zinc-600">You just can&apos;t see it.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
          {problems.map(({ stat, label, detail }, i) => (
            <motion.div
              key={stat}
              className="bg-[#030303] p-10 group hover:bg-red-950/[0.03] transition-colors duration-300 border-l-2 border-transparent hover:border-red-600"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="mb-6">
                <span className="font-serif text-5xl font-black text-red-500">{stat}</span>
              </div>
              <p className="font-mono text-xs tracking-widest uppercase text-zinc-500 mb-3">
                {label}
              </p>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">
                {detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 border-l-2 border-red-600 pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-serif text-2xl lg:text-3xl italic text-zinc-300">
            &ldquo;We find the money you&apos;re already losing<br />and automate getting it back.&rdquo;
          </p>
          <p className="font-mono text-xs tracking-widest uppercase text-zinc-700 mt-4">
            — Zak Saumier, DXZ Automation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
