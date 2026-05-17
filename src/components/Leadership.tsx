import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { PenTool, Lightbulb, Mic } from "lucide-react";

const roles = [
  {
    title: "Creatives Chief",
    org: "DJS CodeStars",
    period: "Sept 2025 – Present",
    icon: <PenTool size={18} />,
    points: [
      "Directed the visual identity and creative strategy for the college's premier technical club, elevating the brand presence across all digital and physical mediums.",
      "Coordinated cross-functional teams spanning design, development, and event management to deliver high-impact, structured programming initiatives.",
      "Mentored junior designers in UI/UX principles and modern design tools, fostering a collaborative and high-performing creative environment.",
    ],
  },
  {
    title: "Curator",
    org: "TEDxDJSCE",
    period: "Oct 2024 – Oct 2025",
    icon: <Mic size={18} />,
    points: [
      "Curated a diverse lineup of visionary industry leaders, innovators, and thought-provoking speakers for the flagship annual TEDx conference.",
      "Managed end-to-end speaker relations, from initial outreach and pitch development to event-day logistics and stage coordination.",
      "Collaborated with the curation team to refine talk narratives, ensuring each presentation delivered a compelling and cohesive message.",
    ],
  },
  {
    title: "Creatives",
    org: "DJS E-Cell",
    period: "Oct 2024 – Aug 2025",
    icon: <Lightbulb size={18} />,
    points: [
      "Designed high-impact marketing collaterals and digital assets for entrepreneurial summits, pitching events, and networking mixers.",
      "Worked closely with the core committee to align visual narratives with E-Cell's mission of fostering innovation and business acumen.",
      "Significantly boosted event registrations and social media footprint through targeted, aesthetically driven promotional campaigns.",
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="07 — Leadership"
          title="Ownership beyond the codebase."
          subtitle="Leading technical teams, shaping AI culture on campus, and delivering outcomes through collaboration and clear communication."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -3 }}
              className="glass-light rounded-3xl p-6 md:p-8 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(45, 106, 79, 0.1)", color: "var(--accent)" }}
                >
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-sans text-lg font-bold" style={{ color: "var(--fg)" }}>
                    {role.title}
                  </h3>
                  <p className="text-[11px] font-medium" style={{ color: "var(--fg-subtle)" }}>
                    {role.org} · {role.period}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {role.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "var(--accent)", opacity: 0.4 }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
