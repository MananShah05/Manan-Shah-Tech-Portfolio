// Transitions Configuration & Timing Constants

export const EASING = {
  outStrong: [0.23, 1, 0.32, 1], // cubic-bezier(0.23, 1, 0.32, 1)
  outStrongCss: "cubic-bezier(0.23, 1, 0.32, 1)",
  
  inOutStrong: [0.77, 0, 0.175, 1], // cubic-bezier(0.77, 0, 0.175, 1)
  inOutStrongCss: "cubic-bezier(0.77, 0, 0.175, 1)",
  
  spring: {
    type: "spring",
    stiffness: 200,
    damping: 20,
  },
};

// Enter sequence (Dev -> Creative): Total ~900ms
export const TIMING_ENTER = {
  total: 900,
  charge: 120,    // 0 - 120ms
  rgbSplit: 300,  // 120ms - 420ms (Duration: 300ms)
  inkFlood: 420,  // 300ms - 720ms (Duration: 420ms)
  reveal: 180,    // 720ms - 900ms (Duration: 180ms)
};

// Exit / Reverse sequence (Creative -> Dev): Total ~700ms
export const TIMING_EXIT = {
  total: 700,
  charge: 90,     // 0 - 90ms
  rgbSplit: 240,  // 90ms - 330ms (Duration: 240ms)
  inkFlood: 330,  // 230ms - 560ms (Duration: 330ms)
  reveal: 140,    // 560ms - 700ms (Duration: 140ms)
};

// Framer Motion shared variants
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASING.outStrong,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger range: 30 - 80ms (50ms)
    },
  },
};
