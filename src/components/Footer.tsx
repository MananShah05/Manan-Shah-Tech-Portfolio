import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      id="footer" 
      className="relative py-6 md:py-8 overflow-hidden" 
      style={{ borderTop: "1px solid var(--glass-border)", backgroundColor: "rgba(26, 26, 24, 0.005)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          
          {/* Left Column: Copyright notice & tagline */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-mono tracking-wider" style={{ color: "var(--fg-muted)" }}>
              &copy; {new Date().getFullYear()} Manan Shah. All rights reserved.
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>
              Crafted with focus, design, & applied intelligence
            </span>
          </div>

          {/* Right Column: Back to top button */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-light border border-[var(--glass-border)] text-xs font-mono cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all duration-300 whitespace-nowrap"
              style={{ color: "var(--fg-muted)" }}
            >
              Back to Top
              <ArrowUp size={12} className="animate-bounce" />
            </motion.button>
          </div>

        </div>
      </div>
    </footer>
  );
}
