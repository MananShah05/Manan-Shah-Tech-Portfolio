import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Brain, Award, Globe } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";
import DeveloperDashboard from "./DeveloperDashboard";

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
      id="hero"
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

        {/* Bottom fade mask */}
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
            {/* Top label removed */}


            {/* Main headline */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(2.6rem,6.2vw,5rem)] leading-[1.05] tracking-[-0.02em]"
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
                    className="absolute -bottom-1 left-0 h-0.5"
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
                className="font-serif text-[clamp(2.6rem,6.2vw,5rem)] leading-[1.05] tracking-[-0.02em] mt-1"
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
              className="text-[15px] md:text-base max-w-md leading-relaxed mb-5"
              style={{ color: "var(--fg-muted)" }}
            >
              Final Year IT Engineer · DJSCE Mumbai · AI/ML Developer ·
              Research-Oriented
            </motion.p>

            {/* Trust chips (aligned horizontally) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap lg:flex-nowrap items-center gap-2 mb-5 overflow-visible"
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
                  className="glass-light rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-default whitespace-nowrap"
                >
                  <span style={{ color: "var(--accent)", opacity: 0.5 }}>
                    {chip.icon}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--fg-muted)" }}
                  >
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
              className="mb-6"
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
                className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden cursor-pointer"
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
                onClick={() => window.open("https://drive.google.com/drive/folders/1wxNikownhCSbqn9dmFCRce7f4ZjpgjuU?usp=sharing", "_blank")}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  color: "var(--fg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                View Resume
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — Developer Dashboard with floating windows */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <DeveloperDashboard />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
