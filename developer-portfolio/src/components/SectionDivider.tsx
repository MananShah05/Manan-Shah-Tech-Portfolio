import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-12">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px origin-center"
        style={{
          background: "linear-gradient(to right, transparent, rgba(128,128,128,0.15), transparent)",
        }}
      />
    </div>
  );
}
