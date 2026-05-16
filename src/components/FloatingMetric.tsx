import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingMetricProps {
  label: string;
  value: string;
  icon?: ReactNode;
  delay?: number;
  orbitX?: number;
  orbitY?: number;
  orbitDuration?: number;
}

export default function FloatingMetric({
  label,
  value,
  icon,
  delay = 0,
  orbitX = 12,
  orbitY = 8,
  orbitDuration = 6,
}: FloatingMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.6 + delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="relative"
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{
          x: [0, orbitX, 0, -orbitX, 0],
          y: [0, -orbitY, 0, orbitY, 0],
        }}
        transition={{
          duration: orbitDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.05 }}
          className="glass-light rounded-xl px-4 py-3 glow-green-subtle cursor-default"
        >
          <div className="flex items-center gap-2.5">
            {icon && (
              <span style={{ color: "var(--accent)", opacity: 0.6 }}>{icon}</span>
            )}
            <div>
              <div
                className="font-mono text-lg font-semibold tabular-nums"
                style={{ color: "var(--fg)" }}
              >
                {value}
              </div>
              <div
                className="text-[9px] font-mono uppercase tracking-[0.2em] mt-1"
                style={{ color: "var(--fg-subtle)" }}
              >
                {label}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
