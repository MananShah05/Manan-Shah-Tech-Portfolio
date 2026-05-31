"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/resume-data";
import { Layers, Film, Sparkles, Wand2 } from "lucide-react";

interface SkillCardProps {
  title: string;
  items: string[];
  index: number;
  className?: string;
  icon: React.ReactNode;
}

function SkillCard({
  title,
  items,
  index,
  className = "",
  icon,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04, // Rapid Kowalski stagger delay
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`group relative overflow-hidden border border-border bg-surface p-8 lg:p-10 flex flex-col justify-between hover:bg-accent hover:text-accent-ink transition-strong cursor-pointer min-h-[220px] ${className}`}
    >
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-display text-2xl lg:text-3xl font-bold uppercase tracking-tighter group-hover:text-accent-ink transition-colors duration-200">
            {title}
          </h3>
          <div className="text-accent group-hover:text-accent-ink transition-colors duration-200">
            {icon}
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-auto">
          {items.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-bg group-hover:bg-accent-ink/10 text-ink group-hover:text-accent-ink text-xs font-mono uppercase tracking-wider border border-border group-hover:border-accent-ink/20 transition-strong"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { skills } = resumeData;

  // Staggered asymmetrical layout columns with custom design icons
  const skillCards = [
    {
      title: "Core Foundations",
      items: skills.languages,
      className: "lg:col-span-1",
      icon: <Layers size={22} />,
    },
    {
      title: "AI Video & Imagery",
      items: skills.aiml,
      className: "lg:col-span-2 bg-surface/80",
      icon: <Wand2 size={22} />,
    },
    {
      title: "3D Design & Modeling",
      items: skills.backend,
      className: "lg:col-span-2 bg-surface/80",
      icon: <Sparkles size={22} />,
    },
    {
      title: "Creative Software",
      items: skills.frontend,
      className: "lg:col-span-1",
      icon: <Film size={22} />,
    },
  ];

  return (
    <section
      id="skills"
      className="pt-24 pb-20 lg:pt-32 lg:pb-24 relative bg-bg"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 space-y-6"
        >
          {/* Section Badge (Em-dash replaced) */}
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              04. Capabilities
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] text-ink -ml-1">
            Creative
            <br />
            Capabilities.
          </h2>
        </motion.div>

        {/* Subtle background identifier */}
        <div className="absolute right-[4%] top-[15%] font-display text-[clamp(6rem,12vw,14rem)] font-bold text-muted leading-none select-none pointer-events-none z-0 opacity-10">
          CAP.04
        </div>

        {/* Asymmetrical Grid layout breaking symmetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border relative z-10">
          {skillCards.map((card, i) => (
            <SkillCard
              key={card.title}
              title={card.title}
              items={card.items}
              index={i}
              className={card.className}
              icon={card.icon}
            />
          ))}

          {/* Currently Exploring — Refactored to have highly active hover states and mechanical feedback */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="md:col-span-2 lg:col-span-3 bg-accent text-accent-ink p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8 group/explore cursor-pointer hover:bg-ink hover:text-bg transition-strong"
          >
            <div className="flex-shrink-0 space-y-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-ink group-hover/explore:bg-bg opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-ink group-hover/explore:bg-bg" />
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase">
                  Currently Mastering
                </span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold uppercase tracking-tighter">
                Exploring Visual Shaders
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:ml-auto">
              {skills.currently_learning.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-accent-ink/10 group-hover/explore:bg-bg/10 text-accent-ink group-hover/explore:text-bg text-xs font-mono uppercase tracking-wider border border-accent-ink/20 group-hover/explore:border-bg/20 transition-strong"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
