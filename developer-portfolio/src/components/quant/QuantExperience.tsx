import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TrendingUp, Briefcase, Calendar, ChevronRight, BarChart3, Users } from "lucide-react";
import {
  QMSection,
  QMCard,
  QMChip,
  QMDataValue,
  REVEAL_CONTAINER,
  REVEAL_ITEM,
  REVEAL_ITEM_RM,
} from "./QuantPrimitives";

/* ─────────────────────────────────────────────────────────────────────────
 * QMExperience — Industry internships in the Quant register.
 *
 * Reorganized layout for three experiences:
 * 1. Mercer LLC (Intern - Investments & Strategy)
 * 2. Stratezic (Data Analytics Intern)
 * 3. Hirji Logipack (Business Development Intern)
 *
 * Interactive Split Timeline Dashboard:
 * - Left Panel (col-span-4): Company selector cards showing company name,
 *   role, short period, and status badge.
 * - Right Panel (col-span-8): Detail display showcasing the selected
 *   internship: large role headers, custom highlight metrics, core
 *   accomplishment bullets, and technical chips.
 * ───────────────────────────────────────────────────────────────────────── */

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  shortPeriod: string;
  icon: React.ReactNode;
  tag: string;
  metricValue: string;
  metricLabel: string;
  bullets: string[];
  techStack: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Investments & Strategy Intern",
    org: "Mercer LLC",
    period: "Jun 2026 – Present",
    shortPeriod: "JUN 2026",
    icon: <BarChart3 size={16} />,
    tag: "Active",
    metricValue: "Strategy",
    metricLabel: "Pension strategy, portfolio intelligence, quant research, and alternative investments",
    bullets: [
      "Pension Strategy: Strategic advisory and long-term planning for institutional client pension schemes.",
      "Portfolio Intelligence: Advanced analytics and performance attribution modeling to support multi-asset portfolios.",
      "Quant & Alternative Investments: Quantitative research, asset modeling, and valuation analysis across private markets and alternative asset classes.",
      "Research & Client Management: High-impact investment research and presentation deck preparation for senior client stakeholders.",
      "Multi-Asset Allocation Details: Dynamic asset allocation analysis and risk calibration across global equities, fixed income, and real assets.",
    ],
    techStack: ["Pension Strategy", "Portfolio Intelligence", "Client Management", "Research", "Quant & Alternatives", "Asset Allocation"],
  },
  {
    role: "Data Analytics Intern",
    org: "Stratezic",
    period: "Aug 2025 – Jan 2026",
    shortPeriod: "AUG 2025",
    icon: <TrendingUp size={16} />,
    tag: "Completed",
    metricValue: "~40%",
    metricLabel: "Reduction in manual reporting effort achieved by automating ETL pipelines",
    bullets: [
      "Designed and implemented Python-based ETL pipelines to extract, clean, and consolidate performance data from multiple structured sources, reducing manual reporting effort by ~40%.",
      "Built structured data transformation routines using Pandas to standardize heterogeneous datasets and prepare analysis-ready tables for downstream reporting and visualization.",
      "Developed interactive KPI dashboards for acquisition, engagement, and retention metrics; conducted cohort analysis to surface actionable growth insights for stakeholders.",
    ],
    techStack: ["Python", "Pandas", "ETL Pipelines", "KPI Dashboards", "Cohort Analysis"],
  },
  {
    role: "Business Development Intern",
    org: "Hirji Logipack",
    period: "Nov 2025 – Dec 2025",
    shortPeriod: "NOV 2025",
    icon: <Users size={16} />,
    tag: "Completed",
    metricValue: "Excel",
    metricLabel: "Advanced data modeling using VLOOKUP, INDEX/MATCH, and PivotTables",
    bullets: [
      "Performed advanced Excel-based analysis using PivotTables, VLOOKUP, and INDEX/MATCH to segment market data, evaluate expansion opportunities, and quantify addressable demand.",
      "Built lead scoring models using quantitative segmentation; created Excel dashboards with charts and summary tables to present cost-benefit findings to senior management.",
    ],
    techStack: ["Excel Analytics", "Market Segmentation", "Lead Scoring", "Cost-Benefit Analysis"],
  },
];

