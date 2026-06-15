import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Link2, ExternalLink } from "lucide-react";
import {
  QMSection,
  EASE_OUT_EXPO,
  REVEAL_ITEM_RM,
} from "./QuantPrimitives";
import ContactForm from "../ContactForm";

/* ─────────────────────────────────────────────────────────────────────────
 * QMSignal (Task 9) — reworks the former QuantCTA closer in place.
 * Closing philosophy strip with a word-by-word reveal (staggered) on
 * scroll-into-view; under reduced motion it collapses to a single opacity
 * fade. Contact affordances (email + links) follow: external links open in a
 * new tab with rel="noreferrer". No gradient text (no background-clip:text).
 * Uses QMSection + motion constants (EASE_OUT_EXPO / REVEAL_ITEM_RM).
 * ───────────────────────────────────────────────────────────────────────── */

// ⚠️ Replace contact details with real values.
const DEFAULT_EMAIL = "mananshah.ms.01@gmail.com";
const DEFAULT_LINKS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mananshah001/" },
  { label: "GitHub", href: "https://github.com/MananShah05" },
];

const DEFAULT_PHILOSOPHY =
  "Markets reward those who respect risk, model honestly, and ship the systems that run the models.";

/** Word-stagger container — staggers each word ~55ms once the section is in
 *  view. (Inherits the "show" state propagated by QMSection.) */
const WORD_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

/** A single word: short upward fade on ease-out-expo. */
const WORD_ITEM = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

/** Pick a lucide icon for a known link label; fall back to a generic one.
 *  Brand icons (Github, Linkedin) were removed from lucide-react ≥0.400;
 *  we use Link2 for social profiles and ExternalLink for everything else. */
const linkIcon = (label: string) => {
  const key = label.toLowerCase();
  if (key.includes("linkedin") || key.includes("github")) return Link2;
  return ExternalLink;
};

export interface QMSignalProps {
  /** Closing statement, revealed word-by-word. */
  philosophy?: string;
  /** Contact email (rendered as a mailto affordance). */
  email?: string;
  /** External contact links; opened in a new tab with rel="noreferrer". */
  links?: { label: string; href: string }[];
}

export const QMSignal: React.FC<QMSignalProps> = ({
  philosophy = DEFAULT_PHILOSOPHY,
  email = DEFAULT_EMAIL,
  links = DEFAULT_LINKS,
}) => {
  const reduce = useReducedMotion();
  const words = philosophy.split(" ");

  return (
    <QMSection id="contact" eyebrow="SIGNAL">
      {/* Top: Full-width philosophy strip */}
      <div className="mb-16">
        {reduce ? (
          // Reduced motion: a single opacity fade for the whole statement.
          <motion.p
            variants={REVEAL_ITEM_RM}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-(--fg) max-w-4xl"
          >
            {philosophy}
          </motion.p>
        ) : (
          // Word-by-word staggered reveal (inherits "show" from QMSection).
          <motion.p
            variants={WORD_CONTAINER}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-(--fg) max-w-4xl"
          >
            {words.map((word, i) => (
              <motion.span key={`${word}-${i}`} variants={WORD_ITEM} className="inline-block mr-[0.28em]">
                {word}
              </motion.span>
            ))}
          </motion.p>
        )}
      </div>

      {/* Bottom: Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Direct Connection Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="qm-card p-8 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-(--fg)">
                Direct Connection
              </h3>
              <p className="text-sm text-(--fg-muted) mb-8 leading-relaxed">
                Have an interesting project, quantitative strategy collaboration, or opportunity? Let's connect. I'm always open to discussing research and applied intelligence.
              </p>

              {/* Direct Email Block */}
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-2 text-(--fg-subtle)">
                  Direct Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 text-base md:text-lg font-mono tracking-tight font-semibold text-(--fg) hover:text-[var(--accent)] transition-colors duration-300"
                >
                  <span className="relative whitespace-nowrap">
                    {email}
                    <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                </a>
              </div>

              {/* Status Block */}
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-2 text-(--fg-subtle)">
                  Current Status
                </span>
                <div className="status-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[var(--glass-border)] text-xs font-mono text-(--fg-muted)">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>Based in Mumbai • Open to Quant & SWE & AI/ML Roles</span>
                </div>
              </div>
            </div>

            {/* Social Links Block */}
            <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-3 text-(--fg-subtle)">
                Connect Channels
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${email}`}
                  className="qm-card rounded-2xl px-4 py-3 inline-flex items-center gap-2.5 font-mono text-sm text-(--fg)"
                >
                  <Mail size={15} style={{ color: "var(--accent)" }} />
                  Email
                </a>

                {links.map((link) => {
                  const Icon = linkIcon(link.label);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="qm-card rounded-2xl px-4 py-3 inline-flex items-center gap-2.5 font-mono text-sm text-(--fg)"
                    >
                      <Icon size={15} style={{ color: "var(--accent)" }} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 w-full">
          <ContactForm />
        </div>
      </div>
    </QMSection>
  );
};

export default QMSignal;
