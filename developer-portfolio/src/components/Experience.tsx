import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { TrendingUp, Users, BarChart3 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const experiences = [
  {
    role: "Investments & Strategy Intern",
    org: "Mercer LLC",
    period: "Jun 2026 – Present",
    icon: <BarChart3 size={18} />,
    bullets: [
      "Pension Strategy: Strategic advisory and long-term planning for institutional client pension schemes.",
      "Portfolio Intelligence: Advanced analytics and performance attribution modeling to support multi-asset portfolios.",
      "Quant & Alternative Investments: Quantitative research, asset modeling, and valuation analysis across private markets and alternative asset classes.",
      "Research & Client Management: High-impact investment research and presentation deck preparation for senior client stakeholders.",
      "Multi-Asset Allocation Details: Dynamic asset allocation analysis and risk calibration across global equities, fixed income, and real assets.",
    ],
  },
  {
    role: "Data Analytics Intern",
    org: "Stratezic",
    period: "Aug 2025 – Jan 2026",
    icon: <TrendingUp size={18} />,
    bullets: [
      "Designed and implemented Python-based ETL pipelines to extract, clean, and consolidate performance data from multiple structured sources, reducing manual reporting effort by ~40%.",
      "Built structured data transformation routines using Pandas to standardize heterogeneous datasets and prepare analysis-ready tables for downstream reporting and visualization.",
      "Developed interactive KPI dashboards for acquisition, engagement, and retention metrics; conducted cohort analysis to surface actionable growth insights for stakeholders.",
    ],
  },
  {
    role: "Business Development Intern",
    org: "Hirji Logipack",
    period: "Nov 2025 – Dec 2025",
    icon: <Users size={18} />,
    bullets: [
      "Performed advanced Excel-based analysis using PivotTables, VLOOKUP, and INDEX/MATCH to segment market data, evaluate expansion opportunities, and quantify addressable demand.",
      "Built lead scoring models using quantitative segmentation; created Excel dashboards with charts and summary tables to present cost-benefit findings to senior management.",
    ],
  },
];

export default function Experience() {
  const { isDark } = useTheme();
  return (
    <section id="experience" className="relative py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="Experience"
          title="Real roles. Real models. Real impact."
          subtitle="Internships and research that sharpened my ability to ship production-grade AI systems and communicate technical insight to stakeholders."
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-light rounded-3xl p-6 md:p-10 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: "rgba(45, 106, 79, 0.1)", color: "var(--accent)" }}
                  >
                    {exp.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-bold" style={{ color: "var(--fg)" }}>
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: "var(--fg-subtle)" }}>
                        {exp.org}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap transition-all duration-300"
                      style={{
                        backgroundColor: isDark ? "rgba(82, 183, 136, 0.15)" : "rgba(45, 106, 79, 0.08)",
                        borderColor: isDark ? "rgba(82, 183, 136, 0.45)" : "rgba(45, 106, 79, 0.35)",
                        color: isDark ? "#52b788" : "#2d6a4f",
                        boxShadow: isDark ? "0 0 16px rgba(82, 183, 136, 0.25)" : "0 0 10px rgba(45, 106, 79, 0.08)",
                        borderWidth: "1px",
                        borderStyle: "solid"
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, j) => {
                      const colonIdx = bullet.indexOf(": ");
                      const hasHeader = colonIdx !== -1;
                      const header = hasHeader ? bullet.substring(0, colonIdx) : "";
                      const body = hasHeader ? bullet.substring(colonIdx + 2) : bullet;

                      return (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.15 + j * 0.08,
                          }}
                          className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--accent)", opacity: 0.5 }}
                          />
                          {hasHeader ? (
                            <span>
                              <strong style={{ color: "var(--fg)" }}>{header}:</strong> {body}
                            </span>
                          ) : (
                            bullet
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
