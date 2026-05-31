"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ExternalLink } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";

export function Certifications() {
  const certs = resumeData.certifications;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="certifications"
      className="py-20 lg:py-28 relative bg-ink text-bg overflow-hidden"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block (Em-dash removed) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              05. Credentials
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] text-bg -ml-1">
            Professional
            <br />
            Certifications.
          </h2>
        </motion.div>

        {/* Dynamic Interactive Accordion List (Breaks 3-column card grid template) */}
        <div className="border-t border-border/40 divide-y divide-border/20 relative z-10">
          {certs.map((cert, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <div key={cert.name} className="group">
                <motion.div
                  onClick={() => toggleExpand(i)}
                  className="flex items-center justify-between py-6 lg:py-8 cursor-pointer group transition-colors duration-200 hover:text-accent select-none"
                >
                  <div className="flex items-center gap-6">
                    {/* Index identifier */}
                    <span className="font-mono text-xs text-ink-muted group-hover:text-accent/60">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl md:text-3xl font-bold uppercase tracking-tighter transition-colors duration-200">
                      {cert.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 border border-border/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-ink-muted group-hover:border-accent/40 group-hover:text-accent transition-colors duration-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${cert.status === "Active" ? "bg-accent" : "bg-orange"}`} />
                      {cert.status}
                    </span>

                    {/* Expand Chevron Icon with Kowalski custom timing rotation */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      className="w-10 h-10 border border-border/30 flex items-center justify-center text-ink-muted group-hover:text-accent group-hover:border-accent transition-colors duration-200 active:scale-90"
                    >
                      <ArrowDownRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Smooth Expandable Accodion Panel with --ease-drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }, // Accordion ease-drawer
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12 grid grid-cols-1 md:grid-cols-12 gap-6 text-sm text-ink-muted leading-tight max-w-4xl">
                        
                        <div className="md:col-span-4 space-y-4">
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-muted/50 mb-1">ISSUED BY</span>
                            <span className="font-semibold text-bg uppercase">{cert.issuer}</span>
                          </div>
                          {cert.credentialId && (
                            <div>
                              <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-muted/50 mb-1">CREDENTIAL ID</span>
                              <span className="font-mono text-xs text-accent">{cert.credentialId}</span>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-6 space-y-4">
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-muted/50 mb-1">OVERVIEW</span>
                            <p className="font-body text-ink-muted leading-relaxed">
                              {cert.description || "Verified competence in advanced visual modeling, keyframe composition, and premium 3D design workflows."}
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex items-end">
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="group/link inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest hover:text-bg transition-colors duration-200 mt-2"
                            >
                              Verify <ExternalLink size={12} />
                            </a>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
