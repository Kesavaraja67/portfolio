"use client";

import { useRef, ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // base velocity
  reverseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function Marquee({ children, speed = 1, reverseOnHover = true, className = "", itemClassName = "pr-12" }: MarqueeProps) {
  const baseVelocity = speed;
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(1);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    // Reverse direction smoothly
    if (reverseOnHover) {
      if (isHovered.current) {
        directionFactor.current -= 0.05;
        if (directionFactor.current < -1) directionFactor.current = -1;
      } else {
        directionFactor.current += 0.05;
        if (directionFactor.current > 1) directionFactor.current = 1;
      }
      moveBy = directionFactor.current * baseVelocity * (delta / 25);
    } else {
       moveBy = directionFactor.current * baseVelocity * (delta / 25);
    }
    
    baseX.set(baseX.get() - moveBy);
  });

  // Calculate position wrapping. 4 identical chunks = -50% to 0% wrap is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div 
      className={`overflow-hidden m-0 flex whitespace-nowrap flex-nowrap ${className}`}
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
    >
      <motion.div className="flex whitespace-nowrap shrink-0 flex-nowrap" style={{ x }}>
        {/* Render 4 copies to ensure safe wrapping over 50% translation */}
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
        <div className={`flex items-center shrink-0 ${itemClassName}`}>{children}</div>
      </motion.div>
    </div>
  );
}
