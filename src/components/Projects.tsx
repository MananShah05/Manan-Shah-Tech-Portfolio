import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ShapeGrid from "./ShapeGrid";
import { ArrowUpRight, Brain, FileText, Search, X, Maximize2, LineChart, TrendingUp, GitBranch, Heart, Calendar, UtensilsCrossed } from "lucide-react";

// project interface
type Project = {
  title: string;
  summary: string;
  problem: string;
  contributions: string[];
  impact: string;
  stack: string[];
  icon: React.ReactNode;
  color: string;
  links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    title: "RiskMatrix — Multi-Asset Portfolio Risk Analytics Dashboard",
    summary:
      "An enterprise-grade portfolio analytics platform that computes volatility, drawdowns, Sharpe ratios, and correlation metrics across multi-asset portfolios using real-time market data.",
    problem:
      "Investors often lack a unified system to evaluate portfolio-wide risk exposure across equities, commodities, fixed income, and forex assets. Existing tools provide fragmented analytics without real-time quantitative insights into volatility, drawdowns, or cross-asset correlations.",
    contributions: [
      "Built a full-stack portfolio analytics platform using Next.js 14, FastAPI, and PostgreSQL.",
      "Designed a quantitative metrics engine using pandas and numpy to compute rolling volatility, Sharpe ratio, cumulative returns, and maximum drawdowns.",
      "Integrated yfinance market data pipelines with asynchronous FastAPI services for real-time portfolio computations.",
      "Developed interactive financial dashboards with Recharts, correlation heatmaps, and risk visualization components.",
      "Implemented scalable async PostgreSQL architecture using SQLAlchemy 2.0 and Supabase.",
    ],
    impact:
      "Enabled real-time multi-asset portfolio risk evaluation with automated quantitative analytics and interactive visualizations for volatility, correlation, and performance assessment.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "SQLAlchemy",
      "pandas",
      "numpy",
      "TailwindCSS",
      "Recharts",
      "React Query",
      "Zustand",
    ],
    icon: <LineChart size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://quant-vault-1.vercel.app/" }
    ],
  },
  {
    title: "Financial Lens — Scenario & Sensitivity Analysis Platform",
    summary:
      "A quantitative analytics platform for stress testing, rolling correlation analysis, and regression-based financial modeling using live market data.",
    problem:
      "Investors often lack accessible tools to evaluate portfolio sensitivity, asset correlation shifts, and market shock scenarios in real time.",
    contributions: [
      "Built a full-stack financial analytics platform using Next.js, FastAPI, and pandas.",
      "Developed stress testing, rolling correlation, and OLS regression engines for quantitative market analysis.",
      "Integrated live financial market data pipelines using Finnhub APIs.",
      "Created interactive analytics dashboards with Recharts for scenario visualization and statistical interpretation.",
    ],
    impact:
      "Enabled real-time quantitative scenario analysis and financial risk evaluation through interactive statistical modeling tools.",
    stack: [
      "Next.js",
      "FastAPI",
      "Python",
      "pandas",
      "statsmodels",
      "Finnhub",
      "Recharts",
      "TailwindCSS",
    ],
    icon: <TrendingUp size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://financial-lens.vercel.app/" }
    ],
  },
  {
    title: "StockIntel — AI-Powered Investment Decision Support System",
    summary:
      "A full-stack financial intelligence platform that combines sentiment analysis, technical indicators, and valuation metrics for smarter stock evaluation.",
    problem:
      "Retail investors often lack access to institutional-grade analytics, struggling to manually synthesize sentiment, technicals, and fundamentals across disjointed tools.",
    contributions: [
      "Built a scalable stock analytics platform using FastAPI and Next.js.",
      "Implemented dynamic evaluation scoring using sentiment, technical momentum, and fundamentals.",
      "Integrated secure Google OAuth authentication with NextAuth and Neon PostgreSQL.",
      "Designed responsive dashboards for stock comparison and watchlist tracking.",
      "Deployed full-stack architecture on Vercel with serverless APIs.",
    ],
    impact:
      "Provided actionable stock insights through unified dashboards, helping users make data-driven investment decisions faster.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Neon", "NextAuth", "TailwindCSS", "Vercel"],
    icon: <FileText size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://stock-intell.vercel.app/" }
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
      { label: "Paper", url: "https://drive.google.com/file/d/18ksc9KRMQ_dCvlaj3sISPSgaqiMPABZz/view?usp=sharing" },
    ],
  },
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
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Under Development", url: "#" }
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
      { label: "Live Link", url: "https://fin-searchh.vercel.app/" }
    ],
  },
  {
    title: "RepoLens AI — AI-Powered Repository Understanding Platform",
    summary:
      "An AI-powered GitHub repository understanding platform that automates the process of explaining complex codebases, summarizing architectures, generating interactive dependency diagrams, and helping developers onboard in minutes instead of days.",
    problem:
      "Onboarding onto large, unfamiliar codebases is slow and manual. Developers spend days reading code, tracing dependencies, and asking teammates for context — a bottleneck that scales poorly across teams and open-source contributions.",
    contributions: [
      "Built an AI-driven codebase analysis engine that parses repository structures and generates architectural summaries automatically.",
      "Designed interactive dependency diagram generation to visually map module relationships and call flows.",
      "Implemented natural language querying over codebases, allowing developers to ask questions and receive contextual explanations.",
      "Optimized the ingestion pipeline to handle large monorepos with thousands of files efficiently.",
    ],
    impact:
      "Reduced developer onboarding time from days to minutes. Enables instant architectural understanding of any public GitHub repository.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "OpenAI", "LangChain", "TailwindCSS"],
    icon: <GitBranch size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://repo-lens-aii.vercel.app/" }
    ],
  },
  {
    title: "Health Tracker AI — Intelligent Personal Health Companion",
    summary:
      "An elegant personal health companion that intelligently connects food logs, sleep patterns, and physical activity to surface actionable, personalized behavioral insights.",
    problem:
      "Most health tracking apps collect data in silos — food, sleep, and exercise are logged independently without cross-domain analysis. Users accumulate data but gain no actionable behavioral insights connecting these dimensions.",
    contributions: [
      "Built an AI-powered health analytics engine that correlates food intake, sleep quality, and exercise patterns to generate personalized insights.",
      "Designed an intuitive logging interface with natural language input for frictionless daily health tracking.",
      "Implemented trend analysis and behavioral pattern detection across multiple health dimensions.",
      "Created a responsive dashboard with interactive visualizations for long-term health metric monitoring.",
    ],
    impact:
      "Transforms passive health data collection into active behavioral coaching. Users receive cross-domain insights connecting diet, sleep, and activity patterns.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "OpenAI", "TailwindCSS", "Recharts"],
    icon: <Heart size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "GitHub", url: "https://github.com/MananShah05/Health-Tracker-AI" }
    ],
  },
  {
    title: "WallCal — Calendar Wallpaper Generator",
    summary:
      "A sleek frontend application that generates beautiful, customizable calendar wallpapers for desktops and mobile devices with modern design aesthetics.",
    problem:
      "Users who want a calendar integrated into their device wallpaper have limited options — most tools produce generic, visually unappealing outputs that don't match modern design standards or personal preferences.",
    contributions: [
      "Built a dynamic calendar rendering engine with multiple layout templates and customization options.",
      "Implemented real-time preview with responsive design for both desktop and mobile wallpaper dimensions.",
      "Designed a clean, modern UI with theme support and export functionality for high-resolution wallpapers.",
      "Optimized rendering performance for smooth real-time customization interactions.",
    ],
    impact:
      "Enables users to create personalized, aesthetically premium calendar wallpapers in seconds with full design control.",
    stack: ["React", "TypeScript", "TailwindCSS", "Canvas API", "Vite"],
    icon: <Calendar size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://wall-cal.vercel.app/" }
    ],
  },
  {
    title: "HungryNow — Premium Food Delivery Platform",
    summary:
      "A premium, high-fidelity, and state-of-the-art food delivery web application featuring immersive UI/UX design, real-time ordering flows, and restaurant discovery.",
    problem:
      "Existing food delivery interfaces often feel generic and utilitarian. There's a gap for a visually premium, highly polished food ordering experience that prioritizes design excellence alongside functional delivery workflows.",
    contributions: [
      "Designed and built a high-fidelity food delivery UI with premium glassmorphism aesthetics and micro-animations.",
      "Implemented restaurant discovery with category filtering, search, and detailed menu browsing.",
      "Built a complete cart and checkout flow with real-time order state management.",
      "Created responsive layouts optimized for both desktop and mobile food ordering experiences.",
    ],
    impact:
      "Demonstrates production-grade frontend engineering with a focus on visual excellence and premium user experience in the food-tech domain.",
    stack: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"],
    icon: <UtensilsCrossed size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://hungry-now-wow.vercel.app/" }
    ],
  },
];

const TEXT_PROBLEM_CONTEXT = "Problem Context";
const TEXT_TECHNICAL_CONTRIBUTIONS = "Technical Contributions";
const TEXT_TECH_STACK = "Tech Stack";
const TEXT_MEASURABLE_IMPACT = "Measurable Impact";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
          subtitle="From transformer-based document extraction to published deepfake research — each project represents applied ML solving real-world problems."
        />

        {/* 3x3 Grid (or rather 1x3 since there are 3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              layoutId={`project-card-${project.title}`}
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                opacity: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
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
            className="w-full max-w-6xl max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain glass rounded-3xl pointer-events-auto border flex flex-col scrollbar-none"
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
