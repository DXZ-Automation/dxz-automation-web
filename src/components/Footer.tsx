"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="bg-[#030303] border-t border-white/[0.04] px-6 lg:px-[72px] py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-6 px-0 lg:px-0">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">DXZ</span>
        </div>

        <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-800">
          AI Revenue Recovery Systems · {new Date().getFullYear()}
        </p>

        <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-800">
          Built by Zak Saumier
        </p>
      </div>
    </motion.footer>
  );
}
