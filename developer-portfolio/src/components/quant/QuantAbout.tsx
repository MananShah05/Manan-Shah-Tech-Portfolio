import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Coffee,
  Layers,
  FlaskConical,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import {
  QMSection,
  QMCard,
  QMChip,
  REVEAL_CONTAINER,
  REVEAL_ITEM,
  REVEAL_ITEM_RM,
} from "./QuantPrimitives";

/* ─────────────────────────────────────────────────────────────────────────
 * QMIdentity — Redesigned About Section (Bento Dashboard Layout)
 *
 * Visual & UX Architecture:
 * - A premium Bento Grid composition (col-span-12 layout).
 * - Left card (col-span-8): "Academic Ledger & Coursework Matrix".
 *   Features a split tab selector between College (DJSCE) and Schooling,
 *   rendering specific metrics (CGPA, DevOps Honors, Board details) and an
 *   in-card coursework chip grid that adjusts dynamically with AnimatePresence.
 * - Right card (col-span-4): "Beyond the Screen" narrative block with ambient
 *   glow.
 * - Bottom row (col-span-12): "Operational Principles". Renders the four key
 *   principles in a horizontal layout resembling a financial system dashboard
 *   or status report.
 * ───────────────────────────────────────────────────────────────────────── */

export interface QMIdentityProps {
  eyebrow?: string;
  title?: string;
}

const PRINCIPLES = [
  {
    icon: <FlaskConical size={16} strokeWidth={1.8} />,
    title: "Research-Driven",
    desc: "Volatility modeling, regression analysis, and empirical testing form the foundation.",
  },
  {
    icon: <Layers size={16} strokeWidth={1.8} />,
    title: "Systems-Oriented",
    desc: "Robust ETL pipelines, data standardization, and clean architecture behind the indicators.",
  },
  {
    icon: <Cpu size={16} strokeWidth={1.8} />,
    title: "Execution-Focused",
    desc: "Transforming strategic models into production software optimized for performance.",
  },
  {
    icon: <ShieldCheck size={16} strokeWidth={1.8} />,
    title: "Quantitative Rigor",
    desc: "Strict risk metrics, drawdown control, and compliance under NISM/AMFI standards.",
  },
];

