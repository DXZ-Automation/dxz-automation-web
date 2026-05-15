"use client";

import { motion } from "framer-motion";

const markets = [
  { vertical: "Trades & Home Services", pain: "Missed calls", dollar: "$8K/mo recovered", icon: "⚡" },
  { vertical: "Medical & Dental", pain: "No-shows", dollar: "60–80% reduction", icon: "+" },
  { vertical: "Law Firms", pain: "Lead response speed", dollar: "First-to-respond wins", icon: "§" },
  { vertical: "Real Estate", pain: "Speed-to-lead", dollar: "10–20× conversion lift", icon: "◈" },
  { vertical: "Restaurants & Catering", pain: "Reservation recovery", dollar: "Silent revenue recovered", icon: "◆" },
];

export function MarketsSection() {
  return (
    <section id="markets" className="relative bg-[#030303] px-6 py-20 md:py-32 lg:px-[72px]">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-red-500 mb-4">
            Who We Work With
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12]">
            <span className="block">If a missed call costs you money,</span>
            <span className="mt-3 block italic text-zinc-600">DXZ Automation is for you.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {markets.map(({ vertical, pain, dollar, icon }, i) => (
            <motion.div
              key={vertical}
              className="bg-[#030303] hover:bg-[#0a0a0a] p-10 group transition-colors duration-300 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-lg text-zinc-800 group-hover:text-red-600 transition-colors duration-300">
                  {icon}
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-red-500/60">
                  {pain}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">{vertical}</h3>
              <p className="font-sans text-sm text-zinc-600">{dollar}</p>
            </motion.div>
          ))}

          {/* CTA tile */}
          <motion.a
            href="https://cal.com/dxz-automation"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-500 p-10 flex flex-col justify-between cursor-pointer transition-colors duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: markets.length * 0.08 }}
            whileHover={{ scale: 1.01 }}
          >
            <span className="font-mono text-[9px] tracking-widest uppercase text-red-200/60">
              Not sure if you qualify?
            </span>
            <div>
              <p className="font-serif text-xl font-bold text-white leading-snug">
                What&apos;s a missed call worth to you?
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-red-200 mt-3 group-hover:translate-x-1 transition-transform">
                Book a free discovery call →
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
