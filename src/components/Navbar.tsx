"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";

const links = ["Services", "Process", "Markets", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-[72px]">
        <a href="#" className="group flex items-center">
          <Image
            src="/dxz-logo.png"
            alt="DXZ Automation"
            width={748}
            height={380}
            priority
            className="h-11 w-auto max-w-[180px] object-contain sm:h-16 sm:max-w-[300px] lg:max-w-[340px]"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        <ShinyButton
          variant="red"
          href="https://cal.com/dxz-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="!px-5 !py-2 font-mono !text-[10px] font-medium tracking-[0.14em] uppercase sm:!px-6 sm:!py-2.5 sm:!text-xs sm:tracking-widest"
        >
          <span className="sm:hidden">Book Call</span>
          <span className="hidden sm:inline">Book a Free Discovery Call</span>
        </ShinyButton>
      </div>
    </motion.header>
  );
}
