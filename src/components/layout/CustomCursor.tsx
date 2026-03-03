"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursorStore } from "@/lib/store";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { isHovering, hoverType } = useCursorStore();

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move dot instantly
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Lerp loop for ring
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15; // lerp lag
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    if (isHovering) {
      if (hoverType === 'link' || hoverType === 'default') {
        gsap.to(ring, { scale: 2, borderColor: "var(--cyan)", backgroundColor: "rgba(0,255,204,0.1)", duration: 0.3 });
        gsap.to(cursor, { scale: 0, duration: 0.3 });
      } else if (hoverType === 'image') {
        gsap.to(ring, { scale: 3, borderColor: "transparent", backgroundColor: "var(--cyan)", duration: 0.3 });
        gsap.to(cursor, { scale: 0, duration: 0.3 });
      } else if (hoverType === 'text') {
        gsap.to(ring, { scale: 0, duration: 0.3 });
        gsap.to(cursor, { height: 24, width: 2, borderRadius: 0, backgroundColor: "var(--cyan)", duration: 0.2 });
      }
    } else {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.5)", backgroundColor: "transparent", duration: 0.3 });
      gsap.to(cursor, { scale: 1, height: 8, width: 8, borderRadius: "50%", backgroundColor: "var(--cyan)", duration: 0.3 });
    }
  }, [isHovering, hoverType]);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[10px] text-black font-bold"
      >
        {isHovering && hoverType === 'image' && "VIEW"}
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--cyan)] rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
