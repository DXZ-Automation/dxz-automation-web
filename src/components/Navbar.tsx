"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { DxzLogo } from "@/components/ui/dxz-logo-mark";

const links = ["Services", "Process", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? window.innerHeight;

      setScrolled(currentY > 40);

      if (currentY > heroHeight && currentY > lastScrollY.current) {
        setHidden(true);
      } else if (currentY < heroHeight || currentY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#030303]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-[72px]">
        <a href="#" className="group">
          <DxzLogo
            iconClassName="w-9 shrink-0 sm:w-[53px] md:w-[53px] lg:w-[53px]"
            dxzClassName="text-[21px] sm:text-[30px] md:text-[30px] lg:text-[30px]"
            dxzGapClassName="-mb-[6.5px] sm:-mb-[7px] md:-mb-[7px] lg:-mb-[7px]"
            underlineClassName="h-[2px] sm:h-[3px] md:h-[3px] lg:h-[3px] my-0.5 sm:my-0.5 md:my-0.5 lg:my-0.5"
            automationClassName="text-[9px] sm:text-[13px] md:text-[13px] lg:text-[13px]"
            automationGapClassName="-mt-[3px] sm:-mt-[4px] md:-mt-[4px] lg:-mt-[4px]"
          />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs tracking-widest uppercase text-white hover:text-red-500 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        <GlowButton
          variant="red"
          href="https://cal.com/dxz-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="!px-5 !py-2 font-mono !text-[10px] font-medium tracking-[0.14em] uppercase sm:!px-6 sm:!py-2.5 sm:!text-xs sm:tracking-widest"
        >
          <span className="sm:hidden">Book Call</span>
          <span className="hidden sm:inline">Book a Free Discovery Call</span>
        </GlowButton>
      </div>
    </motion.header>
  );
}
