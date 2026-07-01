import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  REVEAL_CONTAINER,
  REVEAL_ITEM,
  REVEAL_ITEM_RM,
  QMLabel,
  QMDataValue,
  QMCard,
} from "./QuantPrimitives";
import { SIMULATED_TICKER, type TickerItem, type MarketQuote } from "./quantData";
import { Activity, RefreshCw, ShoppingCart, Plus, Minus, X } from "lucide-react";

/**
 * QMEntry — opening section of the redesigned Quant lens.
 *
 * Features:
 * - Left column: Eyebrow, headline, description, and status feeds.
 * - Right column: A real-time simulated trading chart (SVG area chart) with
 *   a Live Position & Trade Simulator.
 *   - Users can choose BUY (Long) or SELL (Short).
 *   - Adjustable position size (contracts).
 *   - Place order to see live ticking P&L that updates with chart price.
 *   - Close position to log realized profit/loss.
 * - Ticker tape strip at the bottom.
 */

export interface QMEntryProps {
  ticker?: TickerItem[];
  tickerSpeedSec?: number;
  liveQuotes?: Map<string, MarketQuote>;
  liveChartPrices?: number[];
  isLive?: boolean;
}

const NOMINAL_TICKER_WIDTH = 1600;
const CONTRACT_MULTIPLIER = 2; // Simulated $2 multiplier per index point

interface TradingPosition {
  type: "BUY" | "SELL";
  entryPrice: number;
  size: number;
}



