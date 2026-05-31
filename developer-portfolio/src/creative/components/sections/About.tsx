"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/creative/lib/resume-data";
import { ArrowUpRight, Film, Sparkles, Layers } from "lucide-react";
import Marquee from "react-fast-marquee";

export function About() {
  const skills = [
    { name: "3D Design", category: "Modeling" },
    { name: "Motion Graphics", category: "Animation" },
    { name: "Video Production", category: "Editing" },
    { name: "Generative AI Video", category: "Ads" },
    { name: "Design Strategy", category: "Identity" },
    { name: "Figma Prototypes", category: "UI/UX" },
    { name: "Color Grading", category: "DaVinci" },
    { name: "Audio Sound Design", category: "Audio" },
    { name: "Visual Storytelling", category: "Direction" },
  ];

  return (
    <section id="about" className="py-32 lg:py-48 relative overflow-hidden bg-bg">
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Column: Typography & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col space-y-12"
        >
          <div className="space-y-6">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-ink">
              Defying the
              <br />
              ordinary with
              <br />
              <span className="text-ink-muted">storytelling</span>
              <br />
              precision.
            </h2>
          </div>

          <div className="text-ink-muted text-lg md:text-xl space-y-6 leading-tight max-w-2xl">
            <p>
              Hi, I’m a <span className="text-ink font-medium">Creative Designer & Visual Editor</span>.
              I turn ideas into polished visuals that communicate, captivate, and convert. From branding and ad creatives to cinematic edits, I bring a detail-driven approach that blends design strategy with storytelling.
            </p>
            <p>
              Technically, I specialize in blending <span className="text-accent font-medium">3D design, motion graphics, and video production</span> with modern AI workflows. My goal is to make every frame feel intentional, and every digital experience look world-class.
            </p>
            <p>
              Whether it’s crafting generative AI ads, designing high-fidelity Figma prototypes, or editing long-form cinematic content, I focus on the perfect synergy of <span className="text-ink font-medium">strategy, design, and technology</span> to create bold experiences that scale.
            </p>
          </div>

          {/* Visual Focus Grid */}
          <div className="grid grid-cols-3 gap-px bg-border border-2 border-border">
            <div className="flex flex-col items-center gap-3 p-6 bg-bg group hover:bg-accent hover:text-accent-ink transition-all duration-300">
              <Layers
                size={24}
                className="text-accent group-hover:text-accent-ink transition-colors duration-300"
              />
              <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-accent-ink transition-colors duration-300">
                3D Design
              </span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-bg group hover:bg-accent hover:text-accent-ink transition-all duration-300">
              <Sparkles
                size={24}
                className="text-accent group-hover:text-accent-ink transition-colors duration-300"
              />
              <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-accent-ink transition-colors duration-300">
                Motion
              </span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-bg group hover:bg-accent hover:text-accent-ink transition-all duration-300">
              <Film
                size={24}
                className="text-accent group-hover:text-accent-ink transition-colors duration-300"
              />
              <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-accent-ink transition-colors duration-300">
                Visuals
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-border">
            {resumeData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col group"
              >
                <span className="font-display text-5xl md:text-6xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-sm tracking-wide text-ink-muted uppercase font-mono">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Skills Grid */}
        <div className="relative">
          {/* Massive background number */}
          <div className="absolute -left-[5%] top-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,20rem)] font-bold text-muted leading-none select-none pointer-events-none z-0">
            02
          </div>

          <div className="grid grid-cols-3 gap-px bg-border border-2 border-border relative z-10">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-bg p-4 md:p-6 flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-accent-ink transition-all duration-300 cursor-pointer min-h-[100px] md:min-h-[140px]"
              >
                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-tighter text-center group-hover:text-accent-ink transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-ink-muted group-hover:text-accent-ink/60 transition-colors duration-300">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Marquee */}
      <div className="mt-24 border-t-2 border-b-2 border-border py-8 bg-accent">
        <Marquee
          speed={80}
          gradient={false}
          autoFill={true}
        >
          {resumeData.stats.concat(resumeData.stats).map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-6 mx-8"
            >
              <span className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-accent-ink">
                {stat.value}
              </span>
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent-ink/60">
                {stat.label}
              </span>
              <span className="text-accent/40 text-2xl">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
