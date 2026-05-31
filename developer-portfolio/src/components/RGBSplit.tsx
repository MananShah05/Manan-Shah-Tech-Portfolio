import React from "react";
import { motion } from "framer-motion";
import { EASING, TIMING_ENTER, TIMING_EXIT } from "../transitions";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

interface RGBSplitProps {
  phase: "idle" | "charge" | "rgb" | "flood" | "reveal";
  screenshotSrc: string | null;
}

export const RGBSplit: React.FC<RGBSplitProps> = ({ phase, screenshotSrc }) => {
  const { mode } = usePortfolioMode();

  // Active during Phase 2 (rgb) and Phase 3 (flood - before mode changes / opacity fades)
  const showSplit = (phase === "rgb" || phase === "flood") && screenshotSrc;

  if (!showSplit) return null;

  const isEnter = mode === "developer"; // Dev -> Creative (starts Dev)
  const duration = isEnter ? TIMING_ENTER.rgbSplit / 1000 : TIMING_EXIT.rgbSplit / 1000;
  
  // Offset directions (opposite on exit)
  const offset = 28;
  const redTargetX = isEnter ? -offset : offset;
  const blueTargetX = isEnter ? offset : -redTargetX; // Opposite of red

  return (
    <div className="fixed inset-0 w-screen h-screen z-[999] pointer-events-none overflow-hidden bg-transparent">
      {/* Red, Green, Blue Filter Defs */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="red-channel">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="green-channel">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      {/* R Layer */}
      <motion.img
        src={screenshotSrc!}
        alt="R Channel"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          mixBlendMode: "screen",
          filter: "url(#red-channel)",
        }}
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: redTargetX,
          opacity: [1, 1, 0],
        }}
        transition={{
          duration,
          ease: EASING.outStrong,
          times: [0, 0.8, 1], // Fade out rapidly at the end of phase 2
        }}
      />

      {/* G Layer */}
      <motion.img
        src={screenshotSrc!}
        alt="G Channel"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          mixBlendMode: "screen",
          filter: "url(#green-channel)",
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 1, 0],
        }}
        transition={{
          duration,
          ease: EASING.outStrong,
          times: [0, 0.8, 1],
        }}
      />

      {/* B Layer */}
      <motion.img
        src={screenshotSrc!}
        alt="B Channel"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          mixBlendMode: "screen",
          filter: "url(#blue-channel)",
        }}
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: blueTargetX,
          opacity: [1, 1, 0],
        }}
        transition={{
          duration,
          ease: EASING.outStrong,
          times: [0, 0.8, 1],
        }}
      />
    </div>
  );
};
export default RGBSplit;
