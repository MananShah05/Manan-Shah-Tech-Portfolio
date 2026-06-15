import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, TrendingUp, Sparkles } from "lucide-react";
import {
  usePortfolioMode,
  MODE_ORDER,
  type PortfolioMode,
} from "../hooks/usePortfolioMode";

const META: Record<
  PortfolioMode,
  { icon: React.ReactNode; label: string; accent: string }
> = {
  swe: { icon: <Terminal size={16} />, label: "Engineering", accent: "56, 189, 248" },
  quant: { icon: <TrendingUp size={16} />, label: "Finance", accent: "245, 158, 11" },
  creative: { icon: <Sparkles size={16} />, label: "Creative", accent: "167, 139, 250" },
};

export const PersistentModeSwitcher: React.FC = () => {
  const { mode, triggerTransition, isTransitioning, transitionPhase } =
    usePortfolioMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSelect = (target: PortfolioMode, el: HTMLButtonElement | null) => {
    if (isTransitioning || target === mode || !el) return;
    const rect = el.getBoundingClientRect();
    triggerTransition(
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      target
    );
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.6 }}
      className="fixed z-[150] flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-xl"
      style={{
        bottom: isMobile ? "6.5rem" : "1.5rem",
        right: isMobile ? "1rem" : "1.5rem",
        backgroundColor: "var(--glass-bg)",
        borderColor: "var(--glass-border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >
      {MODE_ORDER.map((m) => {
        const active = m === mode;
        const meta = META[m];
        const charging = active && transitionPhase === "cover";
        return (
          <button
            key={m}
            onClick={(e) => handleSelect(m, e.currentTarget)}
            disabled={isTransitioning}
            aria-label={`${meta.label} mode`}
            aria-pressed={active}
            title={meta.label}
            className="relative flex items-center gap-1.5 rounded-full px-2.5 py-2 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none transition-colors duration-300"
            style={{
              backgroundColor: active ? `rgba(${meta.accent}, 0.16)` : "transparent",
              color: active ? `rgb(${meta.accent})` : "var(--fg-muted)",
            }}
          >
            {charging && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 pointer-events-none"
                style={{ borderColor: `rgb(${meta.accent})` }}
                animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                transition={{ duration: 0.25, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="shrink-0 flex items-center justify-center">{meta.icon}</span>
            {/* Active label expands; inactive collapse to dots on desktop, hidden on mobile */}
            {active && <span className="whitespace-nowrap leading-none">{meta.label}</span>}
          </button>
        );
      })}
    </motion.div>
  );
};

export default PersistentModeSwitcher;
