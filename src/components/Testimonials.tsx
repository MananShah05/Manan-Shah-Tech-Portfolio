import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Quote } from "lucide-react";

const testimonials = [
  {
    label: "Mentor Feedback",
    quote:
      "Manan consistently shipped production-grade NLP pipelines with clean, well-documented code. His ability to translate research papers into working systems is rare at this stage. He thinks like an engineer and executes like a researcher.",
    author: "Senior ML Engineer",
    role: "Applied Intelligence Team",
  },
  {
    label: "Team Collaboration",
    quote:
      "Working with Manan was seamless. He took ownership of the document intelligence pipeline, communicated blockers early, and always considered the downstream impact of his model decisions on the broader product.",
    author: "Product Manager",
    role: "AI Platform Team",
  },
  {
    label: "Research Execution",
    quote:
      "Manan shipped a full deepfake detection system in under 10 weeks — from dataset curation to published paper draft. The quality of his research methodology and his attention to reproducibility exceeded every expectation.",
    author: "Research Advisor",
    role: "Media Integrity Lab",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="09 — Testimonials"
          title="What teams say about working with me."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="glass-light rounded-3xl p-6 md:p-8 group cursor-default"
            >
              <div className="flex items-center gap-2 mb-5">
                <Quote
                  size={16}
                  className="transition-colors"
                  style={{ color: "var(--accent)", opacity: 0.4 }}
                />
                <span
                  className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent)", opacity: 0.6 }}
                >
                  {t.label}
                </span>
              </div>
              <p className="text-sm md:text-[15px] leading-relaxed mb-6 italic" style={{ color: "var(--fg-muted)" }}>
                "{t.quote}"
              </p>
              <div className="pt-4" style={{ borderTop: "1px solid var(--glass-border)" }}>
                <div className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {t.author}
                </div>
                <div className="text-[11px]" style={{ color: "var(--fg-subtle)" }}>
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
