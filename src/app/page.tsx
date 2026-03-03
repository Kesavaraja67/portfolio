import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const MarqueeBand = dynamic(() => import("@/components/sections/MarqueeBand"));
const About = dynamic(() => import("@/components/sections/About"));
const Work = dynamic(() => import("@/components/sections/Work"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MarqueeBand />
      <About />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </div>
  );
}
