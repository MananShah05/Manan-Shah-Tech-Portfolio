import React, { createContext, useContext, useState, useEffect } from "react";
import { TIMING_ENTER, TIMING_EXIT } from "../transitions";
import html2canvas from "html2canvas";

export type PortfolioMode = "developer" | "creative";
export type TransitionPhase = "idle" | "charge" | "rgb" | "flood" | "reveal";

interface PortfolioModeContextType {
  mode: PortfolioMode;
  transitionPhase: TransitionPhase;
  portalOrigin: { x: number; y: number } | null;
  screenshotSrc: string | null;
  triggerTransition: (origin: { x: number; y: number }) => void;
  isTransitioning: boolean;
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<PortfolioMode>(() => {
    const saved = localStorage.getItem("portfolio-mode");
    return (saved as PortfolioMode) || "developer";
  });
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [portalOrigin, setPortalOrigin] = useState<{ x: number; y: number } | null>(null);
  const [screenshotSrc, setScreenshotSrc] = useState<string | null>(null);
  
  // Track scroll states per mode to restore scroll position
  const [scrollPositions, setScrollPositions] = useState<Record<PortfolioMode, number>>({
    developer: 0,
    creative: 0,
  });

  const isTransitioning = transitionPhase !== "idle";

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    localStorage.setItem("portfolio-mode", newMode);
  };

  const triggerTransition = async (origin: { x: number; y: number }) => {
    if (isTransitioning) return;
    setPortalOrigin(origin);

    const isEnter = mode === "developer";
    const timing = isEnter ? TIMING_ENTER : TIMING_EXIT;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTransitionPhase("reveal"); // Instant crossfade mode
      
      setScrollPositions((prev) => ({ ...prev, [mode]: window.scrollY }));
      const targetMode = isEnter ? "creative" : "developer";
      
      // Scale out/in instantly
      setTimeout(() => {
        setMode(targetMode);
        window.scrollTo(0, scrollPositions[targetMode]);
        setTransitionPhase("idle");
        setPortalOrigin(null);
      }, 200); // 200ms opacity transition
      return;
    }

    // Save current scroll position
    const currentScrollY = window.scrollY;
    setScrollPositions((prev) => ({
      ...prev,
      [mode]: currentScrollY,
    }));

    // PHASE 1 — Charge (0ms)
    setTransitionPhase("charge");

    // Capture viewport screenshot asynchronously during the charge phase
    try {
      const rootEl = document.getElementById("portfolio-root") || document.body;
      const canvas = await html2canvas(rootEl, {
        useCORS: true,
        allowTaint: true,
        scale: 1, // Capture at 1x resolution to keep JS light
        backgroundColor: null,
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/webp", 0.85);
      setScreenshotSrc(dataUrl);
    } catch (e) {
      console.error("Snapshot failed: ", e);
    }

    // PHASE 2 — RGB Split (120ms / 90ms)
    const rgbTime = isEnter ? timing.charge : timing.charge;
    const rgbTimer = setTimeout(() => {
      setTransitionPhase("rgb");
    }, rgbTime);

    // PHASE 3 — Ink Flood (300ms / 230ms)
    const floodTime = isEnter ? 300 : 230;
    const floodTimer = setTimeout(() => {
      setTransitionPhase("flood");
    }, floodTime);

    // Swap mode mid-way through the Ink Flood when fully covered
    const swapTime = isEnter ? 560 : 400; // Midway points of flood timings
    const swapTimer = setTimeout(() => {
      const targetMode = isEnter ? "creative" : "developer";
      setMode(targetMode);
      
      // Restore next mode scroll state inside the cover
      window.scrollTo(0, scrollPositions[targetMode]);
    }, swapTime);

    // PHASE 4 — Reveal (720ms / 560ms)
    const revealTime = isEnter ? (timing.charge + timing.rgbSplit + timing.inkFlood) : (timing.charge + timing.rgbSplit + timing.inkFlood);
    // Wait, let's verify math:
    // Enter timing: charge=120ms, rgb=300ms (ends 420ms), flood=420ms (starts 300ms, ends 720ms).
    // So flood ends at 720ms. Reveal starts at 720ms. Reveal duration: 180ms. Total = 900ms.
    // Exit timing: charge=90ms, rgb=240ms (ends 330ms), flood=330ms (starts 230ms, ends 560ms).
    // So flood ends at 560ms. Reveal starts at 560ms. Reveal duration: 140ms. Total = 700ms.
    const revealTimer = setTimeout(() => {
      setTransitionPhase("reveal");
      setScreenshotSrc(null); // Cleanup snapshot image
    }, revealTime);

    // Complete transition and return to idle (900ms / 700ms)
    const idleTimer = setTimeout(() => {
      setTransitionPhase("idle");
      setPortalOrigin(null);
    }, timing.total);

    return () => {
      clearTimeout(rgbTimer);
      clearTimeout(floodTimer);
      clearTimeout(swapTimer);
      clearTimeout(revealTimer);
      clearTimeout(idleTimer);
    };
  };

  // Synchronize CSS class for theme boundaries
  useEffect(() => {
    const root = document.documentElement;
    if (mode === "creative") {
      root.classList.add("mode-creative");
      root.classList.remove("mode-developer");
    } else {
      root.classList.add("mode-developer");
      root.classList.remove("mode-creative");
    }
  }, [mode]);

  return (
    <PortfolioModeContext.Provider
      value={{
        mode,
        transitionPhase,
        portalOrigin,
        screenshotSrc,
        triggerTransition,
        isTransitioning,
      }}
    >
      {children}
    </PortfolioModeContext.Provider>
  );
};

export const usePortfolioMode = () => {
  const context = useContext(PortfolioModeContext);
  if (!context) {
    throw new Error("usePortfolioMode must be used within a PortfolioProvider");
  }
  return context;
};
