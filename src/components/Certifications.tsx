import { motion } from "framer-motion";
import { Brain, Code, Cpu, GraduationCap, Landmark, Shield } from "lucide-react";
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
    href: "https://www.coursera.org/account/accomplishments/verify/7YHB76EGGY1H",
  },
  {
    title: "Getting Started with AI on Jetson Nano",
    org: "NVIDIA",
    icon: <Cpu size={20} />,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/8",
    href: "https://drive.google.com/file/d/1DVMUv10HjIHPlLc9H60tszgNsG9fx2Nt/view?usp=drive_link",
  },
  {
    title: "C & C++ Certification",
    org: "Maharashtra Board of Education & Raj Academy",
    icon: <Code size={20} />,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/8",
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
    <section id="certifications" className="relative py-10 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          //label="Certifications"
          title="Certifications that complement the code."
          subtitle="Specialized domain knowledge in finance and machine learning theory."
        />

        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-4 md:gap-5">
          {certs.map((cert, i) => {
            const Wrapper = cert.href ? "a" : "div";
            return (
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
                className="w-full md:w-auto flex"
              >
                <Wrapper
                  {...(cert.href ? { href: cert.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`glass-light rounded-2xl px-6 py-4 flex items-center gap-4 w-full md:w-auto border transition-colors ${cert.href
                    ? "cursor-pointer hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.01]"
                    : "cursor-default border-[var(--glass-border)]"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${cert.bg} flex items-center justify-center ${cert.color}`}>
                    {cert.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "var(--fg)" }}>
                      {cert.title}
                      {cert.href && (
                        <svg className="w-3 h-3 text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      )}
                    </div>
                    <div className="text-[11px]" style={{ color: "var(--fg-subtle)" }}>
                      {cert.org}
                    </div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
