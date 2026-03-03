"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function BlurIn({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: ReactNode, 
  className?: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ filter: "blur(20px)", opacity: 0, y: 10 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
