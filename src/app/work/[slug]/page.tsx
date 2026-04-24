import { SITE_DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = SITE_DATA.projects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen relative bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      
      {/* Navigation Back */}
      <div className="absolute top-10 left-6 md:top-20 md:left-12 z-50">
        <Link href="/">
          <MagneticButton className="px-6 py-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center gap-3 hover:bg-white hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wide">Back</span>
          </MagneticButton>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-end p-6 md:p-24 z-10 bg-gradient-to-b from-white/5 via-white/2 to-[var(--bg)]">
        
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-[var(--cyan)] mb-6">
            <span>{project.number}</span>
            <div className="w-10 h-[1px] bg-[var(--cyan)]"></div>
            <span>{project.category}</span>
          </div>
          <h1 className="font-clash text-5xl md:text-[100px] leading-[0.9] font-medium uppercase mb-6 drop-shadow-lg">
            {project.title}
          </h1>
          <p className="font-cabinet text-xl md:text-3xl font-light text-white/80 max-w-3xl">
            {project.outcome}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-24 py-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32">
          
          {/* Metadata */}
          <div className="flex flex-col gap-10">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">Year</h4>
              <p className="font-clash text-2xl font-medium">{project.year}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">Role</h4>
              <p className="font-clash text-2xl font-medium">Design & Development</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">Live Link</h4>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[var(--cyan)] font-mono text-sm uppercase hover:text-white transition-colors mt-2">
                <span>Visit Project</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
            </div>
            {project.github && (
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">Source</h4>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[var(--cyan)] font-mono text-sm uppercase hover:text-white transition-colors mt-2">
                  <span>View Code</span>
                  <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                </a>
              </div>
            )}
          </div>

          {/* Description & Imagery */}
          <div className="flex flex-col gap-16">
            <h2 className="font-clash text-3xl md:text-5xl uppercase font-semibold text-white leading-tight">
              Pushing boundaries in {project.category.toLowerCase()}.
            </h2>
            <div className="font-cabinet text-lg md:text-xl font-light leading-relaxed text-white/70">
              {project.description}
            </div>

            {/* Tech Stack & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)]/70 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 font-mono text-xs text-white/60 hover:border-[var(--cyan)]/50 hover:text-[var(--cyan)]/80 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.metrics && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)]/70 mb-4">Key Metrics</h3>
                  <div className="flex flex-col gap-2">
                    {project.metrics.map(m => (
                      <p key={m} className="font-cabinet text-sm text-white/70">✓ {m}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

    </article>
  );
}
