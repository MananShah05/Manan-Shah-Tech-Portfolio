import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Quote } from "lucide-react";

const testimonials = [
  {
    label: "CTO Feedback",
    quote:
      "Manan is an exceptionally talented developer. He took our core concepts and engineered a scalable, production-grade NLP architecture with flawless full-stack integration. His attention to code quality and UI/UX design is exemplary.",
    author: "Taha Kothari",
    role: "CTO @ Hatimi",
  },
  {
    label: "CEO Feedback",
    quote:
      "Manan brings a rare combination of raw technical depth and refined product intuition. He designed and shipped beautiful user interfaces and robust APIs for our platform, moving at incredible speed. A true modern developer.",
    author: "Manish Mondal",
    role: "CEO @ Scripty",
  },
  {
    label: "Founder Feedback",
    quote:
      "Manan's passion for leveraging AI to solve complex, real-world problems was central to our project's success. He is highly collaborative, thinks deeply about system architecture, and consistently delivers high-impact results.",
    author: "Ayush Jain",
    role: "Founder @ Grofo Foundation",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="Testimonials"
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
