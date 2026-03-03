"use client";

import Marquee from "@/components/ui/Marquee";
import { SITE_DATA } from "@/lib/data";

export default function MarqueeBand() {
  const items = [
    SITE_DATA.name.toUpperCase(),
    "FULLSTACK",
    "CREATIVE",
    SITE_DATA.available ? "AVAILABLE" : "BUILDER",
  ];

  return (
    <section className="w-full bg-[var(--cyan)] py-4 border-y border-white/10 overflow-hidden transform -rotate-1 origin-center scale-105 my-24 z-20 relative shadow-[0_0_40px_rgba(0,255,204,0.15)]">
      <Marquee speed={2} reverseOnHover={true} itemClassName="pr-8">
        <div className="flex items-center gap-8 text-black font-clash font-semibold text-2xl uppercase tracking-wider">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="text-black/30 font-mono">✦</span>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