export const QMEntry: React.FC<QMEntryProps> = ({
  ticker = SIMULATED_TICKER,
  tickerSpeedSec = 35,
  liveQuotes,
  liveChartPrices,
  isLive = false,
}) => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const playMarquee = reduce ? false : inView;
  const speed = Math.max(1, Math.round(NOMINAL_TICKER_WIDTH / tickerSpeedSec));

  const displayedTicker = isLive && liveQuotes && liveQuotes.size > 0
    ? Array.from(liveQuotes.entries()).map(([symbol, quote]) => {
        let formattedPrice = quote.price.toLocaleString(undefined, {
          minimumFractionDigits: symbol === "MCL" || symbol === "MGC" ? 2 : 0,
          maximumFractionDigits: symbol === "MCL" || symbol === "MGC" ? 2 : 0,
        });
        if (symbol === "ZN") {
          formattedPrice = quote.price.toFixed(2);
        }
        return {
          symbol,
          price: formattedPrice,
          changePct: parseFloat(quote.changePct.toFixed(2)),
        };
      })
    : ticker;

  // ─── Real-Time Chart Simulation State ─────────────────────────────────────
  const [chartData, setChartData] = useState<number[]>([
    18720, 18745, 18730, 18765, 18750, 18780, 18810, 18790, 18825, 18840,
    18820, 18850, 18875, 18860, 18890, 18915, 18900, 18935, 18948, 18930,
    18965, 18980, 18960, 18995, 19012,
  ]);
  const [currentPrice, setCurrentPrice] = useState<number>(19012);
  const [priceDirection, setPriceDirection] = useState<"up" | "down" | "flat">("flat");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // ─── Position Simulation State ────────────────────────────────────────────
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [orderSize, setOrderSize] = useState<number>(1);
  const [activePosition, setActivePosition] = useState<TradingPosition | null>(null);
  const [realizedBalance, setRealizedBalance] = useState<number>(0);

  // Sync live quotes and chart data when live feed is active
  useEffect(() => {
    if (!isLive || !liveQuotes || !liveChartPrices || liveChartPrices.length === 0) return;

    const liveMnqPrice = liveQuotes.get("MNQ")?.price;
    if (liveMnqPrice !== undefined) {
      const roundedPrice = Math.round(liveMnqPrice);
      if (roundedPrice !== currentPrice) {
        setPriceDirection(roundedPrice > currentPrice ? "up" : roundedPrice < currentPrice ? "down" : "flat");
        setCurrentPrice(roundedPrice);
      }
    }

    setChartData(liveChartPrices);
  }, [isLive, liveQuotes, liveChartPrices, currentPrice]);

  // Update chart data in a random walk simulation
  useEffect(() => {
    if (reduce || isLive) return;

    const interval = setInterval(() => {
      setChartData((prev) => {
        const last = prev[prev.length - 1];
        const step = (Math.random() - 0.49) * 22; // slight positive drift
        const next = Math.round(last + step);
        const boundedNext = Math.max(18600, Math.min(19400, next));

        setCurrentPrice(boundedNext);
        setPriceDirection(boundedNext > last ? "up" : boundedNext < last ? "down" : "flat");

        return [...prev.slice(1), boundedNext];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [reduce, isLive]);

  // Convert raw price points to SVG path coordinates
  const chartWidth = 380;
  const chartHeight = 120; // Slightly shorter to make space for the control panel
  const minVal = Math.min(...chartData) - 20;
  const maxVal = Math.max(...chartData) + 20;
  const range = maxVal - minVal || 1;

  const points = chartData.map((val, idx) => {
    const x = (idx / (chartData.length - 1)) * chartWidth;
    const y = chartHeight - ((val - minVal) / range) * chartHeight;
    return { x, y, price: val };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  // Track hover coordinate
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const fractionalIndex = (mouseX / rect.width) * (chartData.length - 1);
    const closestIdx = Math.max(0, Math.min(chartData.length - 1, Math.round(fractionalIndex)));

    setHoverIndex(closestIdx);
    setHoverPos({
      x: (closestIdx / (chartData.length - 1)) * rect.width,
      y: (1 - (chartData[closestIdx] - minVal) / range) * rect.height,
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Place simulated order
  const handlePlaceOrder = () => {
    setActivePosition({
      type: orderType,
      entryPrice: currentPrice,
      size: orderSize,
    });
  };

  // Close simulated position
  const handleClosePosition = () => {
    if (!activePosition) return;

    const diff = currentPrice - activePosition.entryPrice;
    const pnlMultiplier = activePosition.type === "BUY" ? 1 : -1;
    const tradePnl = diff * activePosition.size * CONTRACT_MULTIPLIER;
    const finalPnl = Math.round(tradePnl * pnlMultiplier);

    setRealizedBalance((prev) => prev + finalPnl);
    setActivePosition(null);
  };

  // Calculate live unrealized P&L
  const getLivePnl = () => {
    if (!activePosition) return 0;
    const diff = currentPrice - activePosition.entryPrice;
    const pnlMultiplier = activePosition.type === "BUY" ? 1 : -1;
    return Math.round(diff * activePosition.size * CONTRACT_MULTIPLIER * pnlMultiplier);
  };

  const livePnl = getLivePnl();
  const livePnlDirection = livePnl > 0 ? "up" : livePnl < 0 ? "down" : "flat";

  return (
    <section ref={sectionRef} id="home" className="relative pt-28 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none select-none opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent)",
        }}
      />

      <motion.div
        variants={REVEAL_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── LEFT COLUMN: Text Copy (col-span-7) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pt-8">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6">
              <QMLabel>Investment &amp; Strategy</QMLabel>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-5 max-w-2xl"
              style={{ color: "var(--fg)" }}
            >
              Modeling risk. Building the systems around the models.
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-(--fg-muted) max-w-xl leading-relaxed mb-6"
            >
              Portfolio risk analytics, scenario &amp; sensitivity modeling, and NLP
              signal fusion — backed by clean, automated data infrastructure.
            </motion.p>

            {/* Live Feed Status Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-(--fg-subtle)"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-(--data-positive) animate-pulse" />
                <span>{isLive ? "Live Connection" : "Active Session"}</span>
              </div>
              <span className="text-(--glass-border)">|</span>
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-(--accent)" />
                <span>{isLive ? "Finnhub API Feed" : "Simulated Latency: 4ms"}</span>
              </div>
              <span className="text-(--glass-border)">|</span>
              <div className="flex items-center gap-1.5">
                <RefreshCw size={11} className="text-(--accent) animate-spin" style={{ animationDuration: "8s" }} />
                <span>HMR Ready</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Live Interactive Chart Card with Order Simulator (col-span-5) ── */}
          <motion.div className="lg:col-span-5 flex" variants={itemVariants}>
            <QMCard interactive={false} className="w-full relative overflow-hidden flex flex-col justify-between p-5 min-h-[460px]">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ borderColor: "var(--glass-border)" }}>
                <div>
                  <h3 className="font-mono text-xs font-bold text-(--fg)">
                    MNQ (Nasdaq-100 Futures)
                  </h3>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-(--fg-subtle)">
                    {isLive ? "Live · QQQ Proxy" : "Real-time Simulation"}
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[16px] font-bold leading-none mb-1 tabular-nums transition-colors duration-300">
                    <QMDataValue
                      value={hoverIndex !== null ? points[hoverIndex].price.toLocaleString() : currentPrice.toLocaleString()}
                      direction={hoverIndex !== null ? "flat" : priceDirection}
                    />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-(--fg-subtle)">
                    {hoverIndex !== null ? `Point ${hoverIndex}` : "Last Price"}
                  </span>
                </div>
              </div>

              {/* Live SVG Chart Frame */}
              <div ref={containerRef} className="relative w-full h-[120px] flex items-center justify-center mb-3">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-full overflow-visible select-none cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="var(--glass-border)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="var(--glass-border)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="var(--glass-border)" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Area gradient under line */}
                  <motion.path
                    d={areaPath}
                    fill="url(#chartGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Price Area Line */}
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Render Entry Price Line if Position Active */}
                  {activePosition && (
                    <line
                      x1={0}
                      y1={chartHeight - ((activePosition.entryPrice - minVal) / range) * chartHeight}
                      x2={chartWidth}
                      y2={chartHeight - ((activePosition.entryPrice - minVal) / range) * chartHeight}
                      stroke={activePosition.type === "BUY" ? "var(--data-positive)" : "var(--data-negative)"}
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      opacity="0.75"
                    />
                  )}

                  {/* Hover Crosshair */}
                  {hoverIndex !== null && (
                    <>
                      {/* Vertical line */}
                      <line
                        x1={hoverPos.x}
                        y1={0}
                        x2={hoverPos.x}
                        y2={chartHeight}
                        stroke="var(--accent)"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                      {/* Horizontal line */}
                      <line
                        x1={0}
                        y1={hoverPos.y}
                        x2={chartWidth}
                        y2={hoverPos.y}
                        stroke="var(--accent)"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                      {/* Anchor Dot */}
                      <circle
                        cx={hoverPos.x}
                        cy={hoverPos.y}
                        r="4"
                        fill="var(--accent)"
                        stroke="var(--bg)"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                </svg>
              </div>

              {/* ─── LIVE POSITION / ORDER SIMULATOR INTERACTION PANEL ─── */}
              <div className="border-t pt-3 mt-1" style={{ borderColor: "var(--glass-border)" }}>
                <AnimatePresence mode="wait">
                  {!activePosition ? (
                    /* Order Entry panel */
                    <motion.div
                      key="order-entry"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-(--fg-subtle) flex items-center gap-1">
                          <ShoppingCart size={11} />
                          Position Simulation
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-(--fg-subtle)">
                          Simulated Balance:{" "}
                          <span
                            className="font-bold tabular-nums"
                            style={{ color: realizedBalance >= 0 ? "var(--data-positive)" : "var(--data-negative)" }}
                          >
                            {realizedBalance >= 0 ? "+" : ""}${realizedBalance.toLocaleString()}
                          </span>
                        </span>
                      </div>

                      {/* Direction selector & size control */}
                      <div className="grid grid-cols-12 gap-3 items-center">
                        {/* BUY / SELL Switch */}
                        <div className="col-span-6 flex p-0.5 rounded-lg border bg-(--bg-deep)" style={{ borderColor: "var(--glass-border)" }}>
                          <button
                            type="button"
                            onClick={() => setOrderType("BUY")}
                            className="flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-md font-bold transition-all duration-200"
                            style={{
                              backgroundColor: orderType === "BUY" ? "var(--accent-glow)" : "transparent",
                              color: orderType === "BUY" ? "var(--accent)" : "var(--fg-subtle)",
                              border: orderType === "BUY" ? "1px solid var(--glass-border)" : "1px solid transparent",
                            }}
                          >
                            BUY (Long)
                          </button>
                          <button
                            type="button"
                            onClick={() => setOrderType("SELL")}
                            className="flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-md font-bold transition-all duration-200"
                            style={{
                              backgroundColor: orderType === "SELL" ? "rgba(217, 117, 89, 0.12)" : "transparent",
                              color: orderType === "SELL" ? "var(--data-negative)" : "var(--fg-subtle)",
                              border: orderType === "SELL" ? "1px solid rgba(217, 117, 89, 0.22)" : "1px solid transparent",
                            }}
                          >
                            SELL (Short)
                          </button>
                        </div>

                        {/* Size selector buttons */}
                        <div className="col-span-6 flex items-center justify-between border rounded-lg p-0.5 bg-(--bg-deep)" style={{ borderColor: "var(--glass-border)" }}>
                          <button
                            type="button"
                            onClick={() => setOrderSize(Math.max(1, orderSize - 1))}
                            className="w-7 h-7 rounded flex items-center justify-center hover:bg-(--glass-hover) transition-colors text-(--fg-subtle)"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs font-bold text-(--fg) tabular-nums">
                            {orderSize} Contract{orderSize > 1 ? "s" : ""}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOrderSize(Math.min(10, orderSize + 1))}
                            className="w-7 h-7 rounded flex items-center justify-center hover:bg-(--glass-hover) transition-colors text-(--fg-subtle)"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Submit Order Button */}
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold border cursor-pointer transition-all duration-200 text-center"
                        style={{
                          borderColor: orderType === "BUY" ? "var(--accent)" : "var(--data-negative)",
                          backgroundColor: orderType === "BUY" ? "var(--accent-glow)" : "rgba(217, 117, 89, 0.12)",
                          color: orderType === "BUY" ? "var(--accent)" : "var(--data-negative)",
                        }}
                      >
                        Submit Simulated Order ({orderType} {orderSize}x)
                      </button>
                    </motion.div>
                  ) : (
                    /* Active position tracking panel */
                    <motion.div
                      key="active-position"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-3 border rounded-xl bg-(--bg-warm) relative overflow-hidden"
                      style={{ borderColor: livePnl >= 0 ? "var(--glass-border)" : "rgba(217, 117, 89, 0.2)" }}
                    >
                      {/* Live flashing glow overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-5 transition-colors duration-300"
                        style={{ backgroundColor: livePnl >= 0 ? "var(--data-positive)" : "var(--data-negative)" }}
                      />

                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded text-[9px] font-mono font-bold border"
                            style={{
                              borderColor: activePosition.type === "BUY" ? "var(--data-positive)" : "var(--data-negative)",
                              backgroundColor: activePosition.type === "BUY" ? "rgba(127, 174, 107, 0.1)" : "rgba(217, 117, 89, 0.1)",
                              color: activePosition.type === "BUY" ? "var(--data-positive)" : "var(--data-negative)",
                            }}
                          >
                            {activePosition.type} ACTIVE
                          </span>
                          <span className="font-mono text-[10px] text-(--fg-subtle) tabular-nums">
                            {activePosition.size} Contract{activePosition.size > 1 ? "s" : ""} @ {activePosition.entryPrice.toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleClosePosition}
                          className="w-5 h-5 rounded-full flex items-center justify-center bg-(--glass-bg) hover:bg-(--glass-hover) transition-colors border text-(--fg-subtle)"
                          style={{ borderColor: "var(--glass-border)" }}
                        >
                          <X size={10} />
                        </button>
                      </div>

                      {/* Live Ticking PnL Row */}
                      <div className="flex items-end justify-between relative z-10">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider block text-(--fg-subtle)">
                            Unrealized P&amp;L
                          </span>
                          <div className="font-mono text-xl font-bold leading-none mt-1 tabular-nums">
                            <QMDataValue
                              value={`${livePnl >= 0 ? "+" : ""}$${livePnl.toLocaleString()}`}
                              direction={livePnlDirection}
                            />
                          </div>
                        </div>

                        {/* Close position trigger button */}
                        <button
                          type="button"
                          onClick={handleClosePosition}
                          className="px-3.5 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold border cursor-pointer bg-(--bg-deep) transition-colors hover:border-(--accent) text-(--fg)"
                          style={{ borderColor: "var(--glass-border)" }}
                        >
                          Close Position
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center justify-between border-t pt-2.5 mt-2.5 text-[9px] font-mono text-(--fg-subtle) uppercase tracking-wider">
                <span>Volatility: 14.8%</span>
                <span>Realized Balance: ${realizedBalance.toLocaleString()}</span>
              </div>
            </QMCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker-tape strip — opening bell on scroll-into-view */}
      <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        <div className="mt-10 border-y py-2.5" style={{ borderColor: "var(--glass-border)" }}>
          <Marquee speed={speed} gradient={false} play={playMarquee} pauseOnHover>
            {displayedTicker.map((item, i) => {
              const direction =
                item.changePct > 0 ? "up" : item.changePct < 0 ? "down" : "flat";
              const sign = item.changePct > 0 ? "+" : "";
              return (
                <span key={`${item.symbol}-${i}`} className="mx-6 inline-flex items-baseline gap-2">
                  <span className="font-mono text-xs text-(--fg-subtle)">{item.symbol}</span>
                  <span className="font-mono text-xs text-(--fg-muted) tabular-nums">{item.price}</span>
                  <QMDataValue
                    value={`${sign}${item.changePct}%`}
                    direction={direction}
                    className="text-xs"
                  />
                </span>
              );
            })}
          </Marquee>
        </div>

        {/* Mandatory simulated-data disclaimer, adjacent to the ticker */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-mono text-[10px] uppercase tracking-wider text-(--fg-subtle) mt-3">
            {isLive
              ? "Live data via Finnhub (proxied via ETFs: MES→SPY, MNQ→QQQ, MCL→USO, MGC→GLD, MBT→BTC, ZN→TLT) · Not financial advice"
              : "Simulated · Not financial advice"}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default QMEntry;
