import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: ["NLP", "Transformers", "scikit-learn", "TensorFlow", "PyTorch", "OCR", "Deepfakes"],
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "C", "C++"],
  },
  {
    title: "Backend & APIs",
    skills: ["FastAPI", "Flask", "Node.js", "REST APIs", "Git", "Linux"],
  },
  {
    title: "Data & MLOps",
    skills: ["Pandas", "NumPy", "ETL Pipelines", "PostgreSQL", "Vector DBs", "Docker"],
  },
  {
    title: "Visualization & Frontend",
    skills: ["Power BI", "Tableau", "Streamlit", "React", "Tailwind", "Chart.js"],
  },
  {
    title: "Domains & Concepts",
    skills: ["Finance (AMFI)", "Insurance", "System Design", "Agile", "CI/CD", "Cloud"],
  },
  {
    title: "Design & Motion",
    skills: ["After Effects", "Photoshop", "Canva", "Creative Cloud", "GIMP"],
  },
  {
    title: "3D & Spatial",
    skills: ["Blender", "Cinema 4D", "Spline"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          //label="Skills"
          title="A toolkit built for intelligent systems."
          subtitle="From transformer models and vector databases to production APIs and financial data pipelines — the stack I use to ship AI products."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -3 }}
              className="glass-light rounded-2xl p-6 group"
            >
              <h3
                className="font-mono text-[11px] font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--fg-subtle)" }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-default"
                    style={{
                      backgroundColor: "rgba(26, 26, 24, 0.03)",
                      border: "1px solid rgba(26, 26, 24, 0.04)",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
