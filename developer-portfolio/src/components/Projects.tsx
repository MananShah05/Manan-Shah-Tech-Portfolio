import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ShapeGrid from "./ShapeGrid";
import { ArrowUpRight, X, Maximize2, ChevronDown, LayoutGrid, ChevronUp } from "lucide-react";
import { projects, projectsByDomain, type Project, type ProjectDomain } from "../data/projects";

const TEXT_PROBLEM_CONTEXT = "Problem Context";
const TEXT_TECHNICAL_CONTRIBUTIONS = "Technical Contributions";
const TEXT_TECH_STACK = "Tech Stack";
const TEXT_MEASURABLE_IMPACT = "Measurable Impact";

/** How many cards are visible before the viewer opts to see more. */
const INITIAL_VISIBLE = 9;
/** How many additional cards each "Show more" click reveals. */
const SHOW_MORE_STEP = 3;

interface ProjectsProps {
  /** Filter to a single domain. Omitted → show all projects. */
  domain?: ProjectDomain;
  subtitle?: string;
}

export default function Projects({ domain, subtitle }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const list = domain ? projectsByDomain(domain) : projects;

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleList = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;
  const isExpanded = visibleCount >= list.length && list.length > INITIAL_VISIBLE;
  const remaining = list.length - visibleCount;

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative py-12 md:py-16 lg:py-20">
      {/* ShapeGrid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
        <ShapeGrid
          speed={0.3}
          squareSize={48}
          direction="diagonal"
          borderColor="rgba(128,128,128,0.12)"
          hoverFillColor="rgba(45,106,79,0.15)"
          shape="square"
          hoverTrailAmount={2}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeading
          label="Projects"
          title="Intelligent systems, shipped to production."
          subtitle={
            subtitle ??
            "From transformer-based document extraction to published deepfake research — each project represents applied ML solving real-world problems."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleList.map((project, i) => (
            <motion.div
              layoutId={`project-card-${project.title}`}
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                opacity: { duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] },
                layout: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
              }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl p-6 relative overflow-hidden flex flex-col h-full glass-light border"
              style={{ borderColor: "var(--glass-border)" }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              {/* Background gradient hint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <motion.div
                    layoutId={`project-icon-${project.title}`}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5"
                    style={{ color: "var(--accent)" }}
                  >
                    {project.icon}
                  </motion.div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-500 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>

                <motion.h3
                  layoutId={`project-title-${project.title}`}
                  className="font-sans text-xl font-bold mb-3"
                  style={{ color: "var(--fg)" }}
                >
                  {project.title.split(" — ")[0]}
                  <span className="block text-sm font-medium mt-1 opacity-70">
                    {project.title.split(" — ")[1]}
                  </span>
                </motion.h3>

                <p
                  className="text-sm leading-relaxed mb-6 flex-grow"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {project.summary}
                </p>

                <div
                  className="flex flex-wrap gap-2 mt-auto pt-4 border-t"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        backgroundColor: "rgba(26, 26, 24, 0.04)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        backgroundColor: "rgba(26, 26, 24, 0.04)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more / Show all controls — only when there are extra projects.
            Skipping these and scrolling on simply continues to the next section. */}
        {list.length > INITIAL_VISIBLE && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <span className="text-xs font-mono tracking-wider" style={{ color: "var(--fg-subtle)" }}>
              Showing {visibleList.length} of {list.length} projects
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasMore && (
                <>
                  <motion.button
                    onClick={() => setVisibleCount((c) => Math.min(c + SHOW_MORE_STEP, list.length))}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-light border text-sm font-semibold cursor-pointer transition-all duration-300 hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--glass-border)", color: "var(--fg)" }}
                  >
                    Show more
                    <ChevronDown size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => setVisibleCount(list.length)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                  >
                    <LayoutGrid size={16} />
                    Show all ({remaining} more)
                  </motion.button>
                </>
              )}
              {isExpanded && (
                <motion.button
                  onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-light border text-sm font-semibold cursor-pointer transition-all duration-300 hover:border-[var(--accent)]"
                  style={{ borderColor: "var(--glass-border)", color: "var(--fg)" }}
                >
                  Show less
                  <ChevronUp size={16} />
                </motion.button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Modal Backdrop */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/20 dark:bg-black/40"
          />
        )}
      </AnimatePresence>

      {/* Expanded Modal Card */}
      {selectedProject && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-[88px] md:pt-[104px] p-4 md:p-6 pb-6 pointer-events-none">
          <motion.div
            layoutId={`project-card-${selectedProject.title}`}
            className="w-full max-w-6xl max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain glass-light rounded-3xl pointer-events-auto border flex flex-col scrollbar-none"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--glass-border)" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col flex-1 min-h-0"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 md:p-6 border-b backdrop-blur-xl" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--bg)" }}>
                <div className="flex items-center gap-4">
                  <motion.div
                    layoutId={`project-icon-${selectedProject.title}`}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5"
                    style={{ color: "var(--accent)" }}
                  >
                    {selectedProject.icon}
                  </motion.div>
                  <motion.h3
                    layoutId={`project-title-${selectedProject.title}`}
                    className="font-sans text-xl md:text-2xl font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {selectedProject.title.split(" — ")[0]}
                    <span className="block text-sm font-medium mt-1 opacity-70">
                      {selectedProject.title.split(" — ")[1]}
                    </span>
                  </motion.h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} style={{ color: "var(--fg)" }} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 md:p-6 grid lg:grid-cols-12 gap-6 lg:gap-10">
                <div className="lg:col-span-8 space-y-5">
                  <div>
                    <p
                      className="text-[15px] md:text-base leading-relaxed"
                      style={{ color: "var(--fg)", opacity: 0.9 }}
                    >
                      {selectedProject.summary}
                    </p>
                  </div>

                  <div>
                    <span
                      className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      {TEXT_PROBLEM_CONTEXT}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg)", opacity: 0.85 }}>
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <span
                      className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      {TEXT_TECHNICAL_CONTRIBUTIONS}
                    </span>
                    <ul className="space-y-1.5">
                      {selectedProject.contributions.map((c, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "var(--fg)", opacity: 0.85 }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: "var(--accent)", opacity: 0.8 }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                  <div
                    className={`rounded-xl bg-gradient-to-br ${selectedProject.color} border p-4`}
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <span
                      className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-2"
                      style={{ color: "var(--fg)", opacity: 0.7 }}
                    >
                      {TEXT_TECH_STACK}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium"
                          style={{
                            backgroundColor: "rgba(26, 26, 24, 0.05)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--fg)",
                            opacity: 0.85,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedProject.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl border group hover:border-[var(--accent)] transition-colors"
                        style={{ borderColor: "var(--glass-border)", backgroundColor: "rgba(26, 26, 24, 0.02)" }}
                      >
                        <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                          {link.label}
                        </span>
                        <ArrowUpRight size={18} style={{ color: "var(--fg-subtle)" }} className="group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: "var(--accent)/5", borderColor: "var(--glass-border)" }}>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--accent)" }}>
                      {TEXT_MEASURABLE_IMPACT}
                    </span>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--fg)" }}>
                      {selectedProject.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
