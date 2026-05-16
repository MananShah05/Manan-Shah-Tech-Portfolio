import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { LayoutDashboard, Brain, Monitor, Palette, Trophy, Code, Rocket, Star } from "lucide-react";

const showcases = [
  {
    title: "AI Model Monitoring Dashboard",
    desc: "A real-time dashboard for tracking NLP model performance, inference latency, and prediction confidence across document extraction pipelines.",
    icon: <Brain size={18} />,
    color: "bg-[var(--accent)]/8 border-[var(--accent)]/15",
    iconColor: "text-[var(--accent)]",
    preview: (
      <div className="flex flex-col items-center justify-center py-6 h-[140px] opacity-60">
        <Brain size={24} style={{ color: "var(--fg-subtle)", marginBottom: "12px" }} />
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>Live Preview Coming Soon</span>
      </div>
    ),
  },
  {
    title: "Document Intelligence Interface",
    desc: "An extraction review UI with side-by-side document preview, highlighted entity annotations, and confidence scoring for human-in-the-loop validation.",
    icon: <LayoutDashboard size={18} />,
    color: "bg-[var(--secondary)]/8 border-[var(--secondary)]/15",
    iconColor: "text-[var(--secondary)]",
    preview: (
      <div className="flex flex-col items-center justify-center py-6 h-[140px] opacity-60">
        <LayoutDashboard size={24} style={{ color: "var(--fg-subtle)", marginBottom: "12px" }} />
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>Live Preview Coming Soon</span>
      </div>
    ),
  },
  {
    title: "Transcend Frames",
    desc: "A creative freelancer portfolio site featuring fluid animations, bespoke typography, and a modern editorial layout. Built for high-end visual storytelling.",
    icon: <Palette size={18} />,
    color: "bg-[var(--accent)]/8 border-[var(--accent)]/15",
    iconColor: "text-[var(--accent)]",
    preview: (
      <div className="relative w-full h-[180px] rounded-lg overflow-hidden group" style={{ border: "1px solid var(--glass-border)" }}>
        <iframe
          src="https://transcend-frames.vercel.app/"
          className="absolute top-0 left-0 w-[400%] h-[400%] border-0 pointer-events-none"
          style={{ transform: "scale(0.25)", transformOrigin: "top left" }}
          tabIndex={-1}
          title="Transcend Frames Preview"
        />
        <a 
          href="https://transcend-frames.vercel.app/" 
          target="_blank" 
          rel="noreferrer"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(26, 26, 24, 0.2)" }}
        >
          <div className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase flex items-center gap-2" style={{ backgroundColor: "var(--glass-bg)", color: "var(--fg)", border: "1px solid var(--glass-border)" }}>
            View Live Site <span style={{ color: "var(--accent)" }}>↗</span>
          </div>
        </a>
      </div>
    ),
  },
  {
    title: "Deepfake Analysis Report",
    desc: "A forensic analysis interface showing frame-level confidence heatmaps, frequency-domain visualizations, and explainable detection reasoning.",
    icon: <Monitor size={18} />,
    color: "bg-[var(--secondary)]/8 border-[var(--secondary)]/15",
    iconColor: "text-[var(--secondary)]",
    preview: (
      <div className="flex flex-col items-center justify-center py-6 h-[140px] opacity-60">
        <Monitor size={24} style={{ color: "var(--fg-subtle)", marginBottom: "12px" }} />
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>Live Preview Coming Soon</span>
      </div>
    ),
  },
];

const timeline = [
  {
    year: "2024",
    title: "1st Place — National AI Hackathon",
    desc: "Built an autonomous agent for document extraction. Won ₹50,000 cash prize among 200+ competing teams.",
    icon: <Trophy size={16} />,
  },
  {
    year: "2023",
    title: "Top 5 Finalist — Smart India Hackathon",
    desc: "Developed a deepfake detection pipeline for media integrity. Presented to government stakeholders.",
    icon: <Star size={16} />,
  },
  {
    year: "2023",
    title: "Best Use of Cloud — CodeFest",
    desc: "Shipped a highly scalable semantic search API using serverless architecture in 36 hours.",
    icon: <Code size={16} />,
  },
  {
    year: "2022",
    title: "First Hackathon — SparkIT",
    desc: "Built a rudimentary ML classifier for spam detection. Sparked my journey into production AI.",
    icon: <Rocket size={16} />,
  },
];

export default function UIUXShowcase() {
  return (
    <section id="design" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="06 — Design & Competitions"
          title="Interfaces I've crafted. Battles I've won."
          subtitle="From polished product UIs to high-pressure hackathon prototypes — building things that look great and work under pressure."
        />

        {/* ── Design Showcase Grid ── */}
        <div className="grid sm:grid-cols-2 gap-5">
          {showcases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-light rounded-3xl p-6 md:p-8 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center ${item.iconColor}`}>
                  {item.icon}
                </div>
                <h3 className="font-sans text-base md:text-lg font-semibold" style={{ color: "var(--fg)" }}>
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-subtle)" }}>
                {item.desc}
              </p>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(26, 26, 24, 0.015)", border: "1px solid var(--glass-border)" }}
              >
                {item.preview}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Hackathon Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(45, 106, 79, 0.1)", color: "var(--accent)" }}
            >
              <Trophy size={14} />
            </div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--fg)" }}>
              Hackathon Journey
            </h3>
          </div>

          <div className="relative max-w-[900px] mx-auto border-l border-[var(--glass-border)] ml-6 md:ml-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8 md:pl-12 pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-[-16px] top-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--glass-bg)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    boxShadow: "0 0 10px rgba(45, 106, 79, 0.2)",
                  }}
                >
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="glass-light rounded-3xl p-6 md:p-8 relative group transition-colors duration-300">
                  <div
                    className="inline-block px-3 py-1 mb-4 rounded-md text-[11px] font-mono tracking-widest font-bold"
                    style={{ backgroundColor: "rgba(45, 106, 79, 0.1)", color: "var(--accent)", border: "1px solid var(--glass-border)" }}
                  >
                    {item.year}
                  </div>
                  <h3 className="font-sans text-xl font-bold mb-3" style={{ color: "var(--fg)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