export const QMIdentity: React.FC<QMIdentityProps> = ({
  eyebrow = "Identity",
  title = "Bridging Research & Finance",
}) => {
  const [eduTab, setEduTab] = useState<"college" | "school">("college");
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;

  return (
    <QMSection id="about" eyebrow={eyebrow} title={title}>
      <motion.div
        variants={REVEAL_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6"
      >
        {/* ── CARD 1: Academic Ledger & Coursework Matrix (col-span-8) ── */}
        <motion.div className="lg:col-span-8 flex flex-col" variants={itemVariants}>
          <QMCard interactive={false} className="w-full flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Corner ambient glow */}
            <div
              className="absolute -top-12 -left-12 w-28 h-28 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--accent-glow), transparent)",
                opacity: 0.25,
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header with selector tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-5" style={{ borderColor: "var(--glass-border)" }}>
                <div>
                  <h4 className="font-serif text-lg font-bold text-(--fg) flex items-center gap-2">
                    <GraduationCap size={18} className="text-(--accent)" />
                    Academic Ledger
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-(--fg-subtle) mt-0.5">
                    Dwarkadas J. Sanghvi College of Engineering
                  </p>
                </div>

                {/* Tab selectors */}
                <div className="flex p-0.5 rounded-lg border bg-(--bg-deep)" style={{ borderColor: "var(--glass-border)" }}>
                  <button
                    type="button"
                    onClick={() => setEduTab("college")}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all duration-200"
                    style={{
                      backgroundColor: eduTab === "college" ? "var(--accent-glow)" : "transparent",
                      color: eduTab === "college" ? "var(--accent)" : "var(--fg-subtle)",
                      border: eduTab === "college" ? "1px solid var(--glass-border)" : "1px solid transparent",
                    }}
                  >
                    B.Tech
                  </button>
                  <button
                    type="button"
                    onClick={() => setEduTab("school")}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all duration-200"
                    style={{
                      backgroundColor: eduTab === "school" ? "var(--accent-glow)" : "transparent",
                      color: eduTab === "school" ? "var(--accent)" : "var(--fg-subtle)",
                      border: eduTab === "school" ? "1px solid var(--glass-border)" : "1px solid transparent",
                    }}
                  >
                    Schooling
                  </button>
                </div>
              </div>

              {/* Dynamic educational ledger content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {eduTab === "college" ? (
                    <motion.div
                      key="college"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Metric scores */}
                      <div className="grid grid-cols-2 gap-4 p-3.5 border rounded-xl bg-(--bg-warm)" style={{ borderColor: "var(--glass-border)" }}>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider block text-(--fg-subtle)">
                            Graduation Year
                          </span>
                          <span className="font-mono text-[14px] font-bold text-(--fg)">2027</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider block text-(--fg-subtle)">
                            CGPA / Honors Score
                          </span>
                          <span className="font-mono text-[14px] font-bold text-(--fg)">
                            8.7 <span className="text-[10px] font-normal text-(--fg-subtle)">B.Tech</span>
                            <span className="mx-2 text-(--glass-border)">|</span>
                            9.5 <span className="text-[10px] font-normal text-(--fg-subtle)">DevOps</span>
                          </span>
                        </div>
                      </div>

                      {/* Coursework list */}
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-2.5 text-(--fg-subtle)">
                          Relevant Coursework Matrix
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Corporate & Personal Finance",
                            "Machine Learning",
                            "Data Structures & Algorithms",
                            "Probability & Statistics",
                            "Honours in DevOps",
                            "Operating Systems",
                            "Database Systems",
                            "Big Data Infrastructure",
                            "AI & Deep Learning",
                          ].map((course) => (
                            <QMChip key={course}>{course}</QMChip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="school"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Metric scores */}
                      <div className="grid grid-cols-2 gap-4 p-3.5 border rounded-xl bg-(--bg-warm)" style={{ borderColor: "var(--glass-border)" }}>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider block text-(--fg-subtle)">
                            Institution
                          </span>
                          <span className="font-sans text-[13px] font-bold text-(--fg) block truncate">
                            S.H. Agarwal Int. School
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider block text-(--fg-subtle)">
                            10th Grade Score
                          </span>
                          <span className="font-mono text-[14px] font-bold text-(--fg)">92.14%</span>
                        </div>
                      </div>

                      {/* Subjects list */}
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-2.5 text-(--fg-subtle)">
                          Primary Subjects
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {["Mathematics", "Physics", "Chemistry", "Computer Studies", "English"].map((subject) => (
                            <QMChip key={subject}>{subject}</QMChip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </QMCard>
        </motion.div>

        {/* ── CARD 2: Beyond the Screen Block (col-span-4) ── */}
        <motion.div className="lg:col-span-4 flex flex-col" variants={itemVariants}>
          <QMCard interactive={true} className="w-full flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient right glow */}
            <div
              className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--accent-glow), transparent)",
                opacity: 0.35,
              }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 border-b pb-4" style={{ borderColor: "var(--glass-border)" }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      borderColor: "var(--glass-border)",
                      backgroundColor: "var(--glass-bg)",
                      color: "var(--accent)",
                    }}
                  >
                    <Coffee size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-(--fg)">
                      Beyond the Screen
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-(--fg-subtle) mt-0.5">
                      Interdisciplinary Focus
                    </p>
                  </div>
                </div>

                <p className="text-[13.5px] leading-[1.65] text-(--fg-muted) text-justify">
                  My interest lies in structural decision-making, behavioral
                  economics, and systems architecture. I value quantitative rigor,
                  statistics, and validation processes, which guide my coding style
                  and research objectives. I believe that premium products are built
                  at the intersection of mathematical model design and robust, scalable backend code.
                </p>
              </div>

              {/* Tagline footer */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-wider text-(--accent) uppercase">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse" />
                <span>Theory meets application</span>
              </div>
            </div>
          </QMCard>
        </motion.div>

        {/* ── CARD 3: Horizontal Operational Principles (col-span-12) ── */}
        <motion.div className="lg:col-span-12" variants={itemVariants}>
          <QMCard interactive={false} className="w-full overflow-hidden relative">
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 border-b pb-3" style={{ borderColor: "var(--glass-border)" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--fg-subtle)">
                  Operational Principles
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent)">
                  Methodological Alignment
                </span>
              </div>

              {/* Horizontal grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRINCIPLES.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 border rounded-xl bg-(--glass-bg) flex flex-col justify-between hover:border-(--accent) transition-colors duration-300"
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 border"
                      style={{
                        backgroundColor: "var(--glass-bg)",
                        borderColor: "var(--glass-border)",
                        color: "var(--accent)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-[12px] mb-1 text-(--fg)">
                        {item.title}
                      </h5>
                      <p className="text-[10.5px] leading-relaxed text-(--fg-muted)">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </QMCard>
        </motion.div>
      </motion.div>
    </QMSection>
  );
};

export default QMIdentity;
