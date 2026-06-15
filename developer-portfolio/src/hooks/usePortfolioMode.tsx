import React, { createContext, useContext, useRef, useState, useEffect } from "react";

export type PortfolioMode = "swe" | "quant" | "creative";
// Clean dip transition: cover (fade to bg) -> swap underneath -> reveal (fade out).
export type TransitionPhase = "idle" | "cover" | "reveal";
export type TransitionSignature = "terminal" | "candlestick" | "ink";

export const SIGNATURE_BY_MODE: Record<PortfolioMode, TransitionSignature> = {
  swe: "terminal",
  quant: "candlestick",
  creative: "ink",
};

export const MODE_ORDER: PortfolioMode[] = ["swe", "quant", "creative"];

// Transition timing (ms) — kept short and subtle.
const COVER_MS = 220; // fade-to-bg
const SWAP_AT = 220; // swap mode while fully covered
const REVEAL_AT = 240; // begin fade-out
const REVEAL_MS = 250; // fade-out duration
const TOTAL_MS = REVEAL_AT + REVEAL_MS; // ~490ms

const STORAGE_KEY = "portfolio-mode";

// Migrate the legacy binary value ("developer") to the new ternary scheme.
function readStoredMode(): PortfolioMode | null {
  const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (!raw) return null;
  if (raw === "developer") return "swe";
  if (raw === "swe" || raw === "quant" || raw === "creative") return raw;
  return null;
}

interface PortfolioModeContextType {
  mode: PortfolioMode;
  /** False until the visitor has chosen a lens at the Mode Gateway. */
  hasEntered: boolean;
  /** Select a mode from the gateway (no transition — gateway handles its own reveal). */
  enterMode: (target: PortfolioMode) => void;
  /** Re-open the gateway. */
  resetEntry: () => void;
  transitionPhase: TransitionPhase;
  /** Signature of the mode being transitioned TO (or the active mode when idle). */
  transitionSignature: TransitionSignature;
  /** Duration (ms) of the cover fade — exposed so the overlay can match. */
  coverMs: number;
  revealMs: number;
  /**
   * Trigger an in-app mode switch with the clean dip transition.
   * If `target` is omitted, cycles to the next mode.
   */
  triggerTransition: (origin: { x: number; y: number }, target?: PortfolioMode) => void;
  isTransitioning: boolean;
  quantTheme: "dark" | "light";
  toggleQuantTheme: () => void;
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = readStoredMode();
  const [mode, setModeState] = useState<PortfolioMode>(stored ?? "swe");
  const [hasEntered, setHasEntered] = useState<boolean>(stored !== null);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [pendingMode, setPendingMode] = useState<PortfolioMode>(mode);

  const [quantTheme, setQuantThemeState] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quant-theme");
      if (stored === "light") return "light";
    }
    return "dark";
  });

  const toggleQuantTheme = () => {
    setQuantThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("quant-theme", next);
      } catch {
        /* storage may be unavailable */
      }
      return next;
    });
  };

  const scrollPositions = useRef<Record<PortfolioMode, number>>({
    swe: 0,
    quant: 0,
    creative: 0,
  });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isTransitioning = transitionPhase !== "idle";
  const transitionSignature = SIGNATURE_BY_MODE[isTransitioning ? pendingMode : mode];

  const persistMode = (m: PortfolioMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* storage may be unavailable — non-fatal */
    }
  };

  const enterMode = (target: PortfolioMode) => {
    setPendingMode(target);
    persistMode(target);
    setHasEntered(true);
    requestAnimationFrame(() => window.scrollTo(0, scrollPositions.current[target] ?? 0));
  };

  const resetEntry = () => setHasEntered(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const triggerTransition = (_origin: { x: number; y: number }, target?: PortfolioMode) => {
    if (isTransitioning) return;

    const resolved =
      target && target !== mode
        ? target
        : MODE_ORDER[(MODE_ORDER.indexOf(mode) + 1) % MODE_ORDER.length];
    if (resolved === mode) return;

    setPendingMode(resolved);
    scrollPositions.current[mode] = window.scrollY;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    clearTimers();

    if (prefersReducedMotion) {
      persistMode(resolved);
      window.scrollTo(0, scrollPositions.current[resolved] ?? 0);
      return;
    }

    // PHASE — cover (fade overlay in)
    setTransitionPhase("cover");

    // Swap underlying mode while fully covered.
    const swapTimer = setTimeout(() => {
      persistMode(resolved);
      window.scrollTo(0, scrollPositions.current[resolved] ?? 0);
    }, SWAP_AT);

    // PHASE — reveal (fade overlay out)
    const revealTimer = setTimeout(() => setTransitionPhase("reveal"), REVEAL_AT);

    // Back to idle.
    const idleTimer = setTimeout(() => setTransitionPhase("idle"), TOTAL_MS);

    timers.current = [swapTimer, revealTimer, idleTimer];
  };

  useEffect(() => () => clearTimers(), []);

  // Sync DOM hooks: data-mode attribute (token scoping) + legacy mode classes.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    root.classList.toggle("mode-creative", mode === "creative");
    root.classList.toggle("mode-swe", mode === "swe");
    root.classList.toggle("mode-quant", mode === "quant");
    root.classList.toggle("mode-developer", mode === "swe");

    if (mode === "quant") {
      root.setAttribute("data-quant-theme", quantTheme);
    } else {
      root.removeAttribute("data-quant-theme");
    }
  }, [mode, quantTheme]);

  return (
    <PortfolioModeContext.Provider
      value={{
        mode,
        hasEntered,
        enterMode,
        resetEntry,
        transitionPhase,
        transitionSignature,
        coverMs: COVER_MS,
        revealMs: REVEAL_MS,
        triggerTransition,
        isTransitioning,
        quantTheme,
        toggleQuantTheme,
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
