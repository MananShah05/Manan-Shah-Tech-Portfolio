/**
 * Quant Mode — simulated data & instrument constants.
 *
 * ⚠️ ALL VALUES IN THIS FILE ARE SIMULATED for visual texture only.
 * They are NOT real market data and MUST be rendered alongside a
 * "Simulated · Not financial advice" label wherever they are shown
 * (ticker, portfolio snapshot, stat tiles).
 *
 * Note: this file is `.tsx` (not `.ts`) because `DEFAULT_CREDENTIALS`
 * embeds lucide-react icons as JSX elements, which require TSX compilation.
 */
import type { ReactNode } from "react";
import { Shield, Award, GraduationCap } from "lucide-react";

// ─── Types (source of truth: design.md → "Data Models") ──────────────────

export interface TickerItem {
  symbol: string; // e.g. "MES"
  price: string; // e.g. "5,412.25"
  changePct: number; // signed; sign drives up/down color
}

export interface InstrumentInfo {
  ticker: string; // e.g. "MBT"
  name: string; // e.g. "Micro Bitcoin Futures"
  assetClass: string; // e.g. "Crypto", "Energy", "Equity Index", "Metals", "Rates"
}

export interface PortfolioPosition {
  instrument: string;
  weightPct: number;
  pnlPct: number; // signed → drives positive/negative number color
}

export interface Credential {
  title: string;
  org: string;
  status: "verified" | "in-progress" | "completed";
  icon: ReactNode; // lucide-react icon element
  href?: string;
}

// ─── Simulated ticker (SIMULATED) ─────────────────────────────────────────

export const SIMULATED_TICKER: TickerItem[] = [
  { symbol: "MES", price: "5,412.25", changePct: 0.62 },
  { symbol: "MNQ", price: "18,940.0", changePct: 0.81 },
  { symbol: "MCL", price: "78.42", changePct: -0.34 },
  { symbol: "MGC", price: "2,412.6", changePct: 0.41 },
  { symbol: "MBT", price: "64,210", changePct: 2.3 },
  { symbol: "ZN", price: "110-185", changePct: -0.08 },
];

// ─── Instrument knowledge strip ───────────────────────────────────────────

export const INSTRUMENTS: InstrumentInfo[] = [
  { ticker: "MBT", name: "Micro Bitcoin Futures", assetClass: "Crypto" },
  { ticker: "MCL", name: "Micro WTI Crude Oil", assetClass: "Energy" },
  { ticker: "MES", name: "Micro E-mini S&P 500", assetClass: "Equity Index" },
  { ticker: "MGC", name: "Micro Gold Futures", assetClass: "Metals" },
  { ticker: "ZN", name: "10-Year T-Note Futures", assetClass: "Rates" },
];

// ─── Credentials (component default) ──────────────────────────────────────

export const DEFAULT_CREDENTIALS: Credential[] = [
  {
    title: "NISM Series V-A",
    org: "National Institute of Securities Markets — MF Distributors",
    status: "verified",
    icon: <Shield strokeWidth={1.5} size={18} />,
  },
  {
    title: "NISM PMS",
    org: "National Institute of Securities Markets",
    status: "verified",
    icon: <Shield strokeWidth={1.5} size={18} />,
  },
  {
    title: "NISM Series XIII",
    org: "Common Derivatives Certification",
    status: "in-progress",
    icon: <Shield strokeWidth={1.5} size={18} />,
  },
  {
    title: "McKinsey Forward",
    org: "McKinsey & Company",
    status: "completed",
    icon: <Award strokeWidth={1.5} size={18} />,
  },
  {
    title: "Stanford ML",
    org: "Stanford / Coursera — Machine Learning",
    status: "completed",
    icon: <GraduationCap strokeWidth={1.5} size={18} />,
  },
];

// ─── Simulated portfolio snapshot (SIMULATED) ─────────────────────────────
// Convenience default for QMMarkets (Task 6). All values simulated and must be
// rendered with the "Simulated · Not financial advice" label.

export interface PortfolioSnapshot {
  asOf: string;
  positions: PortfolioPosition[];
  totalPnlPct: number;
}

export const SIMULATED_SNAPSHOT: PortfolioSnapshot = {
  asOf: "30 May 2025 · 15:29 IST",
  positions: [
    { instrument: "MES", weightPct: 42, pnlPct: 1.24 },
    { instrument: "MGC", weightPct: 33, pnlPct: 0.58 },
    { instrument: "MCL", weightPct: 25, pnlPct: -0.41 },
  ],
  totalPnlPct: 0.62,
};
