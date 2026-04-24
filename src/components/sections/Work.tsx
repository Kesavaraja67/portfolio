"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP, gsap } from "@/lib/gsap";
import { SITE_DATA } from "@/lib/data";

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(() => {
    const dividers = gsap.utils.toArray<HTMLElement>(".work-divider");
    dividers.forEach((div) => {
      gsap.fromTo(div,
        { width: "0%" },
        {
          width: "100%",
          ease: "expo.out",
          scrollTrigger: { trigger: div, start: "top 95%", scrub: 0.5 }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="relative w-full py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-20">
      <div className="mb-24 flex items-center gap-8">
        <h2 className="font-clash text-5xl md:text-7xl uppercase font-semibold text-white">Selected Works</h2>
        <div className="h-[1px] flex-1 bg-white/20 mt-4 md:mt-8 hidden md:block" />
      </div>

      <div className="flex flex-col">
        <div className="work-divider w-full h-[1px] bg-white/20" />
        {SITE_DATA.projects.map((project, index) => (
          <div key={project.id} className="relative">
            <Link
              href={`/work/${project.id}`}
              className="group relative flex flex-col xl:flex-row items-start xl:items-center justify-between py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-300 cursor-none px-4 md:px-8 -mx-4 md:-mx-8"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-clash text-4xl md:text-[80px] leading-none font-medium text-[var(--cyan)] opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                    {project.number}
                  </span>
                  <h3 className="font-clash text-3xl md:text-[60px] leading-none font-semibold uppercase tracking-tight text-white">
                    {project.title}
                  </h3>
                </div>
                <AnimatePresence>
                  {hovered === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-xs text-[var(--cyan)]/70 ml-14 md:ml-24 mt-1"
                    >
                      → {project.outcome}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-end gap-3 mt-6 xl:mt-0 ml-14 md:ml-24 xl:ml-0">
                <div className="flex items-center gap-4 font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 group-hover:text-[var(--cyan)] transition-colors">
                  <span>{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{project.year}</span>
                </div>
                <div className="hidden xl:flex flex-wrap gap-2 justify-end">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full border border-white/10 font-mono text-[9px] uppercase tracking-wider text-white/30 group-hover:border-[var(--cyan)]/30 group-hover:text-[var(--cyan)]/60 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            <div className="work-divider absolute bottom-0 right-0 w-full h-[1px] bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
