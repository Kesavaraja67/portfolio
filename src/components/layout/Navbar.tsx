"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorStore } from "@/lib/store";
import { SITE_DATA } from "@/lib/data";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setHoverState } = useCursorStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setIsScrolled(latest > 50);
  });

  return (
    <AnimatePresence>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[9000] px-6 py-4 transition-colors duration-300 md:px-12 md:py-6 ${
          isScrolled ? "bg-[var(--bg)]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-sm font-mono tracking-wider text-[var(--text)] mix-blend-difference uppercase cursor-none"
            onMouseEnter={() => setHoverState(true, 'link')}
            onMouseLeave={() => setHoverState(false)}
          >
            {SITE_DATA.name.split(" ")[0]}
          </a>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm font-medium">
            <a
              href="#work"
              className="hidden md:block transition-colors hover:text-[var(--cyan)] cursor-none"
              onMouseEnter={() => setHoverState(true, 'link')}
              onMouseLeave={() => setHoverState(false)}
            >
              Work
            </a>
            <a
              href="#about"
              className="hidden md:block transition-colors hover:text-[var(--cyan)] cursor-none"
              onMouseEnter={() => setHoverState(true, 'link')}
              onMouseLeave={() => setHoverState(false)}
            >
              About
            </a>
            
            <MagneticButton 
              className="bg-[var(--text)] text-[var(--bg)] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--cyan)] transition-colors duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Hire Me
            </MagneticButton>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
