import React from "react";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

/**
 * Clean, subtle mode-switch overlay.
 * Fades a solid panel (the current --bg) in over ~220ms, the mode swaps
 * underneath while covered, then fades out over ~250ms. No chromatic split,
 * no DOM screenshot — just a quiet dip to background.
 */
export const ModeTransition: React.FC = () => {
  const { transitionPhase, coverMs, revealMs } = usePortfolioMode();

  if (transitionPhase === "idle") return null;

  const covered = transitionPhase === "cover";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        backgroundColor: "var(--bg)",
        opacity: covered ? 1 : 0,
        transition: `opacity ${covered ? coverMs : revealMs}ms ease`,
        willChange: "opacity",
      }}
    />
  );
};

export default ModeTransition;
