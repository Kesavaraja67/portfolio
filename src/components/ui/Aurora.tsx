"use client";

import { motion } from "framer-motion";

export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] opacity-60 ${className}`}>
      <motion.div
        animate={{
          x: ["0%", "15%", "0%", "-15%", "0%"],
          y: ["0%", "5%", "-5%", "5%", "0%"],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-30%] left-[-10%] w-[60%] h-[120%] rounded-[100%] blur-[120px] bg-[var(--cyan)] mix-blend-screen opacity-20"
      />
      <motion.div
        animate={{
          x: ["0%", "-20%", "0%", "20%", "0%"],
          y: ["0%", "-15%", "15%", "-15%", "0%"],
          scale: [1, 0.9, 1.1, 1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[100%] rounded-[100%] blur-[140px] bg-[var(--violet)] mix-blend-screen opacity-15"
      />
    </div>
  );
}
