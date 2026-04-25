"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import BlurIn from "@/components/ui/BlurIn";
import Marquee from "@/components/ui/Marquee";
import { SITE_DATA } from "@/lib/data";
import { useCursorStore } from "@/lib/store";

export default function Skills() {
  const { setHoverState } = useCursorStore();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-10% 0px" });

  const allSkills = Object.values(SITE_DATA.skills).flat();

  return (
    <section id="skills" className="relative w-full pt-12 pb-24 md:pt-24 md:pb-32 z-10 overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <BlurIn>
          <div className="flex items-center gap-8 mb-16">
            <h2 className="font-clash text-5xl md:text-7xl uppercase font-semibold text-white">Capabilities</h2>
            <div className="h-[1px] flex-1 bg-white/20 hidden md:block mt-6"></div>
          </div>
        </BlurIn>

        <div ref={categoriesRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-20 mt-12">
          {Object.entries(SITE_DATA.skills).map(([category, skills], i) => (
            <div
              key={category}
              className={`flex flex-col gap-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                categoriesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <h3 className="font-mono text-sm uppercase tracking-widest text-[var(--cyan)] border-b border-white/20 pb-4 mb-2">
                {"// "}
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div 
                    key={skill}
                    className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 font-cabinet text-sm md:text-base text-white/80 hover:bg-[var(--cyan)] hover:text-black hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 cursor-none backdrop-blur-sm"
                    onMouseEnter={() => setHoverState(true, 'text')}
                    onMouseLeave={() => setHoverState(false)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Marquee (High speed) */}
      <div className="w-full mt-24 border-y border-white/5 py-4 bg-white/[0.02] backdrop-blur-md">
        <Marquee speed={3.5} reverseOnHover={false} itemClassName="pr-16 md:pr-24">
          <div className="flex items-center gap-16 md:gap-24">
            {allSkills.slice(0, 15).map((skill, idx) => (
              <div 
                key={idx} 
                className="font-clash text-4xl md:text-[80px] font-bold uppercase tracking-tighter text-white/20 hover:text-[var(--violet)] hover:scale-110 transition-all duration-500 cursor-none"
                onMouseEnter={() => setHoverState(true, 'text')}
                onMouseLeave={() => setHoverState(false)}
              >
                {skill}
              </div>
            ))}
          </div>
        </Marquee>
      </div>

    </section>
  );
}
