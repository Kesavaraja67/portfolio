"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // base velocity
  reverseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function Marquee({ children, speed = 1, reverseOnHover = true, className = "", itemClassName = "pr-12" }: MarqueeProps) {
  // Use CSS animation for better performance
  const marqueeSpeed = Math.max(20, 40 - speed * 5); // Convert to CSS duration

  return (
    <div
      className={`overflow-hidden m-0 flex whitespace-nowrap flex-nowrap ${className}`}
      data-reverse-on-hover={reverseOnHover ? "true" : "false"}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        [data-reverse-on-hover="true"]:hover .marquee-track {
          animation-direction: reverse;
        }
      `}</style>
      <div
        className="marquee-track flex whitespace-nowrap shrink-0 flex-nowrap"
        style={{
          animation: `marquee ${marqueeSpeed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* Render 2 copies for seamless loop */}
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
      </div>
    </div>
  );
}
