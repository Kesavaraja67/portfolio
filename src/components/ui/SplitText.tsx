"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  return (
    <h1 ref={ref} className={`${className} flex flex-wrap overflow-hidden`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const index = wordIndex * 10 + charIndex; // simple unique index
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  hidden: { y: "110%", rotate: 5, opacity: 0 },
                  visible: { y: "0%", rotate: 0, opacity: 1 },
                }}
                initial="hidden"
                animate={controls}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + index * 0.03,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
