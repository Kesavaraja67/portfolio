"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePreloaderStore } from "@/lib/store";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const { setPreloading } = usePreloaderStore();

  useGSAP(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setPreloading(false);
        document.body.style.overflow = "visible";
        // Hide preloader from DOM after transition
        gsap.set(containerRef.current, { display: "none" });
      }
    });

    // 1. Counter tween
    tl.to(counterRef.current, {
      duration: 1.4,
      ease: "power3.inOut",
      onUpdate: function() {
        const val = Math.round(this.progress() * 100);
        if (counterRef.current) {
          counterRef.current.innerText = val.toString().padStart(3, "0");
        }
      }
    }, 0);

    // 2. Counter fades out at 100
    tl.to(counterRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    }, 1.4);

    // 3. Accent color floods screen (scale from center)
    tl.to(accentRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "expo.inOut",
      transformOrigin: "center center"
    }, 1.5);

    // 4. Curtain wipes UP revealing the site
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "expo.inOut"
    }, 1.9);

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      <div 
        ref={accentRef} 
        className="absolute inset-0 bg-[var(--cyan)] scale-0 rounded-full"
        style={{ width: "150vw", height: "150vw", marginLeft: "-25vw", marginTop: "calc(-75vw + 50vh)" }} 
      />
      
      <div 
        ref={counterRef} 
        className="relative z-10 font-mono text-[10vw] md:text-[8vw] font-bold tracking-tighter text-white mix-blend-difference"
      >
        000
      </div>
    </div>
  );
}
