import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Palette } from "lucide-react";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

export function FloatingModeToggle() {
  const { mode, transitionPhase, triggerTransition, isTransitioning } = usePortfolioMode();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    if (isTransitioning || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    triggerTransition(origin);
  };

  const isDev = mode === "developer";

  // Customize styles based on developer or creative mode
  const buttonClass = isDev
    ? "bg-zinc-950/80 border-zinc-800 text-zinc-100 shadow-lg shadow-zinc-950/20 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    : "bg-ink border-border text-bg shadow-lg shadow-ink/30 hover:border-accent hover:text-accent";

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isTransitioning}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className={`fixed z-[150] flex items-center gap-2.5 px-3 py-3 rounded-full border backdrop-blur-xl transition-colors duration-300 cursor-pointer select-none outline-none ${buttonClass}`}
      style={{
        bottom: isMobile ? "6.5rem" : "1.5rem",
        right: isMobile ? "1rem" : "1.5rem",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {/* Charge pulse animation during transition prep */}
      {transitionPhase === "charge" && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${
            isDev ? "border-[var(--accent)]" : "border-accent"
          } pointer-events-none`}
          animate={{
            scale: [1, 1.6],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Dynamic Icon */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.div
              key="dev-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Palette size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="creative-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Terminal size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expandable Label on Hover (Desktop only) */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.span
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: "auto", opacity: 1, marginRight: 8 }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-wider leading-none"
          >
            {isDev ? "Creative Mode" : "Developer Mode"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default FloatingModeToggle;
