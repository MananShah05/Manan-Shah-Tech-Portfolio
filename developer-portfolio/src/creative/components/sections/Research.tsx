"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";

export function Research() {
  const research = resumeData.research;

  return (
    <section
      id="research"
      className="py-32 lg:py-48 relative bg-accent text-accent-ink overflow-hidden"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-12"
          >
            <div className="space-y-6">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-accent-ink">
                {research.title.split(":")[0]}
                <br />
                <span className="text-accent-ink/50 text-4xl md:text-5xl lg:text-6xl mt-2 block font-normal">
                  {research.title.split(":")[1]?.trim()}
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-accent-ink/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
                </span>
                <span className="font-mono tracking-widest uppercase text-xs text-accent-ink">
                  {research.status}
                </span>
              </div>

              <p className="text-accent-ink/60 leading-tight text-lg md:text-xl max-w-2xl">
                {research.abstract}
              </p>
            </div>

            <div className="pt-8 border-t-2 border-accent-ink/10 space-y-6">
              <h4 className="text-xs font-mono tracking-widest text-accent-ink/40 uppercase">
                Core Methodology
              </h4>
              <div className="flex flex-wrap gap-3">
                {research.methodology.map((method) => (
                  <span
                    key={method}
                    className="px-4 py-2 bg-accent-ink/10 text-accent-ink text-sm font-mono uppercase tracking-wider border-2 border-accent-ink/20"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button className="group flex items-center gap-3 px-8 py-4 bg-accent-ink text-accent font-bold text-sm uppercase tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95">
                <BookOpen size={16} />
                <span>Read Academic Paper (Soon)</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 w-full relative"
          >
            <div className="border-2 border-accent-ink/10 p-8 flex flex-col gap-4">
              {[
                "Data Pipeline",
                "Feature Space",
                "Cross-Modal Fusion",
                "Classification",
              ].map((step, i) => (
                <div key={step} className="w-full flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className="w-full max-w-[280px] px-6 py-4 bg-accent-ink/5 border-2 border-accent-ink/10 text-accent-ink text-center font-mono text-sm uppercase tracking-wider"
                  >
                    {step}
                  </motion.div>

                  {i < 3 && (
                    <div className="w-px h-8 bg-accent-ink/20 my-1" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
