import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--fg-subtle)" }}
        >
          {label}
        </motion.span>
      )}
      <h2
        className="font-serif text-3xl md:text-4xl lg:text-[3.2rem] font-normal leading-[1.1] tracking-[-0.01em]"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-[15px] md:text-base max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{ color: "var(--fg-muted)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
