import React, { useEffect, useRef } from "react";
import { EASING, TIMING_ENTER, TIMING_EXIT } from "../transitions";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

interface InkFloodProps {
  phase: "idle" | "charge" | "rgb" | "flood" | "reveal";
  origin: { x: number; y: number } | null;
}

export const InkFlood: React.FC<InkFloodProps> = ({ phase, origin }) => {
  const { mode } = usePortfolioMode();
  const overlayRef = useRef<HTMLDivElement>(null);
  const activeAnimationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (!origin || !overlayRef.current) return;
    const element = overlayRef.current;
    const isEnter = mode === "creative"; // Swap has occurred when flood runs
    const timing = isEnter ? TIMING_ENTER : TIMING_EXIT;

    if (phase === "flood") {
      // PHASE 3 — Ink Flood (WAAPI clip-path expansion)
      if (activeAnimationRef.current) {
        activeAnimationRef.current.cancel();
      }

      // Reset opacity and animate circle clip-path
      element.style.opacity = "1";
      const anim = element.animate(
        [
          { clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` },
          { clipPath: `circle(150% at ${origin.x}px ${origin.y}px)` },
        ],
        {
          duration: isEnter ? TIMING_ENTER.inkFlood : TIMING_EXIT.inkFlood,
          fill: "forwards",
          easing: EASING.inOutStrongCss,
        }
      );

      activeAnimationRef.current = anim;
    } else if (phase === "reveal") {
      // PHASE 4 — Reveal (WAAPI fade out)
      if (activeAnimationRef.current) {
        activeAnimationRef.current.cancel();
      }

      const anim = element.animate(
        [
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: isEnter ? TIMING_ENTER.reveal : TIMING_EXIT.reveal,
          fill: "forwards",
          easing: EASING.outStrongCss,
        }
      );

      anim.onfinish = () => {
        element.style.opacity = "0";
      };

      activeAnimationRef.current = anim;
    }

    return () => {
      // Cleanup on unmount or phase change to prevent memory leaks
      if (activeAnimationRef.current) {
        activeAnimationRef.current.cancel();
      }
    };
  }, [phase, origin, mode]);

  if (phase === "idle" || !origin) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none"
      style={{
        backgroundColor: "var(--bg)", // Dynamic color scoped to theme
        opacity: 0,
        clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`,
      }}
    />
  );
};
