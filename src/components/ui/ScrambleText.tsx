"use client";

import { useState, useEffect } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const scramble = () => {
      setIsScrambling(true);
      let iteration = 0;
      let interval: NodeJS.Timeout;

      timeout = setTimeout(() => {
        clearInterval(interval);
        interval = setInterval(() => {
          setDisplayText(text.split("").map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join(""));

          if (iteration >= text.length) {
            clearInterval(interval);
            setIsScrambling(false);
          }
          
          iteration += 1 / 3; 
        }, 30);
      }, delay * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    };

    scramble();
  }, [text, delay]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => {
        if (isScrambling) return;
        setIsScrambling(true);
        let iteration = 0;
        const interval = setInterval(() => {
          setDisplayText(text.split("").map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join(""));

          if (iteration >= text.length) {
            clearInterval(interval);
            setIsScrambling(false);
          }
          iteration += 1 / 3;
        }, 30);
      }}
    >
      {displayText || " ".repeat(text.length)}
    </span>
  );
}
