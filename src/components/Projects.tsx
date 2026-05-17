import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ShapeGrid from "./ShapeGrid";
import { ArrowUpRight, Brain, FileText, Search } from "lucide-react";

const projects = [
  {
    title: "InsureDoc v2 — NLP-Powered Insurance Document Intelligence",
    summary:
      "An end-to-end NLP system that extracts, validates, and structures data from insurance claim documents using transformer models and custom entity recognition.",
    problem:
      "Insurance claim forms arrived in mixed formats — scanned PDFs, images, handwritten notes — creating bottlenecks and delaying payouts by days.",
    contributions: [
      "Built an OCR + transformer pipeline using Tesseract and fine-tuned BERT for domain-specific entity extraction on insurance documents.",
      "Implemented confidence scoring and validation rules to flag low-certainty extractions, achieving 94% field-level accuracy.",
      "Designed a FastAPI backend with async processing queues, handling 500+ documents per hour on commodity hardware.",
      "Created a Streamlit dashboard for claims adjusters to review extractions, annotate corrections, and export structured data.",
    ],
    impact:
      "Reduced average claim processing time by 70% and achieved 88% straight-through processing rate.",
    stack: ["Python", "FastAPI", "Transformers", "PostgreSQL", "Tesseract", "Streamlit"],
    icon: <FileText size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "GitHub", url: "#" },
      { label: "Live Demo", url: "#" }
    ],
  },
  {
    title: "DeepGuard — Deepfake Detection in Indian Media",
    summary:
      "A research-driven deepfake detection system trained on Indian media datasets, combining facial landmark analysis with frequency-domain signal processing.",
    problem:
      "Deepfake content targeting Indian public figures was rising, but existing detection models performed poorly on Indian facial features and low-resolution media.",
    contributions: [
      "Curated a dataset of 12,000+ real and synthetic Indian media samples for training and evaluation.",
      "Developed a hybrid CNN + frequency-analysis model that detects artifacts invisible to standard facial recognition systems.",
      "Published findings on detection accuracy improvements for low-resolution and compressed video formats.",
      "Built a web interface for uploading media and receiving confidence scores with explainable heatmap visualizations.",
    ],
    impact:
      "Achieved 91% detection accuracy on Indian media benchmarks.",
    stack: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "TensorFlow"],
    icon: <Brain size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Paper", url: "#" },
      { label: "GitHub", url: "#" }
    ],
  },
  {
    title: "FinSearch — Semantic Search for Financial Documents",
    summary:
      "A semantic search engine for financial reports and regulatory filings, enabling natural language queries over thousands of unstructured PDFs.",
    problem:
      "Analysts spent hours manually searching through annual reports and filings. Keyword search missed context and semantic relationships.",
    contributions: [
      "Built a document ingestion pipeline that chunks, embeds, and indexes financial PDFs into a vector database using sentence-transformers.",
      "Implemented hybrid search combining dense vector similarity with sparse BM25 scoring for high-recall retrieval.",
      "Designed a React + FastAPI frontend with real-time query suggestions, citation highlighting, and relevance scoring.",
      "Optimized embedding inference to run on CPU-only infrastructure, eliminating GPU costs entirely.",
    ],
    impact:
      "Cut document research time from hours to seconds. Deployed with sub-200ms query latency.",
    stack: ["Python", "FastAPI", "Vector DB", "Transformers", "React", "Tailwind"],
    icon: <Search size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [
      { label: "GitHub", url: "#" }
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
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
          label="04 — Projects"
          title="Intelligent systems, shipped to production."
          subtitle="From transformer-based document extraction to published deepfake research — each project represents applied ML solving real-world problems."
        />

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="glass-light rounded-3xl p-6 md:p-10 group cursor-default"
            >
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(26, 26, 24, 0.03)", color: "var(--accent)" }}
                    >
                      {project.icon}
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-bold" style={{ color: "var(--fg)" }}>
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                    {project.summary}
                  </p>

                  <div className="mb-5">
                    <span
                      className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      Problem
                    </span>
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--fg-subtle)" }}>
                      {project.problem}
                    </p>
                  </div>

                  <div className="mb-5">
                    <span
                      className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      Technical Contributions
                    </span>
                    <ul className="mt-2 space-y-2">
                      {project.contributions.map((c, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--fg-subtle)" }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-6">
                    <span className="font-medium" style={{ color: "var(--fg-subtle)" }}>Impact:</span>
                    <span className="font-medium" style={{ color: "var(--fg)" }}>
                      {project.impact}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.links?.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -2 }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-mono font-medium transition-colors"
                        style={{ color: "var(--fg)" }}
                      >
                        {link.label}
                        <ArrowUpRight size={14} style={{ color: "var(--accent)" }} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${project.color} border p-6 mb-6`}
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                        style={{ color: "var(--fg-subtle)" }}
                      >
                        Tech Stack
                      </span>
                      <ArrowUpRight
                        size={16}
                        style={{ color: "var(--fg-subtle)" }}
                        className="group-hover:text-[var(--accent)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300"
                          style={{
                            backgroundColor: "rgba(26, 26, 24, 0.03)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--fg-muted)",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-5 space-y-3"
                    style={{ backgroundColor: "rgba(26, 26, 24, 0.015)", border: "1px solid var(--glass-border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--secondary)", opacity: 0.6 }} />
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--taupe)", opacity: 0.4 }} />
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)", opacity: 0.4 }} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full" style={{ backgroundColor: "rgba(26, 26, 24, 0.08)" }} />
                      <div className="h-2 w-4/5 rounded-full" style={{ backgroundColor: "rgba(26, 26, 24, 0.08)" }} />
                      <div className="h-2 w-3/5 rounded-full" style={{ backgroundColor: "rgba(26, 26, 24, 0.08)" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="h-8 rounded-lg" style={{ backgroundColor: "rgba(26, 26, 24, 0.05)" }} />
                      <div className="h-8 rounded-lg" style={{ backgroundColor: "rgba(26, 26, 24, 0.05)" }} />
                      <div className="h-8 rounded-lg" style={{ backgroundColor: "rgba(26, 26, 24, 0.05)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
