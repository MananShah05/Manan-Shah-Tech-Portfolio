import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  icon?: "arrow" | "download" | "mail" | "none";
  onClick?: () => void;
  className?: string;
}

const iconMap = {
  arrow: ArrowRight,
  download: Download,
  mail: Mail,
  none: null,
};

export default function CTAButton({
  children,
  variant = "primary",
  href,
  icon = "arrow",
  onClick,
  className = "",
}: CTAButtonProps) {
  const Icon = iconMap[icon];

  const baseStyles =
    "inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 cursor-pointer";

  const variants = {
    primary: "text-white hover:opacity-90",
    secondary: "hover:opacity-90",
    outline: "hover:opacity-80",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={
        variant === "primary"
          ? { backgroundColor: "var(--accent)", boxShadow: "0 4px 24px -4px var(--accent-glow)" }
          : variant === "secondary"
          ? {
              backgroundColor: "rgba(26, 26, 24, 0.05)",
              color: "var(--fg)",
              border: "1px solid var(--glass-border)",
            }
          : {
              backgroundColor: "transparent",
              color: "var(--fg)",
              border: "1px solid var(--glass-border)",
            }
      }
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {Icon && (
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={16} strokeWidth={2.5} />
        </motion.span>
      )}
    </Component>
  );
}
