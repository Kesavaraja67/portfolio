"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import BlurIn from "@/components/ui/BlurIn";
import { SITE_DATA } from "@/lib/data";

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!scrollWrapperRef.current || !containerRef.current) return;
      
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${scrollWrapperRef.current?.scrollWidth}`,
        }
      });

      // Horizontal translation
      tl.to(steps, {
        xPercent: -100 * (steps.length - 1),
        ease: "none",
      }, 0);

      // SVG Connector draw
      if (svgRef.current) {
        const length = svgRef.current.getTotalLength();
        gsap.set(svgRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        tl.to(svgRef.current, {
          strokeDashoffset: 0,
          ease: "none"
        }, 0);
      }
    });

  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="relative w-full bg-[var(--bg)] z-10 overflow-hidden lg:h-screen flex flex-col justify-center py-20 lg:py-0 border-t border-white/5">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full mb-16 lg:absolute lg:top-24 lg:left-0 lg:right-0 z-20">
        <BlurIn>
          <div className="flex items-center gap-8">
            <h2 className="font-clash text-5xl md:text-7xl uppercase font-semibold text-white">How I Work</h2>
            <div className="h-[1px] flex-1 bg-white/20 hidden md:block mt-6"></div>
          </div>
        </BlurIn>
      </div>

      <div className="lg:w-[400vw] w-full flex flex-col lg:flex-row relative mt-10 lg:mt-0" ref={scrollWrapperRef}>
        
        {/* Animated Connector Line - Only visible on Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-[10vw] right-[10vw] h-1 -translate-y-1/2 pointer-events-none z-0">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 10">
            <path 
              ref={svgRef} 
              id="connector-path" 
              d="M0,5 L1000,5" 
              stroke="var(--cyan)" 
              strokeWidth="2" 
              strokeDasharray="5,15"
              strokeLinecap="round"
              fill="none" 
              vectorEffect="non-scaling-stroke"
              opacity="0.3"
            />
          </svg>
        </div>

        {SITE_DATA.process.map((step, idx) => (
          <div 
            key={step.id} 
            className="process-step w-full lg:w-[100vw] flex-shrink-0 flex items-center justify-center px-6 lg:px-[10vw] relative z-10 py-16 lg:py-0"
          >
            <div className="relative w-full max-w-[700px]">
              {/* Background giant number */}
              <div className="absolute top-[-30px] md:top-[-60px] lg:top-[-100px] left-[-10px] md:left-[-20px] lg:left-[-50px] text-[150px] md:text-[200px] lg:text-[280px] font-clash font-bold text-[var(--cyan)] leading-none opacity-10 pointer-events-none select-none z-0 transition-transform hover:scale-105 duration-1000">
                {step.id}
              </div>
              
              {/* Actual content */}
              <div className="relative z-10 bg-[var(--bg)]/40 p-10 md:p-14 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full border border-[var(--cyan)] flex items-center justify-center font-mono text-[var(--cyan)] bg-[var(--cyan)]/5 text-2xl group-hover:bg-[var(--cyan)]/20 transition-colors">
                    {step.id}
                  </div>
                  <h3 className="font-clash text-4xl md:text-[56px] uppercase font-semibold text-white tracking-wide">
                    {step.title}
                  </h3>
                </div>
                <p className="font-cabinet text-xl md:text-2xl text-white/70 leading-relaxed font-light ml-0 md:ml-22">
                  {step.description}
                </p>
              </div>
            </div>
            
            {/* Mobile connector line */}
            {idx < SITE_DATA.process.length - 1 && (
              <div className="absolute bottom-[-20px] left-[70px] md:left-[90px] w-[2px] h-20 bg-gradient-to-b from-[var(--cyan)]/40 to-transparent lg:hidden block pointer-events-none border-l border-dashed border-[var(--cyan)]/30"></div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
