import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { usePortfolioMode, type PortfolioMode } from "../hooks/usePortfolioMode";

interface GatewayCard {
  mode: PortfolioMode;
  icon: React.ReactNode;
  label: string;
  tagline: string;
  subtext: string;
  accent: string; // accent color for hover wash
}

const CARDS: GatewayCard[] = [
  {
    mode: "swe",
    icon: <Terminal size={28} strokeWidth={1.6} />,
    label: "SWE",
    tagline: "Here for the engineering",
    subtext: "End-to-end systems · APIs · Production deployments",
    accent: "56, 189, 248", // sky blue
  },
  {
    mode: "quant",
    icon: <TrendingUp size={28} strokeWidth={1.6} />,
    label: "Quant",
    tagline: "Here for the finance",
    subtext: "Portfolio risk · NLP signals · NISM certified",
    accent: "245, 158, 11", // amber gold
  },
  {
    mode: "creative",
    icon: <Sparkles size={28} strokeWidth={1.6} />,
    label: "Creative",
    tagline: "Here for the experience",
    subtext: "Immersive 3D · Web Audio · Motion design",
    accent: "167, 139, 250", // violet
  },
];

export const ModeGateway: React.FC = () => {
  const { enterMode } = usePortfolioMode();
  const [hovered, setHovered] = useState<PortfolioMode | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Intro line */}
      <motion.div
        className="text-center mb-10 sm:mb-14 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-(--fg-subtle) mb-3">
          Manan Shah
        </p>
        <h1 className="font-serif italic text-2xl sm:text-4xl md:text-5xl leading-tight text-balance">
          I build differently depending on what you need to see.
        </h1>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full max-w-4xl">
        {CARDS.map((card, i) => {
          const dimmed = hovered !== null && hovered !== card.mode && !isMobile;
          return (
            <motion.button
              key={card.mode}
              onClick={() => enterMode(card.mode)}
              onMouseEnter={() => !isMobile && setHovered(card.mode)}
              onMouseLeave={() => !isMobile && setHovered(null)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
              whileHover={isMobile ? undefined : { y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-start text-left rounded-2xl border p-6 sm:p-7 cursor-pointer outline-none transition-colors duration-300"
              style={{
                borderColor: "var(--glass-border)",
                background:
                  hovered === card.mode
                    ? `rgba(${card.accent}, 0.12)`
                    : "var(--glass-bg)",
                opacity: dimmed ? 0.55 : 1,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-colors duration-300"
                style={{
                  background: `rgba(${card.accent}, 0.14)`,
                  color: `rgb(${card.accent})`,
                }}
              >
                {card.icon}
              </div>

              <h2 className="font-mono text-sm font-bold uppercase tracking-wider mb-1.5">
                {card.label}
              </h2>
              <p className="font-serif italic text-base text-(--fg) mb-3">
                {card.tagline}
              </p>
              <p className="text-xs text-(--fg-muted) leading-relaxed mb-5">
                {card.subtext}
              </p>

              <span
                className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-300"
                style={{ color: `rgb(${card.accent})` }}
              >
                Enter {card.label}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-(--fg-subtle)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        Pick a lens — you can switch anytime
      </motion.p>
    </motion.div>
  );
};

export default ModeGateway;
