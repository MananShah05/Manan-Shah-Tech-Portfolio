import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  QMSection,
  QMCard,
  QMLabel,
  QMChip,
  QMStatusDot,
  QMDataValue,
  REVEAL_CONTAINER,
  REVEAL_ITEM,
  REVEAL_ITEM_RM,
} from "./QuantPrimitives";
import {
  INSTRUMENTS,
  SIMULATED_SNAPSHOT,
  type InstrumentInfo,
  type PortfolioPosition,
} from "./quantData";

/* ─────────────────────────────────────────────────────────────────────────
 * Component 3: QMMarkets (NEW bento) — Task 6
 *
 * 12-col bento: Futures Experience card (span-7), Mock Portfolio Snapshot
 * (span-5, live pulsing dot + asOf timestamp + disclaimer), and a full-width
 * instrument knowledge strip (MBT / MCL / MES / MGC / ZN).
 *
 * Layout collapses to a single column below 768px (base grid-cols-1, bento
 * spans only apply at md+ via the `md:col-span-*` literals below). All P&L
 * numbers are colored solely by sign(pnlPct) through QMDataValue. Snapshot
 * data is SIMULATED and always rendered with the mandatory disclaimer.
 * ───────────────────────────────────────────────────────────────────────── */

const DISCLAIMER = "Simulated · Not financial advice";

/** Snapshot shape mirrors design.md QMMarketsProps.snapshot (and quantData's
 *  PortfolioSnapshot). */
export interface QMMarketsSnapshot {
  asOf: string;
  positions: PortfolioPosition[];
  totalPnlPct: number;
}

export interface QMMarketsProps {
  /** Instrument knowledge strip; defaults to MBT/MCL/MES/MGC/ZN. */
  instruments?: InstrumentInfo[];
  /** SIMULATED snapshot; rendered with mandatory disclaimer. */
  snapshot?: QMMarketsSnapshot;
}

/** Short experience blurbs keyed by the asset class of each instrument. */
const FUTURES_HIGHLIGHTS: { label: string; body: string }[] = [
  {
    label: "Micro Futures",
    body: "Hands-on with CME micro contracts — equity index, metals, energy, crypto, and rates — sized for disciplined, low-notional risk practice.",
  },
  {
    label: "Risk Discipline",
    body: "Position sizing, stop placement, and exposure budgeting framed around drawdown tolerance rather than raw directional bets.",
  },
  {
    label: "Cross-Asset View",
    body: "Reading correlation and regime shifts across asset classes to understand how a multi-instrument book behaves under stress.",
  },
];

export const QMMarkets: React.FC<QMMarketsProps> = ({
  instruments = INSTRUMENTS,
  snapshot = SIMULATED_SNAPSHOT,
}) => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;

  return (
    <QMSection id="markets" eyebrow="MARKETS & INSTRUMENTS" title="Futures, framed by risk.">
      <motion.div
        variants={REVEAL_CONTAINER}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Futures Experience — span 7 */}
        <motion.div variants={itemVariants} className="md:col-span-7">
          <QMCard className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <QMLabel>Futures Experience</QMLabel>
              <QMStatusDot tone="neutral" label="Practice book" />
            </div>
            <p className="text-(--fg-muted) leading-relaxed mb-6 max-w-xl">
              Active across micro futures as a structured way to study market
              microstructure, volatility regimes, and risk control — not as a
              prediction game.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-auto">
              {FUTURES_HIGHLIGHTS.map((h) => (
                <div key={h.label}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--accent) mb-2">
                    {h.label}
                  </div>
                  <p className="text-sm text-(--fg-muted) leading-relaxed">{h.body}</p>
                </div>
              ))}
            </div>
          </QMCard>
        </motion.div>

        {/* Mock Portfolio Snapshot — span 5 */}
        <motion.div variants={itemVariants} className="md:col-span-5">
          <QMCard className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <QMLabel>Mock Portfolio Snapshot</QMLabel>
              <QMStatusDot tone="live" label="Live" />
            </div>
            <div className="font-mono text-[10px] text-(--fg-subtle) tracking-wider mb-5">
              As of {snapshot.asOf}
            </div>

            <div className="space-y-3 flex-1">
              {snapshot.positions.map((p) => {
                const dir = p.pnlPct >= 0 ? "up" : "down";
                const formatted = `${p.pnlPct > 0 ? "+" : ""}${p.pnlPct.toFixed(2)}%`;
                return (
                  <div key={p.instrument} className="flex items-center justify-between">
                    <span className="font-mono text-sm text-(--fg)">{p.instrument}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-(--fg-subtle) tabular-nums">
                        {p.weightPct}%
                      </span>
                      <QMDataValue value={formatted} direction={dir} className="text-sm" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total P&L */}
            <div
              className="flex items-center justify-between mt-5 pt-4 border-t"
              style={{ borderColor: "var(--glass-border)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--fg-subtle)">
                Total P&amp;L
              </span>
              <QMDataValue
                value={`${snapshot.totalPnlPct > 0 ? "+" : ""}${snapshot.totalPnlPct.toFixed(2)}%`}
                direction={snapshot.totalPnlPct >= 0 ? "up" : "down"}
                className="text-sm font-bold"
              />
            </div>

            <p className="font-mono text-[10px] text-(--fg-subtle) mt-3">{DISCLAIMER}</p>
          </QMCard>
        </motion.div>

        {/* Instrument knowledge strip — full width */}
        <motion.div variants={itemVariants} className="md:col-span-12">
          <QMCard interactive={false}>
            <div className="flex items-center justify-between mb-5">
              <QMLabel>Instrument Coverage</QMLabel>
              <QMChip tone="accent">{instruments.length} contracts</QMChip>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {instruments.map((inst) => (
                <div
                  key={inst.ticker}
                  className="rounded-xl p-4 border"
                  style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)" }}
                >
                  <div className="font-mono text-lg font-bold text-(--accent) tracking-tight">
                    {inst.ticker}
                  </div>
                  <div className="text-sm text-(--fg) mt-1 leading-snug">{inst.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-(--fg-subtle) mt-2">
                    {inst.assetClass}
                  </div>
                </div>
              ))}
            </div>
          </QMCard>
        </motion.div>
      </motion.div>
    </QMSection>
  );
};

export default QMMarkets;
