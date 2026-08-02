"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { RedFrameCorners } from "@/components/ui/red-frame-corners";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20 md:py-32 lg:px-[72px]">
      <motion.div
        className="mx-auto max-w-4xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="group relative overflow-hidden bg-[#030303] p-8 sm:p-12 lg:p-24 hover:bg-red-950/[0.03] shadow-[inset_0_0_0_1px_#dc2626] hover:shadow-[inset_0_0_0_2px_#dc2626] transition-[background-color,box-shadow] duration-300">
          <RedFrameCorners />

          {/* Noise overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ backgroundImage: NOISE, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }}
          />

          <p className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm font-mono text-sm font-medium text-gray-200 mb-8">
            Start Here
          </p>

          <h2 className="mb-6 font-mono text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.12]">
            <span className="block">Find out exactly</span>
            <span className="mt-3 block italic">how much you&apos;re losing.</span>
          </h2>

          <p className="font-mono text-base text-zinc-500 max-w-md mx-auto mb-12 leading-relaxed">
            15 minutes. No pitch. We&apos;ll tell you which of your revenue leaks are worth fixing first — and what it would take to fix them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton
              variant="red"
              href="https://cal.com/dxz-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase"
            >
              Book a free discovery call
            </GlowButton>
          </div>

          <p className="font-mono text-[10px] tracking-widest uppercase text-red-500 mt-8">
            — Daniel X Zak / DXZ Automation · AI Revenue Recovery Systems
          </p>
        </div>
      </motion.div>
    </section>
  );
}
