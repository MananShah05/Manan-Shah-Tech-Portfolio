"use client";

import { resumeData } from "@/creative/lib/resume-data";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-bg border-t-2 border-border">
      <div className="max-w-[95vw] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-ink-muted flex flex-col md:flex-row items-center gap-2 md:gap-4 font-mono uppercase tracking-widest">
          <span>
            © {new Date().getFullYear()} {resumeData.personal.name}
          </span>
          <span className="hidden md:inline">·</span>
          <span>Built with Next.js 14</span>
          <span className="hidden md:inline">·</span>
          <span>Deployed on Vercel</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs text-ink-muted hover:text-accent transition-colors duration-300 font-mono uppercase tracking-widest group"
        >
          Back to top
          <ArrowUp
            size={14}
            className="transform group-hover:-translate-y-1 transition-transform duration-300"
          />
        </button>
      </div>
    </footer>
  );
}
