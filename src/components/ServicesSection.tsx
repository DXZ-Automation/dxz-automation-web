"use client";

import { motion } from "framer-motion";
import { RedFrameCorners } from "@/components/ui/red-frame-corners";

const services = [
  {
    name: "Missed Call Text-Back",
    recovery: "$3K–$8K / month",
    time: "4–6 hrs",
    description:
      "Every missed call triggers an automatic SMS within 60 seconds. Your lead stays warm until you can call back — instead of calling your competitor.",
  },
  {
    name: "Speed-to-Lead",
    recovery: "10–20× conversion lift",
    time: "6–8 hrs",
    description:
      "Instant automated response the moment a lead comes in via any channel. Before they open the next Google result. First-to-respond wins.",
  },
  {
    name: "No-Show Recovery",
    recovery: "60–80% reduction",
    time: "3–4 hrs",
    description:
      "Multi-touch SMS sequence before every appointment — confirm, remind, recover. Turn silent cancellations into rescheduled revenue.",
  },
  {
    name: "Customized Automation",
    recovery: "custom scope",
    time: "Varies",
    description:
      "Not every operational bottleneck fits one of the three core systems above. When the fix is specific to how your business runs, we design and build it from the ground up — scoped to the exact workflow costing you time or money.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative px-6 py-20 md:py-32 lg:px-[72px]">
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
            <h2 className="font-mono text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
              <span className="dxz-text-glow block">Three systems.</span>
              <span className="dxz-text-glow mt-3 block italic">Together or alone.</span>
            </h2>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase">Full deployment</p>
            <p className="dxz-text-glow font-mono text-4xl font-black text-white mt-1">13–18 hrs</p>
            <p className="font-mono text-xs text-zinc-700 tracking-widest uppercase mt-1">all three systems, built</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-6">
        {services.map(({ name, recovery, time, description }, i) => (
          <motion.div
            key={name}
            className="group relative bg-[#030303] hover:bg-red-950/[0.03] shadow-[inset_0_0_0_1px_#dc2626] hover:shadow-[inset_0_0_0_2px_#dc2626] transition-[background-color,box-shadow] duration-300 p-10 lg:p-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <RedFrameCorners />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
              {/* Content */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="dxz-text-glow font-mono text-2xl lg:text-3xl font-bold text-white">{name}</h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-500 border border-red-600/30 px-2 py-0.5">
                    {recovery}
                  </span>
                </div>
                <p className="font-mono text-sm text-zinc-500 leading-relaxed max-w-xl">{description}</p>
              </div>

              {/* Time to build */}
              <div className="text-right lg:text-right">
                <p className="dxz-text-glow font-mono text-2xl lg:text-3xl font-bold text-white">{time}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-red-500 mt-1">Build time</p>
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
        <div className="group relative bg-[#030303] hover:bg-red-950/[0.03] shadow-[inset_0_0_0_1px_#dc2626] hover:shadow-[inset_0_0_0_2px_#dc2626] transition-[background-color,box-shadow] duration-300 p-10 lg:p-14">
          <RedFrameCorners />

          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-2">Ongoing Partnership</p>
          <h3 className="dxz-text-glow font-mono text-2xl lg:text-3xl font-bold text-white">AI Growth Partner</h3>
          <p className="font-mono text-sm text-zinc-500 mt-2 max-w-lg">
            Continuous automation builds, optimization, and expansion. We run your revenue infrastructure so you don&apos;t have to think about it.
          </p>
        </div>
      </motion.div>

      <motion.p
        className="mx-auto max-w-[1440px] mt-6 font-mono text-[10px] tracking-widest uppercase text-red-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Pricing for every system — packaged, custom, or ongoing — is discussed on your free discovery call.
      </motion.p>
    </section>
  );
}
