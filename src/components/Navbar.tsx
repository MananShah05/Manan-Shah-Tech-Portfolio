import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
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
              className="hidden md:flex items-center gap-1.5 md:translate-x-16"
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
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--fg-muted)",
                }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={15} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={15} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

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
                Open to AI/ML & SWE Roles
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
            </div>

            <div className="flex md:hidden items-center gap-2">
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--fg)",
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Moon size={15} /> : <Sun size={15} />}
              </motion.button>
              <button
                className="p-2"
                style={{ color: "var(--fg)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              backgroundColor: "var(--bg)",
              opacity: 0.97,
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-serif italic transition-colors"
                  style={{ color: "var(--fg)" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
