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
  Stethoscope,
  Recycle,
  Film,
  Cpu,
  Shirt,
  BarChart3,
  Waves,
  Building,
  Compass,
  Terminal,
  Users,
  Layers,
  Percent,
  Radar,
  Activity,
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
    links: [
      { label: "Live Link", url: "https://risk-matrix1.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Risk-Matrix" },
    ],
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
    links: [
      { label: "Live Link", url: "https://financial-lens.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Financial-Lens" },
    ],
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
    links: [
      { label: "Live Link", url: "https://stock-intell.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/StockIntel" },
    ],
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
    links: [
      { label: "Live Link", url: "https://fin-searchh.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Fin_Search" },
    ],
  },
  {
    title: "Vantage — Institutional Market Intelligence Platform",
    domain: "quant",
    summary:
      "An institutional-grade market intelligence platform that computes multi-period returns, volatility analytics, momentum triggers, technical indicators, and correlation matrices on demand.",
    problem:
      "Investors lack a single, fast surface to review cross-asset performance, risk, and technical signals. Pulling returns, volatility, momentum, and correlations together usually means stitching multiple disconnected tools.",
    contributions: [
      "Built a server-side analytics engine that computes multi-period returns, volatility, and momentum triggers on demand.",
      "Implemented a live correlation matrix and relative-strength analysis across equities, bonds, REITs, gold, and FX.",
      "Integrated Yahoo Finance market data with on-demand, server-executed calculations for an always-fresh report.",
      "Designed a cinematic, scroll-driven 'intelligence review' report UI with market movers and asset-allocation views.",
    ],
    impact:
      "Delivers an on-demand institutional market report — returns, risk, momentum, and correlations — in a single coherent surface.",
    stack: ["Next.js", "TypeScript", "Python", "Yahoo Finance", "pandas", "numpy", "TailwindCSS"],
    methods: ["Multi-Period Returns", "Volatility", "Momentum", "Correlation Matrix"],
    icon: <BarChart3 size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://vantage-vg.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Vantage" },
    ],
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
      { label: "GitHub", url: "https://github.com/MananShah05?tab=repositories" },
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
    links: [
      { label: "Under Development", url: "#" },
      { label: "GitHub", url: "https://github.com/MananShah05?tab=repositories" },
    ],
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
    links: [
      { label: "Live Link", url: "https://repo-lens-aii.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/RepoLens-AI" },
    ],
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
    links: [
      { label: "Live Link", url: "https://wall-cal.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05?tab=repositories" },
    ],
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
    links: [
      { label: "Live Link", url: "https://hungry-now-wow.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/HungryNow" },
    ],
  },
  {
    title: "MediFlow — Cloud Hospital Management System",
    domain: "swe",
    summary:
      "A cloud-based Hospital Management System that connects patients, doctors, nurses, and administrators through a single secure, role-aware platform.",
    problem:
      "Hospitals juggle disconnected tools for appointments, patient records, and staff coordination. The result is data silos, scheduling conflicts, and slow access to critical information across roles.",
    contributions: [
      "Built role-based dashboards for patients, doctors, nurses, and administrators with scoped permissions and views.",
      "Implemented appointment scheduling, patient record management, and staff coordination workflows in a unified interface.",
      "Designed secure authentication and access control to protect sensitive medical data across user roles.",
      "Engineered a responsive, accessible UI that keeps clinical workflows fast on both desktop and mobile.",
    ],
    impact:
      "Unified fragmented hospital workflows into one secure platform, streamlining coordination between patients and care teams.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS", "Node.js"],
    methods: ["RBAC", "Scheduling", "Records Mgmt"],
    icon: <Stethoscope size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://medi-floww.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/MediFlow" },
    ],
  },
  {
    title: "Rekindle — Local Repair-Economy Marketplace",
    domain: "swe",
    summary:
      "A local marketplace that connects owners of broken household appliances with verified nearby repair technicians — encouraging repair over disposal to cut e-waste.",
    problem:
      "Working appliances are often discarded because finding a trustworthy local technician is hard. This drives avoidable electronic waste and unnecessary replacement costs for households.",
    contributions: [
      "Built a location-based matching system that pairs appliance owners with verified nearby technicians.",
      "Implemented technician verification, service listings, and a booking flow for repair requests.",
      "Designed a clean marketplace UI with discovery, filtering, and request-tracking for both sides of the market.",
      "Focused the product on sustainability — framing repair as the default over replacement.",
    ],
    impact:
      "Promotes repair over disposal, helping reduce e-waste and saving households the cost of replacing repairable appliances.",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
    methods: ["Geo Matching", "Marketplace", "Verification"],
    icon: <Recycle size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://rekindlee.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Rekindle" },
    ],
  },
  {
    title: "RigForge — PC Build Configurator & Thermal Analysis",
    domain: "swe",
    summary:
      "A next-gen PC building platform with real-time thermal analysis and certified component compatibility, engineered for performance enthusiasts.",
    problem:
      "Configuring a high-performance PC is error-prone — compatibility, thermals, and power efficiency are difficult to validate before committing to a parts list.",
    contributions: [
      "Built a component configurator that validates cross-part compatibility as the build is assembled.",
      "Designed a real-time telemetry dashboard surfacing CPU temperature, GPU clock, system load, and power efficiency.",
      "Implemented community build browsing so users can fork and adapt proven configurations.",
      "Crafted an immersive, high-contrast UI with live metrics and a guided build flow.",
    ],
    impact:
      "Lets enthusiasts forge compatible, thermally-validated builds with confidence before purchasing hardware.",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    methods: ["Compatibility Engine", "Telemetry UI", "Config Builder"],
    icon: <Cpu size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://rig-forge-xi.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/RigForge" },
    ],
  },
  {
    title: "Netflix Clone — High-Fidelity Streaming UI",
    domain: "swe",
    summary:
      "A pixel-accurate Netflix UI clone with responsive layouts, content carousels, and polished streaming-platform interaction patterns.",
    problem:
      "Recreating a production-grade streaming interface means faithfully reproducing complex layouts, scrollable rows, responsive breakpoints, and the micro-interactions users expect.",
    contributions: [
      "Reproduced the Netflix layout with pixel-accurate spacing, typography, and responsive row carousels.",
      "Integrated a movie database API to render dynamic content rows, hero banners, and detail views.",
      "Implemented hover previews, modal detail panels, and smooth horizontal scrolling.",
      "Tuned the experience across desktop and mobile breakpoints for a faithful streaming feel.",
    ],
    impact:
      "Demonstrates frontend engineering rigor through a faithful recreation of a complex, content-dense streaming interface.",
    stack: ["React", "TypeScript", "TailwindCSS", "TMDB API"],
    methods: ["Responsive UI", "Carousels", "API Integration"],
    icon: <Film size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [{ label: "GitHub", url: "https://github.com/MananShah05/Netflix-clone" }],
  },
  {
    title: "MONOLITH — Architectural Streetwear E-Commerce",
    domain: "swe",
    summary:
      "A luxury, minimalist streetwear storefront built around architectural silhouettes — premium product storytelling, a lookbook, and a full cart experience.",
    problem:
      "Premium fashion brands need a storefront that conveys quality and intent. Generic e-commerce templates flatten the brand and fail to communicate the craftsmanship behind a high-end product.",
    contributions: [
      "Built an editorial product experience with heavyweight visual storytelling, construction details, and a lookbook gallery.",
      "Implemented product browsing by category, featured collections, and a slide-out shopping bag with live cart state.",
      "Designed a refined light/dark theme and cinematic scroll-driven sections for an elevated brand feel.",
      "Engineered responsive, high-fidelity layouts with polished micro-interactions throughout the funnel.",
    ],
    impact:
      "Translates a premium fashion brand into a storefront that sells on craftsmanship and intent rather than generic templates.",
    stack: ["JavaScript", "React", "TailwindCSS", "Framer Motion", "Vite"],
    methods: ["E-Commerce UX", "Cart State", "Editorial UI"],
    icon: <Shirt size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://monolith-cloth.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/MONOLITH" },
    ],
  },
  {
    title: "FloodSight — 3D Flood Risk Visualizer",
    domain: "swe",
    summary:
      "A client-side 3D simulation platform that runs real-time flood spreading models on dynamic terrain data fetched directly from topographical APIs.",
    problem:
      "Urban planners and researchers lack accessible, non-GIS tools to simulate and visualize localized flood risk under varying rainfall scenarios in real time.",
    contributions: [
      "Built a dynamic 3D terrain rendering pipeline using React Three Fiber, Three.js, and custom GLSL wave displacement shaders.",
      "Implemented a client-side Breadth-First Search (BFS) flood fill simulation engine tracking flood propagation based on physical elevation maps.",
      "Integrated OpenTopoData (SRTM 90m) and OpenStreetMap Nominatim APIs to support on-demand terrain construction for any location.",
      "Designed an interactive control panel with Recharts elevation profiles, a stats HUD tracking flooded areas, and timeline scrubbing."
    ],
    impact:
      "Empowered civic researchers and planners to instantly visualize flood propagation and classify localized risk levels (Safe, Warn, Danger) without complex GIS software.",
    stack: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "GLSL",
      "Zustand",
      "Recharts",
      "TailwindCSS"
    ],
    methods: ["BFS Flood Sim", "3D Terrain Shader", "Geocoding", "Elevation Profiling"],
    icon: <Waves size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://flood-sight.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/FloodSight" },
    ],
  },
  {
    title: "Neon City — Generative 3D City Builder",
    domain: "swe",
    summary:
      "A client-side generative 3D city builder and camera fly-through simulator rendering futuristic procedural urban landscapes.",
    problem:
      "Visualizing large generative procedural environments in 3D is computationally heavy and often requires complex native graphics pipelines.",
    contributions: [
      "Created a procedural city grid generator in React Three Fiber and Three.js that optimizes draw calls through mesh instancing.",
      "Written custom post-processing shaders for retro-futuristic bloom, chromatic aberration, and vignette effects.",
      "Designed an orbital camera rig and programmatic fly-through auto-pilot controller for cinematic viewing modes.",
      "Implemented real-time layout generation controls utilizing Zustand state management for instant city updates."
    ],
    impact:
      "Achieved smooth 60fps rendering of thousands of procedurally textured buildings directly in the browser on standard mobile and desktop devices.",
    stack: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "Postprocessing",
      "Zustand",
      "TailwindCSS"
    ],
    methods: ["Mesh Instancing", "Procedural Gen", "Post-Process Shaders", "Camera Rigging"],
    icon: <Building size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://neon-city-omega.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Neon-City" },
    ],
  },
  {
    title: "Maharashtra Forts 3D Explorer",
    domain: "swe",
    summary:
      "An interactive geocoded map and photorealistic 3D terrain viewer showcasing the historic hill and sea forts of Maharashtra.",
    problem:
      "Historical fort locations are often documented in flat text, lacking interactive geographical, elevation, or visual context for historical researchers.",
    contributions: [
      "Engineered an interactive 2D map dashboard using Leaflet mapped against custom GIS geographical data.",
      "Built a 3D terrain viewer using React Three Fiber that maps SRTM elevation grids into displaced geometric meshes.",
      "Integrated narrated audio hotspots and historical information drawers with interactive slide animations.",
      "Implemented a server-side Gemini API pipeline to automatically generate rich historical summaries and metadata."
    ],
    impact:
      "Unified historical documentation and modern geocoding to make 30+ historic forts explorable in interactive, high-fidelity 3D terrain.",
    stack: [
      "Vite",
      "React",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "Leaflet",
      "Google Gemini API",
      "TailwindCSS"
    ],
    methods: ["GIS Mapping", "3D Terrain", "LLM Meta Gen", "Hotspot Narration"],
    icon: <Compass size={22} />,
    color: "from-[var(--secondary)]/10 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://maharashtra-forts-exploration.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/maharashtra-forts-exploration" },
    ],
  },
  {
    title: "Jugaad.dev — Indian Developer Workarounds",
    domain: "swe",
    summary:
      "A curated platform detailing developer hacks, zero-budget workarounds, and clever engineering optimizations inspired by 'Jugaad'.",
    problem:
      "Developers in emerging markets often lack a centralized repository of practical, zero-cost architecture solutions and serverless hacks.",
    contributions: [
      "Designed and built a fast, minimalist markdown-driven directory using Vite, React, and TypeScript.",
      "Created a serverless hosting deployment flow to keep the platform run cost at zero indefinitely.",
      "Curated and structured 50+ developer hacks covering free database tiers, asset storage, and API routing.",
      "Built a serverless API utility using Bun and TypeScript to fetch and preview developer hacks dynamically."
    ],
    impact:
      "Helped developers discover zero-cost architecture patterns, generating high organic interest in the regional engineering community.",
    stack: ["Vite", "React", "TypeScript", "Bun", "TailwindCSS", "Markdown"],
    methods: ["Static Site Gen", "Zero-Budget Hosting", "API Tooling"],
    icon: <Terminal size={22} />,
    color: "from-[var(--accent)]/10 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://jugaad-dev.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Jugaad.dev" },
    ],
  },
  {
    title: "PeopleIQ — Governed AI HR Intelligence",
    domain: "swe",
    summary:
      "An enterprise SaaS HR operating system providing citation-grounded policy answers, temporal search, and advanced talent risk analytics.",
    problem:
      "HR knowledge is scattered across fragmented systems, causing high support ticket volume, compliance risks, and delayed talent decisions.",
    contributions: [
      "Designed a role-aware RAG search engine (PolicyMind) that returns policy answers backed by verifiable document citations.",
      "Implemented temporal search capabilities to query past policy states and automatically flag policy version conflicts.",
      "Developed talent risk modeling (TalentLens) to detect flight risk and talent hoarding patterns based on historical reviews and mobility records.",
      "Enforced strict enterprise governance using isolated tenant vector indexes and field-level permissions for PII."
    ],
    impact:
      "Reduced repetitive HR policy ticket volume and accelerated compliance investigations with full audit-ready query trails.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Weaviate",
      "LlamaIndex",
      "TailwindCSS"
    ],
    methods: ["Role-Aware RAG", "Temporal Versioning", "Conflict Detection", "Anomaly Detection"],
    icon: <Users size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://people-iq-hr.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/PeopleIQ" },
    ],
  },
  {
    title: "Meridian — Financial Intelligence Cockpit",
    domain: "quant",
    summary:
      "A premium financial cockpit representing money, markets, and risk through an editorial, scroll-driven interactive interface.",
    problem:
      "Standard financial dashboards display raw numbers without interactive storytelling or quantitative context around historical volatility events.",
    contributions: [
      "Built a cinematic dashboard summarizing multi-asset net worth and liquid asset allocations using Next.js and Prisma.",
      "Created 'Story Mode', an interactive scroll-driven visualizer analyzing the mechanics of the historical 2018 VIX Volmageddon event.",
      "Implemented a multi-step credential connection simulator and rolling portfolio risk onboarding wizard.",
      "Designed smooth data animations, glassmorphism panel transitions, and dark-mode charts using Framer Motion and Recharts."
    ],
    impact:
      "Combined financial metrics with cinematic narrative structures to deliver an institutional-grade, highly engaging wealth visualization cockpit.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Prisma",
      "SQLite",
      "TailwindCSS",
      "Framer Motion",
      "Recharts"
    ],
    methods: ["Volatility Analysis", "Asset Allocation", "Interactive Narrative", "Risk Calibration"],
    icon: <Layers size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://meridian-in.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Meridian" },
    ],
  },
  {
    title: "SIPvsLump — Cinematic Investment Path Visualizer",
    domain: "quant",
    summary:
      "A scroll-driven visualizer that uses historical market cycles to compare Systematic Investment Plans against lump-sum investment strategies.",
    problem:
      "Investors struggle to understand the psychological and mathematical differences between dollar-cost averaging and lump-sum investing during market corrections.",
    contributions: [
      "Developed a historical simulation engine using D3.js and React to compute rolling investment returns across past market regimes.",
      "Created a multi-act, scroll-driven cinematic walkthrough showing portfolio balances, cost-basis shifts, and market drawdowns.",
      "Built dynamic URL state hydration to let users share custom simulated investment portfolios instantly.",
      "Designed rich, interactive charts and milestones using Framer Motion and GSAP to illustrate compounding effects."
    ],
    impact:
      "Transformed complex dry investment mathematics into a visually stunning, narrative-driven educational tool.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "D3.js",
      "Recharts",
      "Framer Motion",
      "GSAP",
      "TailwindCSS"
    ],
    methods: ["Historical Backtest", "Rolling Returns", "Cost-Basis Tracking", "Regime Classification"],
    icon: <Percent size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://sip-vs-lump.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/SIP-VS-LUMP" },
    ],
  },
  {
    title: "SupplyRadar — Supplier Risk Intelligence Platform",
    domain: "quant",
    summary:
      "An enterprise supplier risk intelligence SaaS platform combining multi-tier dependency graphs, geospatial monitoring, and RAG-assisted impact modeling.",
    problem:
      "Procurement teams lack real-time visibility into Tier-2/3 supplier disruptions, leading to delayed contingency actions and manufacturing halts.",
    contributions: [
      "Built a multi-tier dependency mapping engine (SupplierGraph) to detect shared upstream supplier concentrations.",
      "Designed real-time event correlation (SignalWatch) matching weather, logistics, and geopolitical feeds to supplier coordinates using PostGIS.",
      "Implemented a quantitative risk scoring engine (RiskIQ) computing composite risk levels and estimated lead-time delays.",
      "Developed a RAG retrieval flow to pull historical disruption precedents and recommend actions."
    ],
    impact:
      "Provided early-warning alerts for supplier disruptions (e.g., coastal monsoon flooding), protecting enterprise clients from production downtime.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "Neo4j",
      "Pinecone",
      "TailwindCSS"
    ],
    methods: ["Geospatial Proximity", "Graph Traversal", "Composite Risk Scoring", "Historical Case Retrieval"],
    icon: <Radar size={22} />,
    color: "from-[var(--accent)]/15 to-[var(--accent-light)]/5",
    links: [
      { label: "Live Link", url: "https://supply-radars.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/SupplyRadar" },
    ],
  },
  {
    title: "AlphaDecay — Quantitative Crowd Trade Detector",
    domain: "quant",
    summary:
      "A quantitative analytical dashboard tracking how long before proprietary trading strategies get arbitrated away by competitors.",
    problem:
      "Quantitative searchers and fund managers lack unified tools to estimate capital capacity limits and monitor strategy decay factors.",
    contributions: [
      "Built a strategy simulation dashboard calculating alpha half-life, capital capacity boundaries, and competitor saturation rates.",
      "Written mathematical modeling scripts in TypeScript to simulate daily alpha decay (BPS) across different market sectors.",
      "Created a 'Strategy Graveyard' highlighting post-mortem mechanics of historical collapses like GBTC Premium and Kimchi Premium.",
      "Implemented real-time mock scans tracking GitHub commits, forum posts, and validator WebSocket latencies."
    ],
    impact:
      "Provided quantitative traders with a decision cockpit to plan safety guardrails and track strategy decay parameters visually.",
    stack: ["Vite", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Recharts"],
    methods: ["Half-Life Decay", "Autopsy Analysis", "Capacity Estimation", "Competitor Tracking"],
    icon: <Activity size={22} />,
    color: "from-[var(--secondary)]/15 to-[var(--secondary-soft)]/5",
    links: [
      { label: "Live Link", url: "https://alpha-peach-rho.vercel.app/" },
      { label: "GitHub", url: "https://github.com/MananShah05/Alpha" },
    ],
  },
];

export const projectsByDomain = (domain: ProjectDomain) =>
  projects.filter((p) => p.domain === domain);
