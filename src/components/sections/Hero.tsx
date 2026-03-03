"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import ScrambleText from "@/components/ui/ScrambleText";
import Aurora from "@/components/ui/Aurora";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_DATA } from "@/lib/data";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden">
      <Aurora />

      {/* TOP LEFT: availability badge */}
      {SITE_DATA.available && (
        <div className="absolute top-[12%] left-[6%] md:left-[10%] flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest opacity-80 text-white/90">Available for work</span>
        </div>
      )}

      {/* CENTER-LEFT: Name and Role */}
      <div className="absolute top-[45%] md:top-[50%] left-[6%] md:left-[10%] -translate-y-1/2 z-10 w-full md:w-auto">
        <SplitText 
          text={SITE_DATA.name} 
          className="font-clash text-[13vw] xs:text-[15vw] md:text-[140px] leading-[0.85] font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70"
          delay={2.6} 
        />
        
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
          <ScrambleText 
            text={SITE_DATA.role} 
            className="font-mono text-sm md:text-base text-[var(--cyan)] uppercase tracking-widest md:max-w-[300px]"
            delay={3.6}
          />
          
          <MagneticButton className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500 mt-4 md:mt-0" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="font-medium text-sm tracking-wide uppercase">View Work</span>
            <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </MagneticButton>
        </div>
      </div>

      {/* BOTTOM LEFT: scroll indicator */}
      <div className="absolute bottom-[8%] left-[6%] md:left-[10%] flex gap-4 items-center">
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 rotate-[-90deg] origin-left translate-y-2">
          Scroll
        </span>
        <div className="w-[1px] h-[50px] bg-white/20 overflow-hidden relative translate-x-3">
          <motion.div 
            className="w-full h-1/2 bg-[var(--cyan)] absolute top-0"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>



    </section>
  );
}
