import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 md:py-16 mt-8" style={{ borderTop: "1px solid var(--glass-border)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

        {/* Brand & Copyright */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="font-serif text-3xl font-normal tracking-tight" style={{ color: "var(--fg)" }}>
              Manan Shah
            </div>
            <div className="text-[12px] mt-2 font-mono uppercase tracking-widest font-medium" style={{ color: "var(--fg-subtle)" }}>
              AI/ML Engineer · Full Stack · UI UX Designer
            </div>
          </div>
          <div className="text-[11px] font-mono tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>
            © {new Date().getFullYear()} — Made with ❤️.
          </div>
        </div>

        {/* Social & Back to top */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex gap-3">
            <a href="https://github.com/Technova100" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/mananshah001/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://x.com/01Mananshah" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://youtube.com/@mananshah" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"></path><polygon points="10 15 15 12 10 9" fill="currentColor"></polygon></svg>
            </a>
            <a href="https://instagram.com/mananshah" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
          <div className="w-px h-8 bg-[var(--glass-border)] hidden md:block" />
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl glass-light flex items-center justify-center transition-colors shadow-sm"
            style={{ color: "var(--fg)", border: "1px solid var(--glass-border)" }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
