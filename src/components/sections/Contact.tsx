"use client";

import { useState, useEffect, useRef } from "react";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_DATA } from "@/lib/data";
import { useGSAP, gsap } from "@/lib/gsap";

export default function Contact() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(0);

  useEffect(() => {
    // Initial static time
    setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true }));
    
    // Interval for live clock
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        onEnter: () => setScrambleTrigger(prev => prev + 1)
      }
    });
  }, { scope: containerRef });

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-[100dvh] bg-black z-30 flex flex-col justify-between py-12 px-6 md:px-12 md:py-20">
      
      {/* TOP */}
      <div className="w-full max-w-[1600px] mx-auto pt-10">
        <span className="font-mono text-sm uppercase tracking-widest text-[#555] block">
          {"// LET'S TALK"}
        </span>
      </div>

      {/* CENTER */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col items-start justify-center flex-1 my-24 md:my-0">
        <h2 className="font-clash text-[14vw] md:text-[160px] leading-[0.8] uppercase font-bold text-white mb-10 w-full overflow-hidden">
          <ScrambleText key={`title-${scrambleTrigger}`} text="LET'S BUILD" />
        </h2>
        
        <div 
          className="group relative cursor-pointer inline-block"
          onClick={handleCopy}
        >
          <div className="font-cabinet text-3xl md:text-[80px] leading-[1] font-medium text-[var(--cyan)] hover:text-white transition-colors duration-500">
            <ScrambleText key={`email-${scrambleTrigger}`} text={SITE_DATA.email} delay={0.5} />
          </div>
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded shadow-xl transition-all duration-300 pointer-events-none ${copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            COPIED!
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-10">
        
        {/* Socials */}
        <div className="flex gap-4 md:gap-6">
          <a href={`https://${SITE_DATA.github}`} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-transparent transition-colors font-clash text-xl bg-white/5 backdrop-blur-sm cursor-none">
              GH
            </MagneticButton>
          </a>
          <a href={`https://${SITE_DATA.linkedin}`} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0a66c2] hover:border-transparent transition-colors font-clash text-xl bg-white/5 backdrop-blur-sm cursor-none">
              IN
            </MagneticButton>
          </a>
          <a href={SITE_DATA.twitter} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1d9bf0] hover:border-transparent transition-colors font-clash text-xl bg-white/5 backdrop-blur-sm cursor-none">
              X
            </MagneticButton>
          </a>
        </div>

        {/* Info & Clock */}
        <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
          <div className="flex flex-col items-start md:items-end gap-2 pb-6 border-b border-white/10 w-full md:w-auto">
            <span className="font-mono text-[10px] md:text-xs uppercase text-white/40 tracking-widest">Local Time ({SITE_DATA.location})</span>
            <span className="font-mono text-2xl md:text-3xl text-white">{time || "00:00:00 AM"} <span className="text-[var(--cyan)]">IST</span></span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#555] w-full md:w-auto text-left md:text-right mt-2">
            Made with obsession by {SITE_DATA.name.split(" ")[0]} © {new Date().getFullYear()}
          </div>
        </div>

      </div>

    </section>
  );
}
