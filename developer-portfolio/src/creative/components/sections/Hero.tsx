"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Play, Zap } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";
import { HeroScene } from "./HeroScene";
import { useGPUTier } from "@/hooks/useGPUTier";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const { isTransitioning, triggerTransition } = usePortfolioMode();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gpuTier = useGPUTier(); // RULE 2: Performance gates

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleMode = () => {
    if (isTransitioning) return;
    const origin = buttonRef.current
      ? {
          x: buttonRef.current.getBoundingClientRect().left + buttonRef.current.getBoundingClientRect().width / 2,
          y: buttonRef.current.getBoundingClientRect().top + buttonRef.current.getBoundingClientRect().height / 2,
        }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    triggerTransition(origin);
  };

  // Headline lines for the premium masked scroll-reveal (Emil-style)
  const headlineLines = [
    ["Crafting"],
    ["bold", "visual"],
    ["experiences."]
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-bg"
    >
      {/* Floating Ambient Glowing Blobs for deep background layering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] max-w-[350px] bg-accent/4 rounded-full filter blur-[70px]"
        />
        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 1.05, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] max-w-[350px] bg-white/4 rounded-full filter blur-[90px]"
        />
      </div>

      {/* RULE 2: Low-GPU static video fallback / High-GPU R3F Canvas */}
      {gpuTier === "low" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-25 select-none pointer-events-none"
          src="/videos/hero-pre-rendered.webm"
          onError={(e) => {
            const video = e.currentTarget;
            if (video.src !== "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32212-large.mp4") {
              video.src = "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32212-large.mp4";
            }
          }}
        />
      ) : (
        <HeroScene scrollYProgress={scrollYProgress} />
      )}

      {/* Intro Loader Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }, // RULE 5
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          >
            <div className="relative overflow-hidden p-2">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="font-display text-[clamp(2.5rem,10vw,10rem)] font-bold uppercase tracking-tighter leading-[0.85] text-ink"
              >
                Manan{" "}
                <span className="text-accent font-semibold">Shah</span>
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-3 font-mono text-sm tracking-[0.4em] text-ink-muted uppercase text-center"
              >
                Creative Designer
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Floor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Large subtle typographic background identifier */}
        <div className="absolute -right-[4%] top-1/2 -translate-y-1/2 font-display text-[clamp(8rem,16vw,20rem)] font-bold text-muted leading-none select-none pointer-events-none opacity-20">
          TF.01
        </div>
      </div>

      <motion.div
        style={{ scale }}
        className="max-w-[95vw] mx-auto px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Typeset typography block sitting in front of 3D Canvas */}
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 15 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1], // Emil Kowalski ease-out
          }}
          className="flex flex-col items-start lg:col-span-6 xl:col-span-6 space-y-8 relative z-10"
        >
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={!showIntro ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-2.5 px-3 py-1.5 border border-border bg-bg/85 backdrop-blur-xs"
            >
              <Sparkles size={12} className="text-accent" />
              <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">
                Studio.active() : {resumeData.personal.status}
              </span>
            </motion.div>

            {/* Interactive Mode Badge */}
            <motion.button
              ref={buttonRef}
              onClick={handleToggleMode}
              disabled={isTransitioning}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={!showIntro ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.48, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="group/pill flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border border-accent bg-accent/5 text-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(223,225,4,0.15)] active:scale-[0.97] transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>Creative Mode: ON</span>
              <span className="text-ink-muted group-hover/pill:text-accent font-normal normal-case transition-colors duration-300 ml-1">
                (Switch to Dev)
              </span>
            </motion.button>
          </div>

          {/* Headline: Rise-up text mask animations (Emil-style) */}
          {/* RULE 3: Framer Motion owns typography, text reveals smoothly */}
          <h1 className="font-display text-[clamp(2.8rem,9vw,6.8rem)] font-bold uppercase tracking-tighter leading-[0.82] text-ink -ml-1 text-balance">
            {headlineLines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden block py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={!showIntro ? { y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + lineIdx * 0.1,
                    ease: [0.23, 1, 0.32, 1], // ease-out-strong
                  }}
                  className="block origin-bottom"
                >
                  {line.map((word, wordIdx) => (
                    <span key={wordIdx} className={word === "visual" ? "text-accent font-semibold inline-block" : "inline-block"}>
                      {word}{" "}
                    </span>
                  ))}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Description with stagger fade */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.23, 1, 0.32, 1] }}
            className="text-ink-muted text-base sm:text-lg max-w-lg leading-tight font-body text-balance bg-bg/40 backdrop-blur-xs p-2 -ml-2 rounded"
          >
            Strategy, design, and technology in perfect sync crafting bold digital experiences that scale. Defy the ordinary.
          </motion.p>

          {/* CTAs with hover and scale transitions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-accent-ink font-bold text-xs uppercase tracking-tighter transition-strong hover:scale-[1.04] hover:shadow-[0_5px_20px_rgba(223,225,4,0.3)] active:scale-[0.96] cursor-pointer"
            >
              <Play size={14} />
              Visual Showcase
              <ArrowUpRight
                size={14}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
            <a
              href="#about"
              className="px-7 py-3.5 border border-border bg-bg/85 text-ink font-bold text-xs uppercase tracking-tighter transition-strong hover:bg-ink hover:text-bg hover:scale-[1.02] active:scale-[0.96] cursor-pointer"
            >
              Studio Services
            </a>

            {/* Technical Developer Portfolio toggle link */}
            <button
              onClick={handleToggleMode}
              disabled={isTransitioning}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-dashed border-accent text-accent bg-bg/85 font-bold text-xs uppercase tracking-tighter transition-strong hover:bg-accent hover:text-accent-ink hover:scale-[1.02] active:scale-[0.96] cursor-pointer disabled:opacity-50"
            >
              <Zap size={14} className="animate-pulse" />
              Developer Portfolio
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3x3 Capabilities Grid (with 3D perspective tilting) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={!showIntro ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: [0.23, 1, 0.32, 1], // Emil Kowalski ease-out
          }}
          className="lg:col-span-6 xl:col-span-6 relative z-10 w-full"
          style={{ perspective: 1000 }} // Setup 3D space perspective
        >
          {/* Subtle background identifier */}
          <div className="absolute -left-[5%] top-1/2 -translate-y-1/2 font-display text-[clamp(6rem,12vw,14rem)] font-bold text-muted leading-none select-none pointer-events-none z-0 opacity-10">
            01
          </div>

          <div className="grid grid-cols-3 gap-px bg-border border-2 border-border relative z-10" style={{ transformStyle: "preserve-3d" }}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85, y: 30, z: 0 }}
                animate={!showIntro ? { opacity: 1, scale: 1, y: 0, z: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.05, // staggered entry (Rule 4)
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  scale: 1.06,
                  y: -6,
                  z: 30,
                  rotateX: 8,
                  rotateY: -8,
                  boxShadow: "0 20px 40px rgba(223, 225, 4, 0.18)",
                  zIndex: 20,
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-bg/90 backdrop-blur-xs p-5 md:p-8 flex flex-col items-center justify-center gap-3 hover:bg-accent hover:text-accent-ink border border-transparent hover:border-accent/30 transition-all duration-300 cursor-pointer min-h-[110px] md:min-h-[150px] lg:min-h-[170px] select-none rounded-sm"
                style={{ transformStyle: "preserve-3d", transitionDuration: "200ms" }} // Hover entry/exit (Rule 5)
              >
                {/* Embedded 3D translate effect on inner text (floating effect) */}
                <div className="flex flex-col items-center gap-1.5 text-center" style={{ transform: "translateZ(10px)" }}>
                  <span className="font-mono text-xs md:text-sm lg:text-base font-bold uppercase tracking-tighter text-ink group-hover:text-accent-ink transition-colors duration-300">
                    {skill.name}
                  </span>
                  <span className="text-[9px] md:text-[10px] lg:text-xs font-mono uppercase tracking-widest text-ink-muted group-hover:text-accent-ink/65 transition-colors duration-300">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
