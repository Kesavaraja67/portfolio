"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Word({ word, index, totalWords, isInView }: { word: string; index: number; totalWords: number; isInView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0.15, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 8 }}
      transition={{
        duration: 0.45,
        delay: index / Math.max(totalWords, 1) * 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mr-[0.25em] mt-[0.1em]"
    >
      {word}
    </motion.span>
  );
}

export default function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word key={i} word={word} index={i} totalWords={words.length} isInView={isInView} />
      ))}
    </div>
  );
}
