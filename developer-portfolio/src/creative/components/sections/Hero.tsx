"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Play, Zap } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";
import { ThreeViewport } from "./ThreeViewport";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const { isTransitioning, triggerTransition } = usePortfolioMode();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-bg"
    >
      {/* Intro Loader Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
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
          className="absolute inset-0 opacity-[0.03]"
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
        {/* Left Column: Typeset typography block */}
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 15 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1], // Emil Kowalski ease-out
          }}
          className="flex flex-col items-start lg:col-span-7 space-y-8"
        >
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 border border-border">
              <Sparkles size={12} className="text-accent" />
              <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">
                Studio.active() : {resumeData.personal.status}
              </span>
            </div>

            {/* Interactive Mode Badge */}
            <button
              ref={buttonRef}
              onClick={handleToggleMode}
              disabled={isTransitioning}
              className="group/pill flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border border-accent bg-accent/5 text-accent hover:bg-accent/10 active:scale-[0.97] transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>Creative Mode: ON</span>
              <span className="text-ink-muted group-hover/pill:text-accent font-normal normal-case transition-colors duration-300 ml-1">
                (Switch to Dev)
              </span>
            </button>
          </div>

          {/* Main Headline with letter tracking adjustments */}
          <h1 className="font-display text-[clamp(2.8rem,9vw,6.8rem)] font-bold uppercase tracking-tighter leading-[0.82] text-ink -ml-1 text-balance">
            Crafting
            <br />
            bold <span className="text-accent font-semibold">visual</span>
            <br />
            experiences.
          </h1>

          {/* Description */}
          <p className="text-ink-muted text-base sm:text-lg max-w-lg leading-tight font-body text-balance">
            Strategy, design, and technology in perfect sync crafting bold digital experiences that scale. Defy the ordinary.
          </p>

          {/* CTAs with active:scale feedback and media hover query tags */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-accent-ink font-bold text-xs uppercase tracking-tighter transition-strong hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
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
              className="px-7 py-3.5 border border-border text-ink font-bold text-xs uppercase tracking-tighter transition-strong hover:bg-ink hover:text-bg active:scale-[0.97] cursor-pointer"
            >
              Studio Services
            </a>

            {/* Technical Developer Portfolio toggle link */}
            <button
              onClick={handleToggleMode}
              disabled={isTransitioning}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-dashed border-accent text-accent font-bold text-xs uppercase tracking-tighter transition-strong hover:bg-accent hover:text-accent-ink active:scale-[0.97] cursor-pointer disabled:opacity-50"
            >
              <Zap size={14} className="animate-pulse" />
              Developer Portfolio
            </button>
          </div>
        </motion.div>

        {/* Right Column: Custom Interactive Three.js Viewport Monitor Frame */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={!showIntro ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.23, 1, 0.32, 1], // Emil Kowalski ease-out
          }}
          className="lg:col-span-5 relative w-full aspect-square border border-border bg-surface p-4 flex flex-col justify-between group overflow-hidden"
        >
          {/* Workspace header */}
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink font-bold">
                TRANSCEND_CORE_3D
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 border border-border" />
              <div className="w-1.5 h-1.5 border border-border" />
            </div>
          </div>

          {/* Core Interactive Viewport Canvas */}
          <div className="flex-1 my-3 relative border border-border/40 overflow-hidden bg-bg/50">
            <ThreeViewport />
          </div>

          {/* Timeline and track details at the bottom */}
          <div className="border-t border-border pt-3 font-mono text-[9px] text-ink-muted/70 flex justify-between items-center">
            <span>RES: 1920x1080</span>
            <span>FRAME: 0240 / 1000</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
