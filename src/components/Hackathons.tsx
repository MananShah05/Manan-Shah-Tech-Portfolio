import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Trophy, Code, Rocket, Star } from "lucide-react";

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

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative py-12 md:py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="07 — Competitions"
          title="Building under pressure."
          subtitle="A timeline of hackathons where I turned caffeine and ideas into working prototypes in 24-48 hours."
        />

        <div className="relative mt-12 md:mt-16 border-l border-[var(--glass-border)] ml-6 md:ml-0">
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
              <div className="glass-light rounded-3xl p-6 md:p-8 relative group transition-colors duration-300 hover:border-[var(--accent)]/30">
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
      </div>
    </section>
  );
}
