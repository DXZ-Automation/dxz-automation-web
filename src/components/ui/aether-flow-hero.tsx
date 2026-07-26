"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { DxzLogoMark } from "@/components/ui/dxz-logo-mark";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.05,
      duration: 0.35,
      ease: "easeInOut" as const,
    },
  }),
};

export function AetherFlowHero() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center p-6">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6 backdrop-blur-sm"
        >
          <Zap className="h-4 w-4 text-red-500" />
          <span className="font-mono text-sm font-medium text-gray-200">
            AI Revenue Recovery Systems
          </span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <DxzLogoMark />
        </motion.div>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-10">
          <ShinyButton
            variant="red"
            href="#process"
            className="font-mono text-xs tracking-widest uppercase"
          >
            See how it works
          </ShinyButton>
        </motion.div>
      </div>
    </div>
  );
}
