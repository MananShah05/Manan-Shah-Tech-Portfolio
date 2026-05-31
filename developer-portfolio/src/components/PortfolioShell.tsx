import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioMode } from "../hooks/usePortfolioMode";
import { staggerContainerVariants, fadeUpVariants } from "../transitions";

interface PortfolioShellProps {
  developerPortfolio: React.ReactNode;
  creativePortfolio: React.ReactNode;
}

export const PortfolioShell: React.FC<PortfolioShellProps> = ({
  developerPortfolio,
  creativePortfolio,
}) => {
  const { mode, transitionPhase } = usePortfolioMode();

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
          // Fade/hide active content only during initial Tear phase when RGB screenshot is active
          opacity: transitionPhase === "rgb" || transitionPhase === "flood" ? 0 : 1,
        }}
      >
        {mode === "developer" ? developerPortfolio : creativePortfolio}
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
