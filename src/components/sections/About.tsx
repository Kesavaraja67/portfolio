"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import TiltCard from "@/components/ui/TiltCard";
import { SITE_DATA } from "@/lib/data";

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stats = gsap.utils.toArray<HTMLElement>(".stat-number");
    
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target") || "0", 10);
      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          once: true,
        },
        innerHTML: target,
        duration: 2.5,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        onUpdate: function() {
          stat.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
        }
      });
    });
  }, { scope: statsRef });

  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-12 md:py-40 max-w-[1600px] mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">
        
        {/* LEFT COL */}
        <div className="flex flex-col pt-0 md:pt-10">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6 lg:mb-10 block">
            {"// WHO I AM"}
          </span>
          
          <TextReveal 
            text="I build things people screenshot." 
            className="font-clash text-[10vw] md:text-[64px] leading-[1.05] font-medium mb-8 text-white max-w-[800px]"
          />
          
          <div className="text-white/60 text-base md:text-xl font-cabinet font-normal leading-relaxed max-w-2xl">
            {SITE_DATA.about}
          </div>
          
          {/* STATS */}
          <div ref={statsRef} className="flex flex-wrap gap-10 md:gap-16 mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5">
            <div>
              <div className="text-5xl md:text-7xl font-clash font-semibold text-white mb-1 md:mb-3">
                <span className="stat-number inline-block min-w-[1ch]" data-target={parseInt(SITE_DATA.yearsExp)}>0</span>+
              </div>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">Years Exp</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-clash font-semibold text-white mb-1 md:mb-3">
                <span className="stat-number inline-block min-w-[2ch]" data-target={parseInt(SITE_DATA.projectsCount)}>0</span>+
              </div>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">Projects</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-clash font-semibold text-[var(--cyan)] mb-1 md:mb-3">
                <span className="stat-number inline-block min-w-[1ch]" data-target={parseInt(SITE_DATA.openSourceCount)}>0</span>+
              </div>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[var(--cyan)]/60">Open Source</div>
            </div>
          </div>
        </div>

        {/* RIGHT COL - breaks grid on purpose */}
        <div className="relative w-full h-[60vh] md:h-[800px] mt-0 lg:-mt-16 [perspective:1200px]">
          <TiltCard className="w-full h-full group relative overflow-hidden">
            <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mt-[50px]"></div>
            
            {/* Cinematic Color Grading */}
            <div className="absolute inset-0 z-10 bg-[var(--cyan)] mix-blend-color opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>

            <Image 
              src="/profile.jpeg"
              alt="Kesavaraja Portrait"
              fill
              className="object-cover object-[center_20%] grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 filter group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </TiltCard>
        </div>

      </div>
    </section>
  );
}
