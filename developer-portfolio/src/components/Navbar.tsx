import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { usePortfolioMode } from "../hooks/usePortfolioMode";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();
  const { mode, quantTheme, toggleQuantTheme } = usePortfolioMode();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isQuantMode = mode === "quant";
  const currentIsDark = isQuantMode ? quantTheme === "dark" : isDark;
  const handleToggle = isQuantMode ? toggleQuantTheme : toggle;

  // Cross-component table of contents visibility sync state
  const [isTOCVisible, setIsTOCVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("toc-visible");
      return stored !== "false";
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      setIsTOCVisible(customEvent.detail.visible);
    };

    window.addEventListener("dynamic-island-visibility", handleVisibilityChange);
    return () => window.removeEventListener("dynamic-island-visibility", handleVisibilityChange);
  }, []);

  const restoreTOC = () => {
    localStorage.setItem("toc-visible", "true");
    setIsTOCVisible(true);
    window.dispatchEvent(
      new CustomEvent("dynamic-island-visibility", { detail: { visible: true } })
    );
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--glass-border)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#"
              className="font-serif text-xl md:text-2xl font-normal tracking-tight italic"
              style={{ color: "var(--fg)" }}
              whileHover={{ scale: 1.02 }}
            >
              Manan Shah
            </motion.a>

            <div
              className="hidden md:flex items-center gap-1.5 md:translate-x-4"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navLinks.map((link, idx) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="text-[13px] font-medium relative px-3.5 py-1.5 rounded-full transition-colors duration-200"
                  style={{
                    color: hoveredIndex === idx ? "var(--fg)" : "var(--fg-muted)",
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]/[0.06] border border-[var(--accent)]/[0.12]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme toggle */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <AnimatedThemeToggler isDark={currentIsDark} onToggle={handleToggle} />
              </div>

              <span
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--fg-muted)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                Open to Quant & SWE & AI/ML Roles
              </span>
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-colors"
                style={{ backgroundColor: "var(--accent)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.button>

              {/* Restore Table of Contents Button (only rendered when TOC is hidden) */}
              <AnimatePresence>
                {!isTOCVisible && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restoreTOC}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all cursor-pointer shadow-sm shrink-0"
                    title="Restore Table of Contents"
                  >
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <AnimatedThemeToggler isDark={currentIsDark} onToggle={handleToggle} />
              </div>

              {/* Mobile Table of Contents Restore Button */}
              <AnimatePresence>
                {!isTOCVisible && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restoreTOC}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all cursor-pointer shrink-0"
                    title="Restore Table of Contents"
                  >
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