export const QMExperience: React.FC = () => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeExp = EXPERIENCES[activeIdx];

  return (
    <QMSection
      id="experience"
      eyebrow="Experience"
      title="Real Roles. Industrial Implementation."
    >
      {/* ── Chapter header ── */}
      <motion.div
        variants={itemVariants}
        className="mb-12 flex items-center gap-3"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border"
          style={{
            borderColor: "var(--glass-border)",
            backgroundColor: "var(--glass-bg)",
            color: "var(--accent)",
          }}
        >
          <Briefcase size={16} />
        </div>
        <div>
          <h3
            className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: "var(--fg-subtle)" }}
          >
            Chapter III
          </h3>
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Where research meets production — industrial application of analytical systems.
          </p>
        </div>
      </motion.div>

      {/* ── Interactive Split Experience Dashboard ── */}
      <motion.div
        variants={REVEAL_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6"
      >
        {/* Left Column: Company Selector Tabs (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {EXPERIENCES.map((exp, i) => {
            const isActive = i === activeIdx;
            const isRoleActive = exp.tag === "Active";

            return (
              <button
                key={exp.org}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="w-full text-left p-4 md:p-5 border rounded-2xl transition-all duration-300 flex flex-col gap-2 relative overflow-hidden group cursor-pointer"
                style={{
                  borderColor: isActive ? "var(--accent)" : "var(--glass-border)",
                  backgroundColor: isActive ? "var(--accent-glow)" : "var(--glass-bg)",
                  color: "var(--fg)",
                  boxShadow: isActive ? "0 0 20px var(--accent-glow)" : "none",
                }}
              >
                {/* Status Badge & Period */}
                <div className="flex items-center justify-between w-full relative z-10">
                  <span className="font-mono text-[10px] tracking-wider text-(--fg-subtle) flex items-center gap-1">
                    <Calendar size={11} />
                    {exp.shortPeriod}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider border"
                    style={{
                      borderColor: isRoleActive ? "var(--accent)" : "var(--glass-border)",
                      backgroundColor: isRoleActive ? "var(--accent-glow)" : "var(--glass-bg)",
                      color: isRoleActive ? "var(--accent)" : "var(--fg-subtle)",
                    }}
                  >
                    {isRoleActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-(--accent)"
                        style={{
                          animation: reduce
                            ? "none"
                            : "qm-pulse 1.8s ease-in-out infinite",
                        }}
                      />
                    )}
                    {exp.tag}
                  </span>
                </div>

                <div className="relative z-10 mt-1 flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-(--fg)">
                      {exp.org}
                    </h3>
                    <p className="text-[11px] font-medium text-(--fg-subtle) mt-0.5">
                      {exp.role}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-300"
                    style={{
                      transform: isActive ? "translateX(2px)" : "none",
                      color: isActive ? "var(--accent)" : "var(--fg-subtle)",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Details Card Display (col-span-8) */}
        <motion.div className="lg:col-span-8 flex" variants={itemVariants}>
          <QMCard interactive={false} className="w-full flex flex-col justify-between overflow-hidden relative min-h-[420px]">
            {/* Ambient top-right glow */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--accent-glow), transparent)",
                opacity: 0.25,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 flex flex-col h-full justify-between gap-6"
              >
                <div>
                  {/* Job details header block */}
                  <div className="border-b pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "var(--glass-border)" }}>
                    <div>
                      <h4 className="font-sans text-xl md:text-2xl font-bold text-(--fg)">
                        {activeExp.role}
                      </h4>
                      <p className="text-sm font-medium text-(--fg-subtle) mt-0.5">
                        @ {activeExp.org}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold tabular-nums border"
                      style={{
                        backgroundColor: "var(--glass-bg)",
                        borderColor: "var(--glass-border)",
                        color: "var(--fg-subtle)",
                      }}
                    >
                      {activeExp.period}
                    </span>
                  </div>

                  {/* Two-column content layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left sub-column: Accomplishments list (col-span-8) */}
                    <div className="md:col-span-8">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3 text-(--fg-subtle)">
                        Core Deliverables
                      </p>
                      <ul className="space-y-3.5">
                        {activeExp.bullets.map((bullet, j) => {
                          const colonIdx = bullet.indexOf(": ");
                          const hasHeader = colonIdx !== -1;
                          const header = hasHeader ? bullet.substring(0, colonIdx) : "";
                          const body = hasHeader ? bullet.substring(colonIdx + 2) : bullet;

                          return (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-[13.5px] leading-relaxed text-(--fg-muted)"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-(--accent)"
                                style={{ opacity: 0.65 }}
                              />
                              {hasHeader ? (
                                <span>
                                  <strong style={{ color: "var(--fg)" }}>{header}:</strong> {body}
                                </span>
                              ) : (
                                bullet
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Right sub-column: Metric Highlight Box (col-span-4) */}
                    <div className="md:col-span-4 space-y-4">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3 text-(--fg-subtle)">
                          Quant Highlight
                        </p>
                        <div
                          className="p-4 border rounded-xl bg-(--glass-bg)"
                          style={{ borderColor: "var(--glass-border)" }}
                        >
                          <div className="text-[28px] font-mono font-bold leading-none mb-1.5 flex items-baseline gap-1.5">
                            <QMDataValue value={activeExp.metricValue} direction={activeExp.metricValue.includes("~") ? "up" : "flat"} />
                          </div>
                          <p className="text-[10px] leading-normal text-(--fg-muted)">
                            {activeExp.metricLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack chips */}
                <div className="border-t pt-4" style={{ borderColor: "var(--glass-border)" }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] mb-2.5 block text-(--fg-subtle)">
                    Methodology & Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.techStack.map((tech) => (
                      <QMChip key={tech}>{tech}</QMChip>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </QMCard>
        </motion.div>
      </motion.div>
    </QMSection>
  );
};

export default QMExperience;
