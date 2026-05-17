import { motion } from "framer-motion";
import { Award, Brain, GraduationCap, Landmark, Shield } from "lucide-react";
import SectionHeading from "./SectionHeading";

const certs = [
  {
    title: "AMFI Certification",
    org: "Association of Mutual Funds in India",
    icon: <Landmark size={20} />,
    color: "text-[var(--secondary)]",
    bg: "bg-[var(--secondary)]/8",
  },
  {
    title: "NISM Certification",
    org: "National Institute of Securities Markets",
    icon: <Shield size={20} />,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/8",
  },
  {
    title: "Machine Learning Specialization",
    org: "DeepLearning.AI / Stanford Online",
    icon: <Brain size={20} />,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/8",
  },
  {
    title: "Financial Markets & Investment Analysis",
    org: "NSE Academy / Industry Program",
    icon: <Award size={20} />,
    color: "text-[var(--secondary)]",
    bg: "bg-[var(--secondary)]/8",
  },
  {
    title: "McKinsey Forward Program",
    org: "McKinsey & Company",
    icon: <GraduationCap size={20} />,
    color: "text-[var(--fg-muted)]",
    bg: "bg-[var(--fg)]/5",
  },
];

export default function Certifications() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="08 — Certifications"
          title="Certifications that complement the code."
          subtitle="Specialized domain knowledge in finance and machine learning theory."
        />

        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-4 md:gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="glass-light rounded-2xl px-6 py-4 flex items-center gap-4 w-full md:w-auto cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl ${cert.bg} flex items-center justify-center ${cert.color}`}>
                {cert.icon}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {cert.title}
                </div>
                <div className="text-[11px]" style={{ color: "var(--fg-subtle)" }}>
                  {cert.org}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
