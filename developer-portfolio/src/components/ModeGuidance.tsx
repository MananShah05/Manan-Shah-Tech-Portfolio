import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X, Terminal, TrendingUp, Sparkles } from "lucide-react";
import { usePortfolioMode, type PortfolioMode } from "../hooks/usePortfolioMode";

export default function ModeGuidance() {
  const { mode, triggerTransition, isTransitioning } = usePortfolioMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    // Check if the user has completed the tour
    const completed = localStorage.getItem("portfolio-tour-completed");
    if (!completed) {
      setShowPulse(true);
      // Auto-open only once on first arrival (usually in SWE mode)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setShowPulse(false);
    localStorage.setItem("portfolio-tour-completed", "true");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (showPulse) {
      setShowPulse(false);
      localStorage.setItem("portfolio-tour-completed", "true");
    }
  };

  const handleModeSelect = (target: PortfolioMode, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning || target === mode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    triggerTransition(
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      target
    );
    // Auto-close card on selection
    setIsOpen(false);
    localStorage.setItem("portfolio-tour-completed", "true");
    setShowPulse(false);
  };

  const modesInfo = [
    {
      id: "swe" as PortfolioMode,
      name: "SWE Mode",
      icon: <Terminal size={14} />,
      accent: "56, 189, 248", // sky blue
      desc: "Full-stack systems, developer tools & APIs.",
    },
    {
      id: "quant" as PortfolioMode,
      name: "Quant Mode",
      icon: <TrendingUp size={14} />,
      accent: "224, 146, 47", // amber
      desc: "Mathematical risk, signals & finance models.",
    },
    {
      id: "creative" as PortfolioMode,
      name: "Creative Mode",
      icon: <Sparkles size={14} />,
      accent: "167, 139, 250", // violet
      desc: "3D Blender works, showreels & UI/UX designs.",
    },
  ];

  return (
    <>
      {/* Corner Trigger Button (Help/Tour icon) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            aria-label="Open portfolio guide"
            title="Portfolio Guide"
            className="fixed z-[160] rounded-full p-3 border shadow-lg backdrop-blur-xl cursor-pointer flex items-center justify-center transition-colors duration-300"
            style={{
              bottom: isMobile ? "6.5rem" : "1.5rem",
              left: isMobile ? "1rem" : "1.5rem",
              backgroundColor: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
              color: "var(--fg-muted)",
            }}
          >
            {showPulse && (
              <motion.span
                className="absolute inset-0 rounded-full border pointer-events-none"
                style={{ borderColor: "var(--accent)" }}
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Compass size={18} className="shrink-0" style={{ color: "var(--accent)" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expandable Navigation & Guidance Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 15 : 0, x: isMobile ? 0 : -15, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[160] rounded-2xl border p-5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl select-none"
            style={{
              bottom: isMobile ? "11.5rem" : "1.5rem",
              left: isMobile ? "1rem" : "1.5rem",
              backgroundColor: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
              width: isMobile ? "calc(100% - 2rem)" : "22rem",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Compass size={16} className="shrink-0" style={{ color: "var(--accent)" }} />
                <h3 className="font-serif italic text-lg leading-none" style={{ color: "var(--fg)" }}>
                  Portfolio Lenses
                </h3>
              </div>
              <button
                onClick={handleDismiss}
                aria-label="Close guide"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                style={{ color: "var(--fg-muted)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              This portfolio is built with three distinct views depending on what you need to see. Switch lenses below or use the controller in the bottom-right.
            </p>

            {/* Mode list buttons */}
            <div className="space-y-2.5 mb-4">
              {modesInfo.map((m) => {
                const isActive = m.id === mode;
                return (
                  <button
                    key={m.id}
                    onClick={(e) => handleModeSelect(m.id, e)}
                    disabled={isTransitioning}
                    className="w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    style={{
                      borderColor: isActive
                        ? `rgb(${m.accent})`
                        : "var(--glass-border)",
                      backgroundColor: isActive
                        ? `rgba(${m.accent}, 0.08)`
                        : "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        backgroundColor: isActive
                          ? `rgba(${m.accent}, 0.15)`
                          : "var(--glass-border)",
                        color: `rgb(${m.accent})`,
                      }}
                    >
                      {m.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>
                          {m.name}
                        </span>
                        {isActive && (
                          <span
                            className="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `rgba(${m.accent}, 0.15)`,
                              color: `rgb(${m.accent})`,
                              border: `1px solid rgba(${m.accent}, 0.25)`,
                            }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-snug mt-1" style={{ color: "var(--fg-muted)" }}>
                        {m.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Got it footer */}
            <div className="flex items-center justify-end">
              <button
                onClick={handleDismiss}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-sm hover:brightness-110 active:scale-98"
                style={{
                  backgroundColor: "var(--accent)",
                  color: mode === "creative" ? "var(--color-accent-ink)" : "#ffffff",
                }}
              >
                Got it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
