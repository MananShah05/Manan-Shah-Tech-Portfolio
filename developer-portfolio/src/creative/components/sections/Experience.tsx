"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/creative/lib/resume-data";

export function Experience() {
  const experiences = resumeData.experience;

  return (
    <section
      id="experience"
      className="pt-24 pb-28 lg:pt-32 lg:pb-36 bg-surface/30 relative"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              06. Professional Experience
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-ink -ml-1">
            Where I&apos;ve
            <br />
            <span className="text-ink-muted">visualized.</span>
          </h2>
        </motion.div>

        <div className="space-y-px border-2 border-border">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-bg hover:bg-accent hover:text-accent-ink transition-all duration-300 p-8 lg:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Duration */}
                <div className="md:w-1/4 shrink-0">
                  <span className="text-sm font-mono tracking-widest uppercase text-ink-muted group-hover:text-accent-ink/60 transition-colors duration-300">
                    {exp.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter group-hover:text-accent-ink transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-accent group-hover:text-accent-ink font-medium mt-1 transition-colors duration-300">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-4 text-ink-muted group-hover:text-accent-ink/70 transition-colors duration-300"
                      >
                        <span className="text-accent group-hover:text-accent-ink mt-1 shrink-0 text-xs transition-colors duration-300">
                          ✦
                        </span>
                        <span className="leading-tight">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
