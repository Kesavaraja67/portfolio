"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@/lib/gsap";
import { SITE_DATA } from "@/lib/data";

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let previewX = 0;
    let previewY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = gsap.ticker.add(() => {
      if (!previewRef.current) return;
      // Lerp for smooth floating image lag
      previewX += (mouseX - previewX) * 0.12;
      previewY += (mouseY - previewY) * 0.12;

      gsap.set(previewRef.current, {
        x: previewX,
        y: previewY,
        xPercent: -50,
        yPercent: -50,
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  useGSAP(() => {
    const dividers = gsap.utils.toArray<HTMLElement>(".work-divider");
    dividers.forEach((div) => {
      gsap.fromTo(div, 
        { width: "0%" },
        { 
          width: "100%",
          ease: "expo.out",
          scrollTrigger: {
            trigger: div,
            start: "top 95%",
            end: "top 40%",
            scrub: 0.5,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="relative w-full py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-20">
      
      <div className="mb-24 flex items-center gap-8">
        <h2 className="font-clash text-5xl md:text-7xl uppercase font-semibold text-white">Selected Works</h2>
        <div className="h-[1px] flex-1 bg-white/20 mt-4 md:mt-8 hidden md:block"></div>
      </div>

      <div className="flex flex-col relative" onMouseLeave={() => setActiveProject(null)}>
        {/* Top border of the list */}
        <div className="work-divider w-full h-[1px] bg-white/20"></div>

        {SITE_DATA.projects.map((project, index) => (
          <div key={project.id} className="relative">
            <Link 
              href={`/work/${project.id}`}
              className="group relative flex flex-col xl:flex-row items-start xl:items-center justify-between py-10 md:py-16 hover:bg-white/[0.02] transition-colors duration-500 cursor-none px-4 md:px-8 -mx-4 md:-mx-8 z-10"
              onMouseEnter={() => setActiveProject(index)}
            >
              
              <div className="flex items-center gap-6 md:gap-12 w-full xl:w-auto">
                <span className="font-clash text-4xl md:text-[80px] leading-none font-medium text-[var(--cyan)] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  {project.number}
                </span>
                <h3 className="font-clash text-3xl md:text-[64px] leading-none font-semibold uppercase tracking-tight text-white group-hover:text-black group-hover:bg-white group-hover:px-4 md:group-hover:px-6 py-2 group-hover:-ml-4 md:group-hover:-ml-6 rounded-lg transition-all duration-300">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 md:gap-8 mt-6 xl:mt-0 font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 group-hover:text-[var(--cyan)] transition-colors ml-14 md:ml-24 xl:ml-0">
                <span>{project.category}</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/30 group-hover:bg-[var(--cyan)]"></span>
                <span>{project.year}</span>
              </div>
            </Link>

            {/* Mobile Inline Preview */}
            <div className="md:hidden w-full aspect-video relative my-4 rounded-xl overflow-hidden border border-white/10 opacity-70 filter grayscale mb-8">
              {/* Optional Color Tint */}
              <div className="absolute inset-0 z-10 bg-[var(--cyan)] mix-blend-color opacity-20 pointer-events-none"></div>
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover" 
                sizes="100vw" 
              />
            </div>

            {/* Bottom border per item */}
            <div className="work-divider absolute bottom-0 right-0 w-full h-[1px] bg-white/10"></div>
          </div>
        ))}

        {/* Floating Preview Image */}
        <AnimatePresence>
           <motion.div
            ref={previewRef}
            className="fixed top-0 left-0 w-[450px] aspect-[4/3] pointer-events-none z-[-1] hidden md:block overflow-hidden rounded-xl border border-white/10 shadow-2xl origin-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: activeProject !== null ? 1 : 0, 
              scale: activeProject !== null ? 1 : 0.8,
              rotate: activeProject !== null ? ((activeProject % 2 === 0) ? -3 : 3) : 0 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ 
              visibility: activeProject !== null ? "visible" : "hidden"
            }}
          >
            <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mt-[50px]"></div>
            {SITE_DATA.projects.map((p, i) => (
              <Image
                key={p.id}
                src={p.image}
                alt={p.title}
                fill
                className={`object-cover transition-opacity duration-300 ${activeProject === i ? "opacity-100 grayscale-0" : "opacity-0 grayscale"} filter`}
                sizes="450px"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
