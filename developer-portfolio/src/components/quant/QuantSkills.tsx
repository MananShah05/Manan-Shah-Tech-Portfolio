import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QMSection, QMCard, REVEAL_ITEM, REVEAL_ITEM_RM } from "./QuantPrimitives";

const quantSkillCategories = [
  {
    title: "Quantitative Research & Modeling",
    skills: ["Time Series Analysis", "Volatility (GARCH)", "Statistical Arbitrage", "Regression Analysis", "Mathematical Finance", "Backtesting"],
  },
  {
    title: "Programming & Scientific Computing",
    skills: ["Python", "C++", "SQL", "R", "Pandas", "NumPy", "SciPy"],
  },
  {
    title: "Data Engineering & Systems",
    skills: ["ETL Pipelines", "PostgreSQL", "Time-series Databases", "Docker", "Apache Spark", "Git", "Linux"],
  },
  {
    title: "Machine Learning & AI",
    skills: ["Scikit-Learn", "PyTorch", "TensorFlow", "Feature Engineering", "Reinforcement Learning", "NLP"],
  },
  {
    title: "Analytics & Visualization",
    skills: ["Streamlit", "Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly"],
  },
  {
    title: "Regulatory & Domains",
    skills: ["NISM Series V-A", "NISM Series XIII", "NISM PMS", "Portfolio Management", "Risk Management", "Valuation"],
  },
];

export const QuantSkills: React.FC = () => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;

  return (
    <QMSection
      id="skills"
      eyebrow="TECHNICAL STACK"
      title="A toolkit optimized for analytical precision."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quantSkillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="h-full"
          >
            <QMCard interactive={true} className="h-full flex flex-col justify-between group">
              <div>
                <h3
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="skill-pill px-3 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all duration-300 border border-(--glass-border) bg-(--accent-glow) text-(--fg) hover:border-(--accent) hover:text-(--accent)"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </QMCard>
          </motion.div>
        ))}
      </div>
    </QMSection>
  );
};

export default QuantSkills;
