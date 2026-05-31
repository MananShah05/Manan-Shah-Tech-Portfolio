import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

interface ModePillProps {
  className?: string;
}

export const ModePill: React.FC<ModePillProps> = ({ className = "" }) => {
  const { mode, transitionPhase, triggerTransition, isTransitioning } = usePortfolioMode();
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <motion.button
      ref={buttonRef}
      layoutId="mode-pill"
      onClick={handleClick}
      disabled={isTransitioning}
      className={`flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-mono text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase border relative overflow-visible cursor-pointer ${
        isDev
          ? "bg-zinc-800 border-zinc-700 text-zinc-100 shadow-md shadow-zinc-900/10 hover:border-zinc-500"
          : "bg-cyan-950 border-cyan-800 text-cyan-100 shadow-md shadow-cyan-900/20 hover:border-cyan-600"
      } transition-colors duration-300 ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* PHASE 1 — Charge pulse effect */}
      {transitionPhase === "charge" && (
        <motion.div
          layoutId="mode-pill-pulse"
          className={`absolute inset-0 rounded-full border-2 ${
            isDev ? "border-zinc-400" : "border-cyan-400"
          } pointer-events-none`}
          animate={{
            scale: [1, 1.8],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      <Zap
        size={12}
        className={`${isDev ? "text-emerald-400" : "text-amber-400"} animate-pulse shrink-0`}
      />

      <AnimatePresence mode="wait">
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="whitespace-nowrap"
        >
          {isDev ? "Developer Mode: ON" : "Creative Mode: ON"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
export default ModePill;
