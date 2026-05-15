"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    name: "Missed Call Text-Back",
    recovery: "$3K–$8K / month",
    time: "4–6 hrs to build",
    description:
      "Every missed call triggers an automatic SMS within 60 seconds. Your lead stays warm until you can call back — instead of calling your competitor.",
    stack: ["Twilio", "Zapier", "Google Sheets"],
    price: "$1,999",
  },
  {
    number: "02",
    name: "Speed-to-Lead",
    recovery: "10–20× conversion lift",
    time: "6–8 hrs to build",
    description:
      "Instant automated response the moment a lead comes in via any channel. Before they open the next Google result. First-to-respond wins.",
    stack: ["Zapier", "Twilio", "Gmail", "Calendly"],
    price: "$1,999",
  },
  {
    number: "03",
    name: "No-Show Recovery",
    recovery: "60–80% reduction",
    time: "3–4 hrs to build",
    description:
      "Multi-touch SMS sequence before every appointment — confirm, remind, recover. Turn silent cancellations into rescheduled revenue.",
    stack: ["Zapier", "Twilio", "Google Calendar"],
    price: "$1,999",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#030303] px-6 py-20 md:py-32 lg:px-[72px]">
      {/* Horizontal rule */}
      <div className="mx-auto max-w-[1440px] mb-20">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-4">
              Revenue Recovery Systems
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
              <span className="block">Three systems.</span>
              <span className="mt-3 block italic">One install.</span>
            </h2>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase">Bundle pricing</p>
            <p className="font-serif text-4xl font-black text-white mt-1">$4,999</p>
            <p className="font-mono text-xs text-zinc-700 tracking-widest uppercase mt-1">all three systems</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-px">
        {services.map(({ number, name, recovery, time, description, stack, price }, i) => (
          <motion.div
            key={number}
            className="group relative border border-white/[0.04] bg-[#030303] hover:bg-[#0c0c0c] transition-all duration-500 p-10 lg:p-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Red left border on hover */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 items-start">
              {/* Number */}
              <span className="font-mono text-xs tracking-widest text-zinc-700">{number}</span>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">{name}</h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-500 border border-red-600/30 px-2 py-0.5">
                    {recovery}
                  </span>
                </div>
                <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-xl">{description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] tracking-widest uppercase text-zinc-700 border border-white/[0.05] px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price + time */}
              <div className="text-right lg:text-right">
                <p className="font-serif text-3xl font-black text-white">{price}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-700 mt-1">{time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ongoing retainer */}
      <motion.div
        className="mx-auto max-w-[1440px] mt-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="border border-red-600/20 bg-red-950/10 p-10 lg:p-14 flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-2">Ongoing Partnership</p>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">AI Growth Partner</h3>
            <p className="font-sans text-sm text-zinc-500 mt-2 max-w-lg">
              Continuous automation builds, optimization, and expansion. We run your revenue infrastructure so you don&apos;t have to think about it.
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-4xl font-black text-red-500">$9,999</p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-700 mt-1">/ month</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
