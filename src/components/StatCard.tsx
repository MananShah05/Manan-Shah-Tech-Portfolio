import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  delay?: number;
}

export default function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-light rounded-2xl p-5 md:p-6 group cursor-default"
    >
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className="transition-colors duration-300" style={{ color: "var(--accent)", opacity: 0.6 }}>
            {icon}
          </div>
        )}
      </div>
      <div className="font-mono text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--fg)" }}>
        {value}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--fg-subtle)" }}>
        {label}
      </div>
    </motion.div>
  );
}
