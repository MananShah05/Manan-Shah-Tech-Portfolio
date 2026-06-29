import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FlaskConical, GraduationCap, Coffee, User, Layers, Rocket } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const principles = [
  {
    icon: <FlaskConical size={16} strokeWidth={1.7} />,
    title: "Research-Driven",
    desc: "Approaching problems with analytical depth, experimentation, and a strong emphasis on continuous learning and iteration.",
  },
  {
    icon: <User size={16} strokeWidth={1.7} />,
    title: "Human-Centered",
    desc: "Designing systems with clarity, usability, and meaningful real-world interaction at the core of the experience.",
  },
  {
    icon: <Layers size={16} strokeWidth={1.7} />,
    title: "Systems-Oriented",
    desc: "Building with scalability, maintainability, and long-term architectural thinking in mind.",
  },
  {
    icon: <Rocket size={16} strokeWidth={1.7} />,
    title: "Deployment-Focused",
    desc: "Transforming ideas into production-ready systems optimized for practical implementation and real-world usage.",
  },
];

export default function About() {
  const [activeEdu, setActiveEdu] = useState<'college' | 'school' | null>(null);
  const { isDark } = useTheme();

  return (
    <section id="about" className="relative py-10 md:py-16 about-core-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeading
          label="ABOUT ME"
          title="Bridging Research & Humanity"
          subtitle="I build production NLP pipelines, research deepfake methodologies, and believe that the best engineers are intensely curious about the world outside of code."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-6 md:mt-8">
          {/* ── LEFT: Narrative Text ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Background block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center glass-light" style={{ color: "var(--accent)" }}>
                  <GraduationCap size={16} />
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--fg)" }}>
                  Background
                </h3>
              </div>
              <p className="text-[16px] leading-relaxed mb-4 font-medium text-balance" style={{ color: "var(--fg)" }}>
                I am a final-year B.Tech Information Technology engineer at DJSCE, Mumbai, graduating in 2027.
              </p>

              <div className="text-[10px] font-mono tracking-wider mb-2 opacity-65 flex items-center gap-1.5" style={{ color: "var(--fg-muted)" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse" />
                <span>Hover or click badges to view institution & coursework</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 text-[10px] sm:text-[12px] font-mono tracking-tighter sm:tracking-wide select-none whitespace-nowrap" style={{ color: "var(--fg-muted)" }}>
                {/* College Badge */}
                <div
                  onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setActiveEdu('college'); }}
                  onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setActiveEdu(null); }}
                  onClick={() => setActiveEdu(activeEdu === 'college' ? null : 'college')}
                  className={`glass-light px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 border flex-1 sm:flex-none ${activeEdu === 'college' ? 'border-(--accent) bg-(--accent)/4' : 'border-(--glass-border) hover:border-(--accent)/30 hover:bg-(--accent)/1'
                    }`}
                >
                  B.Tech CGPA: <span className="font-semibold" style={{ color: "var(--fg)" }}>8.7</span> <span className="mx-1 opacity-50">|</span> Honours in DevOps: <span className="font-semibold" style={{ color: "var(--fg)" }}>9.5</span>
                </div>

                {/* School Badge */}
                <div
                  onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setActiveEdu('school'); }}
                  onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setActiveEdu(null); }}
                  onClick={() => setActiveEdu(activeEdu === 'school' ? null : 'school')}
                  className={`glass-light px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 border flex-1 sm:flex-none ${activeEdu === 'school' ? 'border-(--accent) bg-(--accent)/4' : 'border-(--glass-border) hover:border-(--accent)/30 hover:bg-(--accent)/1'
                    }`}
                >
                  10th Grade: <span className="font-semibold" style={{ color: "var(--fg)" }}>92.14%</span>
                </div>
              </div>

              {/* Interactive Detail Popover/Card */}
              <AnimatePresence mode="wait">
                {activeEdu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden mb-3"
                  >
                    <div
                      className="glass-light rounded-xl p-4 border relative overflow-hidden"
                      style={{ borderColor: "var(--glass-border)" }}
                    >
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none"
                        style={{
                          backgroundColor: activeEdu === 'college' ? "var(--accent)" : "var(--secondary)",
                          opacity: 0.12
                        }}
                      />

                      {/* Creative Glassmorphic Timeframe Badge */}
                      <div
                        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono tracking-wider border select-none transition-all duration-300 pointer-events-none"
                        style={{
                          backgroundColor: activeEdu === 'college'
                            ? (isDark ? "rgba(82, 183, 136, 0.15)" : "rgba(45, 106, 79, 0.08)")
                            : (isDark ? "rgba(251, 146, 60, 0.15)" : "rgba(196, 92, 38, 0.08)"),
                          borderColor: activeEdu === 'college'
                            ? (isDark ? "rgba(82, 183, 136, 0.45)" : "rgba(45, 106, 79, 0.35)")
                            : (isDark ? "rgba(251, 146, 60, 0.45)" : "rgba(196, 92, 38, 0.35)"),
                          color: activeEdu === 'college'
                            ? (isDark ? "#52b788" : "#2d6a4f")
                            : (isDark ? "#fb923c" : "#c45c26"),
                          boxShadow: activeEdu === 'college'
                            ? (isDark ? "0 0 16px rgba(82, 183, 136, 0.25)" : "0 0 10px rgba(45, 106, 79, 0.08)")
                            : (isDark ? "0 0 16px rgba(251, 146, 60, 0.25)" : "0 0 10px rgba(196, 92, 38, 0.08)")
                        }}
                      >
                        {activeEdu === 'college' ? "2023 - 2027" : "2020 - 2021"}
                      </div>

                      {activeEdu === 'college' ? (
                        <div>
                          <div className="flex items-start gap-2 mb-1.5 pr-28 sm:pr-32">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                            <h4 className="font-sans font-bold text-[13px] leading-tight" style={{ color: "var(--fg)" }}>
                              Dwarkadas J Sanghvi College of Engineering
                            </h4>
                          </div>
                          <p className="text-[10px] font-mono uppercase tracking-wider mb-2 mt-3" style={{ color: "var(--fg-subtle)" }}>
                            Relevant Coursework
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {[
                              "Operating Systems", "Data Structures", "Analysis of Algorithms",
                              "Artificial Intelligence", "Machine Learning", "Computer Networks",
                              "Advanced Java", "Formal Languages & Automata", "Big Data Infrastructure",
                              "Digital Signal Processing", "Corporate & Personal Finance", "Infrastructure Security"
                            ].map(course => (
                              <span
                                key={course}
                                className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                  backgroundColor: "rgba(26, 26, 24, 0.025)",
                                  border: "1px solid var(--glass-border)",
                                  color: "var(--fg-muted)"
                                }}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start gap-2 mb-1.5 pr-28 sm:pr-32">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                            <h4 className="font-sans font-bold text-[13px] leading-tight" style={{ color: "var(--fg)" }}>
                              Savitridevi Hariram Agarwal International School
                            </h4>
                          </div>
                          <div className="flex gap-4 mb-2 text-[10px] font-mono">
                            <div>
                              <span style={{ color: "var(--fg-subtle)" }}>Board: </span>
                              <span className="font-semibold" style={{ color: "var(--fg)" }}>IGCSE</span>
                            </div>
                          </div>
                          <p className="text-[10px] font-mono uppercase tracking-wider mb-2 mt-3" style={{ color: "var(--fg-subtle)" }}>
                            Key Focus Subjects
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {["Physics", "Chemistry", "Biology", "Computers"].map(subject => (
                              <span
                                key={subject}
                                className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                  backgroundColor: "rgba(26, 26, 24, 0.025)",
                                  border: "1px solid var(--glass-border)",
                                  color: "var(--fg-muted)"
                                }}
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="text-[14px] leading-relaxed text-justify" style={{ color: "var(--fg-muted)" }}>
                My work sits at the intersection of applied machine learning and product engineering. Beyond the algorithms, I am driven by a deep curiosity for how people actually interact with technology, striving to design systems that feel distinctly human and intuitive.
              </p>
            </motion.div>

            {/* Approach block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center glass-light" style={{ color: "var(--accent)" }}>
                  <Coffee size={16} />
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--fg)" }}>
                  Beyond the Screen
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-justify" style={{ color: "var(--fg-muted)" }}>
                Beyond technical development, I maintain a strong interest in strategic thinking, behavioral economics, and interdisciplinary problem-solving. I value analytical depth, structured decision-making, and continuous learning, which influence both my engineering approach and research mindset. I believe impactful technology is built not only through technical expertise, but also through understanding human behavior, systems, and real-world context.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Core Principles Glass Panel ── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="core-panel relative overflow-hidden rounded-3xl border">
              <div
                className="absolute -top-16 right-6 w-44 h-44 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(27, 67, 50, 0.18), rgba(27, 67, 50, 0))" }}
              />
              <div className="core-panel-content px-5 py-6 md:px-6 md:py-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] whitespace-nowrap keep-nowrap" style={{ color: "var(--taupe)" }}>
                    Core Principles
                  </span>
                  <span className="h-px w-12 sm:w-20 shrink-0" style={{ backgroundColor: "rgba(26, 26, 24, 0.12)" }} />
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.28em] whitespace-nowrap keep-nowrap" style={{ color: "var(--fg-subtle)" }}>
                    Design Philosophy
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {principles.map((item) => (
                    <div
                      key={item.title}
                      className="core-block -m-px border p-4 md:p-5"
                      style={{ borderColor: "var(--glass-border)" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mb-2.5"
                        style={{
                          backgroundColor: "rgba(27, 67, 50, 0.08)",
                          color: "var(--accent)",
                          border: "1px solid rgba(27, 67, 50, 0.12)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <h4 className="font-sans font-semibold text-[13px] mb-1" style={{ color: "var(--fg)" }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
