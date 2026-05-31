"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 py-3 border-2 ${
            isScrolled
              ? "bg-bg/90 backdrop-blur-xl border-border"
              : "bg-transparent border-transparent"
          }`}
        >
          <a
            href="#hero"
            className="font-display text-xl font-bold uppercase tracking-tighter text-ink hover:text-accent transition-colors duration-300"
          >
            Manan <span className="text-accent">Shah</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggle}
              className="p-2 text-ink-muted hover:text-accent transition-colors duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center pl-6 border-l-2 border-border">
              <a
                href="#contact"
                className="group flex items-center gap-2 px-6 py-3 bg-ink text-bg text-xs font-bold uppercase tracking-tighter hover:bg-accent hover:text-accent-ink transition-all duration-300 active:scale-95"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 text-ink-muted hover:text-accent transition-colors duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-ink hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={2} />
              ) : (
                <Menu size={24} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full px-6 pt-2 pb-6 md:hidden"
          >
            <div className="bg-bg/95 backdrop-blur-xl border-2 border-border p-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold uppercase tracking-tighter text-ink hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t-2 border-border">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full px-6 py-4 bg-ink text-bg text-lg font-bold uppercase tracking-tighter hover:bg-accent hover:text-accent-ink transition-all duration-300"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
