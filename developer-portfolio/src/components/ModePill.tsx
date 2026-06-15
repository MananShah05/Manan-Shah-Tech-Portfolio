import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

interface ModePillProps {
  className?: string;
}

const LABELS: Record<string, string> = {
  swe: "SWE Mode: ON",
  quant: "Quant Mode: ON",
  creative: "Creative Mode: ON",
};

export const ModePill: React.FC<ModePillProps> = ({ className = "" }) => {
  const { mode, triggerTransition, isTransitioning } = usePortfolioMode();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isTransitioning || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    // No target → cycles to the next lens.
    triggerTransition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.button
      ref={buttonRef}
      layoutId="mode-pill"
      onClick={handleClick}
      disabled={isTransitioning}
      title="Switch lens"
      className={`flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-mono text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase border relative overflow-visible cursor-pointer transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: "rgba(var(--mode-pill-rgb, 113 113 122), 0.12)",
        borderColor: "var(--glass-border)",
        color: "var(--accent)",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      <Zap size={12} className="animate-pulse shrink-0" style={{ color: "var(--accent)" }} />

      <AnimatePresence mode="wait">
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="whitespace-nowrap"
          style={{ color: "var(--fg)" }}
        >
          {LABELS[mode] ?? "Switch Lens"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ModePill;
