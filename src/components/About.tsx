import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Brain, FlaskConical, Globe, GraduationCap, LineChart, Coffee } from "lucide-react";

const focusAreas = [
  {
    icon: <Brain size={18} strokeWidth={2} />,
    title: "Applied NLP",
    desc: "Building production pipelines for document intelligence and semantic search.",
  },
  {
    icon: <FlaskConical size={18} strokeWidth={2} />,
    title: "Deepfake Research",
    desc: "Published methodologies for detection in Indian media landscapes.",
  },
  {
    icon: <LineChart size={18} strokeWidth={2} />,
    title: "FinTech Fluent",
    desc: "AMFI & NISM certified. Finance is a design constraint I code around.",
  },
  {
    icon: <Globe size={18} strokeWidth={2} />,
    title: "$0 Infra AI",
    desc: "Shipping robust products using serverless and open-source models.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="02 — Identity"
          title="Bridging Research & Humanity"
          subtitle="I build production NLP pipelines, research deepfake methodologies, and believe that the best engineers are intensely curious about the world outside of code."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-8 md:mt-16">
          {/* ── LEFT: Narrative Text ── */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Background block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center glass-light" style={{ color: "var(--accent)" }}>
                  <GraduationCap size={16} />
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--fg)" }}>
                  Background
                </h3>
              </div>
              <p className="text-[17px] leading-relaxed mb-5 font-medium text-balance" style={{ color: "var(--fg)" }}>
                I am a final-year B.Tech Information Technology engineer at DJSCE, Mumbai, graduating in 2027.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 text-[13px] font-mono tracking-wide" style={{ color: "var(--fg-muted)" }}>
                <div className="glass-light px-3.5 py-2 rounded-lg" style={{ border: "1px solid var(--glass-border)" }}>
                  B.Tech CGPA: <span className="font-semibold" style={{ color: "var(--fg)" }}>8.65</span> <span className="mx-1 opacity-50">|</span> Honours in DevOps: <span className="font-semibold" style={{ color: "var(--fg)" }}>9.5</span>
                </div>
                <div className="glass-light px-3.5 py-2 rounded-lg" style={{ border: "1px solid var(--glass-border)" }}>
                  10th Grade: <span className="font-semibold" style={{ color: "var(--fg)" }}>92.14%</span>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center glass-light" style={{ color: "var(--accent)" }}>
                  <Coffee size={16} />
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--fg)" }}>
                  Beyond the Screen
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                When I'm not deep in PyTorch or fine-tuning language models, you'll likely find me exploring Mumbai's vibrant cafe culture, reading about behavioral economics, or playing a quick game of chess. I believe that the most creative engineering solutions often come from drawing inspiration across entirely different disciplines.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Focus Area Bento Cards ── */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-light rounded-3xl p-6 group cursor-default flex flex-col justify-between"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: "rgba(45, 106, 79, 0.08)", color: "var(--accent)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] mb-2" style={{ color: "var(--fg)" }}>
                    {item.title}
                  </h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--fg-subtle)" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
