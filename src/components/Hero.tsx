import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Brain, Award, Globe } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";
import DeveloperDashboard from "./DeveloperDashboard";
import FloatingMetric from "./FloatingMetric";

const cycleWords = ["read", "reason", "predict", "extract", "deploy"];

const trustChips = [
  { label: "Published Research", icon: <FileText size={12} /> },
  { label: "Finance Certified", icon: <Award size={12} /> },
  { label: "Full-Stack Developer", icon: <Brain size={12} /> },
  { label: "Open to Roles", icon: <Globe size={12} /> },
];

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveWord((prev) => (prev + 1) % cycleWords.length);
        setIsTransitioning(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--bg)" }}>
        <NeuralNetwork />

        <motion.div
          animate={{
            x: [0, 60, -40, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "var(--accent)", opacity: 0.04, zIndex: 0 }}
        />
        <motion.div
          animate={{
            x: [0, -40, 50, -20, 0],
            y: [0, 30, -40, 20, 0],
            scale: [1, 0.9, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: "var(--secondary)", opacity: 0.03, zIndex: 0 }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: "var(--grid-opacity)",
            backgroundImage:
              "linear-gradient(rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            zIndex: 2,
          }}
        />

        {/* Bottom fade mask to blend smoothly into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-32 pb-12 md:pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center min-h-[80vh]">
          {/* LEFT — Identity & messaging */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.25em]"
                style={{ color: "var(--fg-subtle)" }}
              >
                01 — Live System
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em]"
                style={{ color: "var(--fg)" }}
              >
                Building systems
                <br />
                that{" "}
                <span className="relative inline-block">
                  <motion.span
                    animate={{
                      opacity: isTransitioning ? 0 : 1,
                      y: isTransitioning ? -12 : 0,
                      filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ color: "var(--accent)" }}
                  >
                    {cycleWords[activeWord]}
                  </motion.span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px]"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.2 }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                </span>
                <span style={{ color: "var(--fg-subtle)" }}>,</span>
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] mt-1"
                style={{ color: "var(--fg)" }}
              >
                and respond
                <span style={{ color: "var(--secondary)" }}>.</span>
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] md:text-base max-w-md leading-relaxed mb-8"
              style={{ color: "var(--fg-muted)" }}
            >
              Final Year IT Engineer · DJSCE Mumbai · AI/ML Developer ·
              Research-Oriented
            </motion.p>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2.5 mb-6"
            >
              {trustChips.map((chip, i) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="glass-light rounded-full px-4 py-2 flex items-center gap-2 cursor-default"
                >
                  <span style={{ color: "var(--accent)", opacity: 0.5 }}>{chip.icon}</span>
                  <span className="text-[11px] font-medium" style={{ color: "var(--fg-muted)" }}>
                    {chip.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Currently Building */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="mb-8"
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--fg-subtle)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                Currently Building: InsureDoc v2 · AI Resume Chat · Semantic Search
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={() => handleNavClick("#projects")}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Projects
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: "var(--accent-light)" }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  color: "var(--fg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                View Resume
              </motion.button>

              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ y: -2 }}
                className="text-xs font-mono transition-colors duration-300 cursor-pointer"
                style={{ color: "var(--fg-subtle)" }}
              >
                <span className="mr-1.5" style={{ color: "var(--accent)", opacity: 0.4 }}>$</span>
                open live terminal
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — Technical visual */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              {/* Main glass panel */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="glass-light rounded-3xl p-6 md:p-8 relative"
                style={{ boxShadow: "0 0 60px var(--accent-glow), 0 0 120px rgba(27, 67, 50, 0.04)" }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "rgba(45, 106, 79, 0.1)" }}
                    >
                      <Brain size={15} style={{ color: "var(--accent)", opacity: 0.7 }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: "var(--fg)" }}>
                        Neural Interface
                      </div>
                      <div className="text-[10px] font-mono" style={{ color: "var(--fg-subtle)" }}>
                        v2.4.1 · online
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <span className="text-[10px] font-mono" style={{ color: "var(--accent)", opacity: 0.6 }}>
                      LIVE
                    </span>
                  </div>
                </div>

                {/* System metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "LeetCode", value: "40+", color: "var(--accent)" },
                    { label: "DSA Solved", value: "60+", color: "var(--secondary)" },
                    { label: "Hackathons", value: "5+", color: "var(--accent)" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-3"
                      style={{ backgroundColor: `${m.color}10` }}
                    >
                      <div className="font-mono text-sm font-semibold" style={{ color: "var(--fg)" }}>
                        {m.value}
                      </div>
                      <div className="text-[9px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "var(--fg-subtle)" }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Developer Dashboard */}
                <DeveloperDashboard />
              </motion.div>

              {/* Floating metric cards — right perimeter */}
              <div className="absolute -top-6 -right-2 md:-top-10 md:-right-8 lg:-right-10">
                <FloatingMetric
                  label="Projects"
                  value="5+"
                  delay={0}
                  orbitX={6}
                  orbitY={5}
                  orbitDuration={5.5}
                />
              </div>

              <div className="absolute top-[45%] -right-2 md:-right-10 lg:-right-14 z-20">
                <FloatingMetric
                  label="Experience"
                  value="3+"
                  delay={0.15}
                  orbitX={7}
                  orbitY={5}
                  orbitDuration={5}
                />
              </div>

              {/* Left-side floating cards — positioned low to avoid headline */}
              <div className="absolute top-[65%] -left-4 md:-left-10">
                <FloatingMetric
                  label="Research Papers"
                  value="1"
                  delay={0.45}
                  orbitX={5}
                  orbitY={6}
                  orbitDuration={6}
                />
              </div>

              <div className="absolute top-[85%] -left-2 md:-left-8">
                <FloatingMetric
                  label="Focus"
                  value="Applied AI"
                  delay={0.6}
                  orbitX={4}
                  orbitY={5}
                  orbitDuration={5.5}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
