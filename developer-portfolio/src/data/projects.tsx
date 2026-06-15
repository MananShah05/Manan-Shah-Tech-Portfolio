import React from "react";
import {
  Brain,
  FileText,
  Search,
  LineChart,
  TrendingUp,
  GitBranch,
  Heart,
  Calendar,
  UtensilsCrossed,
} from "lucide-react";

export type ProjectDomain = "swe" | "quant";

export type Project = {
  title: string;
  domain: ProjectDomain;
  summary: string;
  problem: string;
  contributions: string[];
  impact: string;
  stack: string[];
  /** Methodology / focus chips surfaced in the Quant terminal view. */
  methods: string[];
  icon: React.ReactNode;
  color: string;
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "RiskMatrix — Multi-Asset Portfolio Risk Analytics Dashboard",
    domain: "quant",
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
    methods: ["Rolling Vol", "Max Drawdown", "Sharpe", "Pearson Corr"],
    icon: <LineChart size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [{ label: "Live Link", url: "https://quant-vault-1.vercel.app/" }],
  },
  {
    title: "Financial Lens — Scenario & Sensitivity Analysis Platform",
    domain: "quant",
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
    stack: ["Next.js", "FastAPI", "Python", "pandas", "statsmodels", "Finnhub", "Recharts", "TailwindCSS"],
    methods: ["OLS Regression", "Stress Test", "Rolling Corr", "β Exposure"],
    icon: <TrendingUp size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [{ label: "Live Link", url: "https://financial-lens.vercel.app/" }],
  },
  {
    title: "StockIntel — AI-Powered Investment Decision Support System",
    domain: "quant",
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
    methods: ["RSI", "MACD", "NLP Sentiment", "Valuation"],
    icon: <FileText size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [{ label: "Live Link", url: "https://stock-intell.vercel.app/" }],
  },
  {
    title: "FinSearch — Semantic Search for Financial Documents",
    domain: "quant",
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
    impact: "Cut document research time from hours to seconds. Deployed with sub-200ms query latency.",
    stack: ["Python", "FastAPI", "Vector DB", "Transformers", "React", "Tailwind"],
    methods: ["Dense Embeddings", "BM25", "Hybrid Retrieval"],
    icon: <Search size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [{ label: "Live Link", url: "https://fin-searchh.vercel.app/" }],
  },
  {
    title: "DeepGuard — Deepfake Detection in Indian Media",
    domain: "swe",
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
    impact: "Achieved 91% detection accuracy on Indian media benchmarks.",
    stack: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "TensorFlow"],
    methods: ["CNN", "Frequency Analysis", "Facial Landmarks"],
    icon: <Brain size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/18ksc9KRMQ_dCvlaj3sISPSgaqiMPABZz/view?usp=sharing" },
    ],
  },
  {
    title: "InsureDoc v2 — NLP-Powered Insurance Document Intelligence",
    domain: "swe",
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
    impact: "Reduced average claim processing time by 70% and achieved 88% straight-through processing rate.",
    stack: ["Python", "FastAPI", "Transformers", "PostgreSQL", "Tesseract", "Streamlit"],
    methods: ["BERT", "OCR", "Entity Extraction"],
    icon: <FileText size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [{ label: "Under Development", url: "#" }],
  },
  {
    title: "RepoLens AI — AI-Powered Repository Understanding Platform",
    domain: "swe",
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
    methods: ["AST Parsing", "LLM", "RAG", "Dependency Graph"],
    icon: <GitBranch size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [{ label: "Live Link", url: "https://repo-lens-aii.vercel.app/" }],
  },
  {
    title: "Health Tracker AI — Intelligent Personal Health Companion",
    domain: "swe",
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
    methods: ["Trend Analysis", "LLM Insights", "Pattern Detection"],
    icon: <Heart size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [{ label: "GitHub", url: "https://github.com/MananShah05/Health-Tracker-AI" }],
  },
  {
    title: "WallCal — Calendar Wallpaper Generator",
    domain: "swe",
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
    methods: ["Canvas Rendering", "Responsive UI"],
    icon: <Calendar size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [{ label: "Live Link", url: "https://wall-cal.vercel.app/" }],
  },
  {
    title: "HungryNow — Premium Food Delivery Platform",
    domain: "swe",
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
    methods: ["State Management", "Glassmorphism UI", "Responsive"],
    icon: <UtensilsCrossed size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [{ label: "Live Link", url: "https://hungry-now-wow.vercel.app/" }],
  },
];

export const projectsByDomain = (domain: ProjectDomain) =>
  projects.filter((p) => p.domain === domain);
