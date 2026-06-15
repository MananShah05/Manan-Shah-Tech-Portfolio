import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Easing, Transition, Variants } from "framer-motion";

/** ease-out-expo cubic-bezier control points. */
export const EASE_OUT_EXPO: Easing = [0.23, 1, 0.32, 1];

/** Hover spring (framer-motion driven, NOT CSS transitions on transform). */
export const HOVER_SPRING: Transition = { type: "spring", stiffness: 280, damping: 28 };

/** Scroll-into-view reveal container: stagger children 60–100ms. */
export const REVEAL_CONTAINER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Reveal item: 400–500ms upward fade on ease-out-expo. */
export const REVEAL_ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

/** Reduced-motion variants: opacity only, no translate, no stagger delay. */
export const REVEAL_ITEM_RM: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

/* ─────────────────────────────────────────────────────────────────────────
 * Shared primitives (Task 2.2)
 * Section scaffold, cards, labels, chips, status dots, and data values in the
 * redesigned amber/obsidian register. Styling helpers (.qm-section, .qm-card,
 * .qm-pos, .qm-neg, .qm-live-dot) live in src/index.css — used, not redefined.
 * ───────────────────────────────────────────────────────────────────────── */

/** Literal span classes so Tailwind's source scan keeps them (no dynamic strings). */
const SPAN_CLASS: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

/** Section wrapper: obsidian/island bg, overflow hidden, optional 80px top/bottom
 *  gradient fades, py-32, max-w-[1400px] inner container, optional min-h-[100dvh].
 *  Wires up the scroll-into-view staggered reveal (REVEAL_CONTAINER). */
export interface QMSectionProps {
  id: string;
  /** Mono eyebrow label, e.g. "INVESTMENT & STRATEGY". */
  eyebrow?: string;
  /** Optional display heading rendered by the section itself. */
  title?: ReactNode;
  /** Disable the 80px top/bottom gradient fades (default false). */
  noFades?: boolean;
  /** When true, applies min-h-[100dvh] (NEVER h-screen). */
  fullHeight?: boolean;
  className?: string;
  children: ReactNode;
}

export const QMSection: React.FC<QMSectionProps> = ({
  id,
  eyebrow,
  title,
  noFades = false,
  fullHeight = false,
  className = "",
  children,
}) => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;
  // When fades are disabled we drop .qm-section (its ::before/::after draw the
  // 80px fades) and reproduce just the island background + clipping.
  const shellClass = noFades ? "relative overflow-hidden bg-(--bg)" : "qm-section";

  return (
    <section
      id={id}
      className={`${shellClass} py-32 ${fullHeight ? "min-h-[100dvh]" : ""} ${className}`.trim()}
    >
      <motion.div
        variants={REVEAL_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        {(eyebrow || title) && (
          <div className="mb-10">
            {eyebrow && (
              <motion.div variants={itemVariants}>
                <QMLabel>{eyebrow}</QMLabel>
              </motion.div>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-3"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
        <motion.div variants={itemVariants}>{children}</motion.div>
      </motion.div>
    </section>
  );
};

/** rounded-2xl card; framer spring hover lift (HOVER_SPRING) + amber border via
 *  CSS — NEVER a CSS transition on transform. Optional 12-col bento span and an
 *  `interactive` flag to disable the hover motion. */
export interface QMCardProps {
  /** grid column span on the 12-col bento (1–12). */
  span?: number;
  /** Disable hover motion (e.g. for static info panels). Defaults to enabled. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export const QMCard: React.FC<QMCardProps> = ({
  span,
  interactive = true,
  className = "",
  children,
}) => {
  const reduce = useReducedMotion();
  const spanClass = span ? SPAN_CLASS[span] ?? "" : "";
  // Reduced motion → opacity-only hover (no translate). Normal → spring lift.
  const whileHover = interactive ? (reduce ? { opacity: 0.92 } : { y: -6 }) : undefined;

  return (
    <motion.div
      whileHover={whileHover}
      transition={HOVER_SPRING}
      className={`qm-card p-6 ${spanClass} ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
};

/** Mono uppercase micro-label with tracking. */
export interface QMLabelProps {
  children: ReactNode;
  className?: string;
}

export const QMLabel: React.FC<QMLabelProps> = ({ children, className = "" }) => (
  <span
    className={`font-mono text-[10px] uppercase tracking-[0.3em] text-(--fg-subtle) ${className}`.trim()}
  >
    {children}
  </span>
);

/** Amber methodology / tag chip. */
export interface QMChipProps {
  children: ReactNode;
  tone?: "default" | "accent";
}

export const QMChip: React.FC<QMChipProps> = ({ children, tone = "default" }) => (
  <span
    className="inline-block font-mono text-[10px] px-2 py-1 rounded-md border whitespace-nowrap"
    style={
      tone === "accent"
        ? { borderColor: "var(--accent)", background: "var(--accent-glow)", color: "var(--accent)" }
        : {
            borderColor: "var(--glass-border)",
            background: "var(--accent-glow)",
            color: "var(--fg-muted)",
          }
    }
  >
    {children}
  </span>
);

/** Status dot. `live` pulses via .qm-live-dot (CSS pauses it under reduced
 *  motion); other tones render a static colored dot. Color never leaks to the
 *  optional label, which stays subtle/mono. */
export interface QMStatusDotProps {
  tone?: "live" | "positive" | "negative" | "neutral";
  label?: string;
}

export const QMStatusDot: React.FC<QMStatusDotProps> = ({ tone = "live", label }) => {
  const isLive = tone === "live";
  const dotColor =
    tone === "negative"
      ? "var(--data-negative)"
      : tone === "neutral"
        ? "var(--fg-subtle)"
        : "var(--data-positive)"; // live + positive → sage green

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`w-1.5 h-1.5 rounded-full ${isLive ? "qm-live-dot" : ""}`}
        style={isLive ? undefined : { background: dotColor }}
      />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-(--fg-subtle)">
          {label}
        </span>
      )}
    </span>
  );
};

/** Renders a numeric value with positive/negative color applied ONLY to the
 *  number span (never to surrounding text). `up` → .qm-pos, `down` → .qm-neg,
 *  `flat`/undefined → no color. */
export interface QMDataValueProps {
  value: string | number;
  direction?: "up" | "down" | "flat";
  className?: string;
}

export const QMDataValue: React.FC<QMDataValueProps> = ({ value, direction, className = "" }) => {
  const colorClass = direction === "up" ? "qm-pos" : direction === "down" ? "qm-neg" : "";
  return (
    <span className={`font-mono tabular-nums ${colorClass} ${className}`.trim()}>{value}</span>
  );
};
