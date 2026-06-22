import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * FooterMark — the oversized cinematic "MANAN SHAH" signature that anchors the
 * bottom of every page.
 *
 * Behaviour:
 *  - The full name ALWAYS fits the viewport: a hidden measurer reports the
 *    natural glyph width and we derive a font-size so the line fills (but never
 *    exceeds) the container, re-fitting on resize and after web fonts load.
 *  - No upper shadow. A single blurred shadow copy sits beneath the text and is
 *    masked to be deep/grounded at the baseline and fade out (lose opacity) as
 *    it rises — the cinematic, light-from-below effect.
 *  - Fully token-driven (var(--fg) / var(--accent-glow)) so light/dark themes
 *    resolve automatically, with per-lens typography via `variant`.
 */
type Variant = "swe" | "quant" | "creative";

interface FooterMarkProps {
  variant: Variant;
  /** Defaults to "MANAN SHAH". */
  label?: string;
}

interface VariantStyle {
  text: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  textTransform: CSSProperties["textTransform"];
  fontStyle?: CSSProperties["fontStyle"];
  /** Fraction of container width the line should occupy. */
  fill: number;
  wordSpacing?: string;
}

const VARIANTS: Record<Variant, VariantStyle> = {
  // Software lens — quiet literary serif, italic signature cadence.
  swe: {
    text: "Manan Shah",
    fontFamily: "var(--font-serif)",
    fontWeight: 400,
    letterSpacing: "-0.015em",
    textTransform: "none",
    fontStyle: "italic",
    fill: 0.9,
  },
  // Quant lens — Poppins Bold nameplate.
  quant: {
    text: "MANAN SHAH",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    fill: 0.92,
    wordSpacing: "0.08em",
  },
  // Creative lens — bold display poster type, the most dramatic.
  creative: {
    text: "MANAN SHAH",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    textTransform: "uppercase",
    fill: 0.94,
  },
};

/** Font-size (px) used by the hidden measurer; the visible size is scaled from it. */
const BASE_FONT = 120;

export default function FooterMark({ variant, label }: FooterMarkProps) {
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[variant];
  const text = label ?? v.text;

  const containerRef = useRef<HTMLDivElement>(null);
  const measurerRef = useRef<HTMLSpanElement>(null);
  const naturalWidthRef = useRef(0);
  const [fontSize, setFontSize] = useState(BASE_FONT);

  const refit = useCallback(() => {
    const container = containerRef.current;
    const measurer = measurerRef.current;
    if (!container || !measurer) return;
    // Natural width of the line at BASE_FONT (transform-free layout width).
    const natural = measurer.scrollWidth;
    if (natural > 0) naturalWidthRef.current = natural;
    const available = container.clientWidth * v.fill;
    if (naturalWidthRef.current > 0 && available > 0) {
      setFontSize((BASE_FONT * available) / naturalWidthRef.current);
    }
  }, [v.fill]);

  useLayoutEffect(() => {
    refit();
  }, [refit, text, variant]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => refit());
    ro.observe(container);
    // Web fonts change glyph metrics — re-fit once they're ready.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refit).catch(() => {});
    }
    return () => ro.disconnect();
  }, [refit]);

  const sharedType: CSSProperties = {
    fontFamily: v.fontFamily,
    fontWeight: v.fontWeight,
    letterSpacing: v.letterSpacing,
    textTransform: v.textTransform,
    fontStyle: v.fontStyle,
    wordSpacing: v.wordSpacing,
    whiteSpace: "nowrap",
    lineHeight: 0.9,
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden select-none pointer-events-none flex justify-center"
    >
      {/* Hidden measurer — natural width at BASE_FONT, never painted. */}
      <span
        ref={measurerRef}
        style={{
          ...sharedType,
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          fontSize: BASE_FONT,
          left: -99999,
          top: 0,
        }}
      >
        {text}
      </span>

      <motion.div
        initial={reduceMotion ? false : { y: 32, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-block"
        style={{ fontSize }}
      >
        {/* Main glyphs — clean top-to-bottom neutral gradient, matching the
            shadcn large-name-footer look (from-neutral-700 to-neutral-900). */}
        <span
          style={{
            ...sharedType,
            position: "relative",
            display: "inline-block",
            backgroundImage:
              "linear-gradient(to bottom, #404040 0%, #171717 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
}
