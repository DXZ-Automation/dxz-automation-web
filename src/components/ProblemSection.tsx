"use client";

import { motion } from "framer-motion";
import { RedFrameCorners } from "@/components/ui/red-frame-corners";

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
    <section className="relative px-6 py-20 md:py-32 lg:px-[72px]">
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
          <h2 className="font-mono text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
            <span className="block">Your business is bleeding.</span>
            <span className="mt-3 block italic text-white">You just can&apos;t see it.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ stat, label, detail }, i) => (
            <motion.div
              key={stat}
              className="group relative bg-[#030303] p-10 hover:bg-red-950/[0.03] shadow-[inset_0_0_0_1px_#dc2626] hover:shadow-[inset_0_0_0_2px_#dc2626] transition-[background-color,box-shadow] duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <RedFrameCorners />
              <div className="mb-6">
                <span className="font-mono text-5xl font-black text-white">{stat}</span>
              </div>
              <p className="font-mono text-xs tracking-widest uppercase text-red-500 mb-3">
                {label}
              </p>
              <p className="font-mono text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">
                {detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
