import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Palette, ShoppingBag, Headphones, Layout } from "lucide-react";

const showcases = [
  {
    title: "Adidas Shoes UI/UX",
    period: "Apr 2024",
    desc: "Designed UI/UX for Adidas shoes, focusing on enhancing online shopping experience. Created intuitive interfaces in Figma to drive customer engagement.",
    icon: <ShoppingBag size={18} />,
    color: "bg-[var(--accent)]/8 border-[var(--accent)]/15",
    iconColor: "text-[var(--accent)]",
    preview: (
      <div className="relative w-full h-[140px] rounded-lg overflow-hidden group" style={{ border: "1px solid var(--glass-border)" }}>
        <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FsVScETWlt17ZiyXkcV0JNm%2FAdidas-Site%3Fnode-id%3D0-1%26t%3D3BIsHeEmBMKyrE7u-1"
          className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
          title="Adidas Design Site Preview"
        />
        <a
          href="https://www.figma.com/design/sVScETWlt17ZiyXkcV0JNm/Adidas-Site?node-id=0-1&t=3BIsHeEmBMKyrE7u-1"
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(26, 26, 24, 0.2)" }}
        >
          <div className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase flex items-center gap-2" style={{ backgroundColor: "var(--glass-bg)", color: "var(--fg)", border: "1px solid var(--glass-border)" }}>
            Open Figma File <span style={{ color: "var(--accent)" }}>↗</span>
          </div>
        </a>
      </div>
    ),
  },
  {
    title: "Gaming Headphones (ROG Headphones)",
    period: "Jan 2024",
    desc: "Developed a responsive UI/UX design for ROG gaming headphones, emphasizing user-centric design. Created an immersive interface for the gaming community.",
    icon: <Headphones size={18} />,
    color: "bg-[var(--secondary)]/8 border-[var(--secondary)]/15",
    iconColor: "text-[var(--secondary)]",
    preview: (
      <div className="relative w-full h-[140px] rounded-lg overflow-hidden group" style={{ border: "1px solid var(--glass-border)" }}>
        <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FVX39Uk8foyrhLyFuHEQQkj%2FProject-2%3Fnode-id%3D0-1%26t%3DxRcMVSF1BXza6k1z-1"
          className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
          title="ROG Headphones Design Preview"
        />
        <a
          href="https://www.figma.com/design/VX39Uk8foyrhLyFuHEQQkj/Project-2?node-id=0-1&t=xRcMVSF1BXza6k1z-1"
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(26, 26, 24, 0.2)" }}
        >
          <div className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase flex items-center gap-2" style={{ backgroundColor: "var(--glass-bg)", color: "var(--fg)", border: "1px solid var(--glass-border)" }}>
            Open Figma File <span style={{ color: "var(--secondary)" }}>↗</span>
          </div>
        </a>
      </div>
    ),
  },
  {
    title: "Website Landing Page",
    period: "Mar 2024",
    desc: "Developed a comprehensive, high-fidelity responsive landing page mockup. Crafted bespoke interactive sections, unified system typography, and clean layouts in Figma.",
    icon: <Layout size={18} />,
    color: "bg-[var(--accent)]/8 border-[var(--accent)]/15",
    iconColor: "text-[var(--accent)]",
    preview: (
      <div className="relative w-full h-[140px] rounded-lg overflow-hidden group" style={{ border: "1px solid var(--glass-border)" }}>
        <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIAFSq7OmpPqO8ncaJvPzd1%2FWebsite-Landing-Page%3Fnode-id%3D3-2%26t%3DdhGmmRBcAKpTR39q-1"
          className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
          title="Website Landing Page Preview"
        />
        <a
          href="https://www.figma.com/proto/IAFSq7OmpPqO8ncaJvPzd1/Website-Landing-Page?node-id=3-2&t=dhGmmRBcAKpTR39q-1"
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(26, 26, 24, 0.2)" }}
        >
          <div className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase flex items-center gap-2" style={{ backgroundColor: "var(--glass-bg)", color: "var(--fg)", border: "1px solid var(--glass-border)" }}>
            Open Prototype <span style={{ color: "var(--accent)" }}>↗</span>
          </div>
        </a>
      </div>
    ),
  },
  {
    title: "Transcend Frames",
    period: "Active Portfolio",
    desc: "A creative freelancer portfolio site featuring fluid animations, bespoke typography, and a modern editorial layout. Built for high-end visual storytelling.",
    icon: <Palette size={18} />,
    color: "bg-[var(--accent)]/8 border-[var(--accent)]/15",
    iconColor: "text-[var(--accent)]",
    preview: (
      <div className="relative w-full h-[140px] rounded-lg overflow-hidden group" style={{ border: "1px solid var(--glass-border)" }}>
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
];

export default function UIUXShowcase() {
  return (
    <section id="design" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="UI UX Design"
          title="Interfaces and interactive designs."
          subtitle="Polished digital products, responsive web interfaces, and high-fidelity prototypes designed for seamless user experiences."
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
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center ${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-semibold" style={{ color: "var(--fg)" }}>
                    {item.title}
                  </h3>
                </div>
                {item.period && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: "rgba(26, 26, 24, 0.025)", border: "1px solid var(--glass-border)", color: "var(--fg-muted)" }}>
                    {item.period}
                  </span>
                )}
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

        {/* ── Hackathon Timeline commented out for now ── */}
        {/*
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
        */}
      </div>
    </section>
  );
}
