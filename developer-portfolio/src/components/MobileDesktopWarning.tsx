import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function MobileDesktopWarning() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Check if viewport is mobile (< 768px)
    const isMobileViewport = window.innerWidth < 768;
    // Check if already shown in this browser session
    const hasBeenShown = sessionStorage.getItem("desktop-view-alert-shown");

    if (isMobileViewport && !hasBeenShown) {
      // Small delay to let the cinematic opener start or load peacefully
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Lock body scrolling
        document.body.style.overflow = "hidden";
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    // Mark as shown in session storage
    sessionStorage.setItem("desktop-view-alert-shown", "true");
    // Restore body scrolling
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-auto">
          {/* iOS-Style Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/35 backdrop-blur-[6px]"
            onClick={handleDismiss}
          />

          {/* iOS Alert Dialog Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: {
                type: "spring",
                damping: 26,
                stiffness: 340
              }
            }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" }
            }}
            className="relative w-[280px] rounded-[14px] overflow-hidden flex flex-col items-center select-none shadow-[0_15px_40px_rgba(0,0,0,0.22)] border"
            style={{
              backgroundColor: isDark ? "rgba(32, 32, 32, 0.82)" : "rgba(255, 255, 255, 0.86)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Header Content */}
            <div className="px-4 pt-5 pb-4 text-center">
              <h3 
                className="font-sans font-semibold text-[17px] leading-tight tracking-tight mb-1.5"
                style={{ color: isDark ? "#ffffff" : "#000000" }}
              >
                Desktop Recommended
              </h3>
              <p 
                className="font-sans text-[13px] leading-snug"
                style={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.65)" }}
              >
                For the best view, view on the desktop
              </p>
            </div>

            {/* Hairline Horizontal Divider */}
            <div 
              className="w-full h-[0.5px]" 
              style={{ backgroundColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)" }}
            />

            {/* iOS Action Button */}
            <button
              onClick={handleDismiss}
              className="w-full py-3 text-[17px] font-semibold active:opacity-40 transition-opacity focus:outline-none cursor-pointer text-center"
              style={{
                color: isDark ? "#0a84ff" : "#007aff", // Authentic iOS Action Blue
              }}
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
