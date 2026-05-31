"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export function Experience() {
  const experiences = resumeData.experience;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExp = experiences[activeIndex];

  return (
    <section
      id="experience"
      className="py-24 lg:py-36 bg-surface/30 relative border-t-2 border-border"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 space-y-4"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-ink -ml-1">
            Where I&apos;ve
            <br />
            <span className="text-ink-muted">visualized.</span>
          </h2>
        </motion.div>

        {/* Interactive Split Timeline Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Company Selector Tabs (Left Panel) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {experiences.map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left p-6 border-2 transition-all duration-300 flex flex-col gap-2 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? "border-ink bg-ink text-bg"
                      : "border-border bg-bg hover:border-ink text-ink"
                  }`}
                >
                  {/* Hover background color slide */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider opacity-60">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold uppercase tracking-tighter mt-2">
                    {exp.company}
                  </h3>
                  
                  <span className="relative z-10 text-sm opacity-80 font-mono tracking-tight uppercase">
                    {exp.role}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details Card Display (Right Panel) */}
          <div className="lg:col-span-8 border-2 border-border bg-bg p-8 lg:p-12 relative flex flex-col justify-between overflow-hidden">
            {/* Background grid details */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col h-full justify-between gap-8"
              >
                <div>
                  {/* Job details header block */}
                  <div className="border-b-2 border-border pb-6 mb-8 flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-ink leading-none">
                          {activeExp.role}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 font-mono text-sm text-ink-muted uppercase">
                          <span className="text-ink font-bold">{activeExp.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={13} />
                            {activeExp.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet accomplishments points */}
                  <ul className="space-y-6">
                    {activeExp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.1, duration: 0.4 }}
                        className="flex items-start gap-4 text-lg text-ink-muted hover:text-ink transition-colors duration-200"
                      >
                        <span className="text-accent mt-1.5 shrink-0 text-sm">
                          ✦
                        </span>
                        <span className="leading-snug">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom decorative anchor */}
                <div className="border-t-2 border-border pt-6 mt-8 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted">
                  <span>DJSCE Tech / Applied AI</span>
                  <div className="flex items-center gap-1 text-accent font-bold">
                    <span>Collaborator</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
