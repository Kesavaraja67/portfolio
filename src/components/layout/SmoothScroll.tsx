"use client";

import { useEffect, ReactNode, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger, gsap } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: isTouch,
    });

    const handleLenisScroll = (lenisInstance: Lenis) => {
      ScrollTrigger.update();
      const nextProgress = Math.max(0, Math.min(1, lenisInstance.progress || 0));
      setScrollProgress(nextProgress);
    };

    lenis.on("scroll", handleLenisScroll);

    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    handleLenisScroll(lenis);

    return () => {
      lenis.off("scroll", handleLenisScroll);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <>
      {scrollProgress > 0 && (
        <div className="pointer-events-none fixed top-0 left-0 z-[9998] h-[2px] w-full">
          <div
            className="h-full bg-[var(--cyan)]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
      {children}
    </>
  );
}
