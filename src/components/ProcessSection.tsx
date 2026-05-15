"use client";

import { motion } from "framer-motion";

const steps = [
  { day: "Day 0", action: "Close", detail: "Welcome email, client folder, onboarding questionnaire sent." },
  { day: "Day 1", action: "Call + Build", detail: "30-minute onboarding call. Build starts immediately after." },
  { day: "Days 1–3", action: "Build", detail: "All three systems built — missed call, lead response, no-show." },
  { day: "Day 3", action: "Review", detail: "Copy review check-in. Confirm messaging before going live." },
  { day: "Days 4–6", action: "QA", detail: "Edge cases, failure states, confirmation flows. Everything tested." },
  { day: "Day 7", action: "Live", detail: "Go-live launch, client walkthrough, handoff, support window opens." },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#030303] px-6 py-20 md:py-32 lg:px-[72px]">
      {/* Background text */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,20vw,18rem)] font-black text-white/[0.015] select-none leading-none">
        7 DAYS
      </div>

      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-4">
            The Process
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
            <span className="block">Signed to live.</span>
            <span className="mt-3 block italic text-zinc-600">Seven days.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-white/[0.04] hidden md:block" />

          <div className="space-y-0">
            {steps.map(({ day, action, detail }, i) => (
              <motion.div
                key={day}
                className="relative grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-6 py-8 border-b border-white/[0.04] group"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Day marker */}
                <div className="flex items-start gap-4 md:flex-col">
                  <div className="relative hidden md:flex h-7 w-7 items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600 group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-700">{day}</span>
                </div>

                {/* Content */}
                <div className="flex flex-wrap items-baseline gap-4 md:pl-8">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {action}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 p-10 border border-white/[0.04] bg-[#080808] flex flex-wrap gap-10 items-center justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="font-serif text-2xl font-bold text-white">Build it once. Run it forever.</p>
            <p className="font-sans text-sm text-zinc-600 mt-2">
              13–18 hours total build time. Recurring revenue from day one.
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-red-500 border border-red-600/20 px-4 py-2">
            7-Day Delivery Guarantee
          </div>
        </motion.div>
      </div>
    </section>
  );
}
