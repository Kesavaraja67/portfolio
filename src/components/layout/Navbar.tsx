"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorStore } from "@/lib/store";
import { SITE_DATA } from "@/lib/data";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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

  useEffect(() => {
    const sectionIds: string[] = NAV_ITEMS.map(({ id }) => id);
    const visibleRatios = new Map<string, number>();

    let fallbackHeroSection: HTMLElement | null = null;
    let addedHeroId = false;

    if (!document.getElementById("hero")) {
      fallbackHeroSection = document.querySelector("main section");

      if (fallbackHeroSection && !fallbackHeroSection.id) {
        fallbackHeroSection.id = "hero";
        addedHeroId = true;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).id;

          if (!sectionIds.includes(sectionId)) {
            return;
          }

          if (entry.intersectionRatio >= 0.3) {
            visibleRatios.set(sectionId, entry.intersectionRatio);
          } else {
            visibleRatios.delete(sectionId);
          }
        });

        let nextActiveSection: string | null = null;
        let highestRatio = 0;

        sectionIds.forEach((sectionId) => {
          const ratio = visibleRatios.get(sectionId) ?? 0;

          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextActiveSection = sectionId;
          }
        });

        setActiveSection(nextActiveSection);
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();

      if (addedHeroId && fallbackHeroSection) {
        fallbackHeroSection.removeAttribute("id");
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[9999] px-6 py-4 transition-colors duration-300 md:px-12 md:py-6 ${
          isScrolled ? "bg-[var(--bg)]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-sm font-mono tracking-wider text-[var(--text)] mix-blend-difference uppercase cursor-none"
            onMouseEnter={() => setHoverState(true, "link")}
            onMouseLeave={() => setHoverState(false)}
          >
            {SITE_DATA.name.split(" ")[0]}
          </a>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`hidden md:block transition-colors hover:text-[var(--cyan)] cursor-none ${
                  activeSection === item.id
                    ? "text-[var(--cyan)] underline decoration-[var(--cyan)] underline-offset-8"
                    : ""
                }`}
                onMouseEnter={() => setHoverState(true, "link")}
                onMouseLeave={() => setHoverState(false)}
              >
                {item.label}
              </a>
            ))}

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
