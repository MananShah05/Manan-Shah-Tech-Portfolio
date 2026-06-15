import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioMode } from "../hooks/usePortfolioMode";
import { staggerContainerVariants, fadeUpVariants } from "../transitions";

interface PortfolioShellProps {
  swePortfolio: React.ReactNode;
  quantPortfolio: React.ReactNode;
  creativePortfolio: React.ReactNode;
}

export const PortfolioShell: React.FC<PortfolioShellProps> = ({
  swePortfolio,
  quantPortfolio,
  creativePortfolio,
}) => {
  const { mode, transitionPhase } = usePortfolioMode();

  const active =
    mode === "creative"
      ? creativePortfolio
      : mode === "quant"
      ? quantPortfolio
      : swePortfolio;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full"
        style={{
          // GPU optimization to prevent layout thrash during active transition
          willChange: transitionPhase !== "idle" ? "transform, opacity" : undefined,
          // Hide live content only while the dip overlay fully covers the screen.
          opacity: transitionPhase === "cover" ? 0 : 1,
        }}
      >
        {active}
      </motion.div>
    </AnimatePresence>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={fadeUpVariants}
      className={className}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PortfolioShell;
