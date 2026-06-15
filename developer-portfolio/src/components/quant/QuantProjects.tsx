import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsByDomain, type Project } from "../../data/projects";
import { QMSection, QMCard, QMChip, QMLabel, REVEAL_ITEM, REVEAL_ITEM_RM } from "./QuantPrimitives";

/* ─────────────────────────────────────────────────────────────────────────
 * QMProjects + QMProjectCard (Task 7 — reworks QuantProjects in place)
 * 2-column grid of quant project cards sourced solely from
 * projectsByDomain("quant") — no inline/duplicated project data literals.
 * ───────────────────────────────────────────────────────────────────────── */

export interface QMProjectCardProps {
  project: Project;
  index: number;
}

/** Single project card: parses the "Name — Tagline" title, surfaces methodology
 *  chips before stack, and renders external links (target=_blank rel=noreferrer).
 *  Hover lift/spring is provided by QMCard (framer spring, not CSS transform). */
export const QMProjectCard: React.FC<QMProjectCardProps> = ({ project, index }) => {
  // Title convention is "Name — Tagline"; fall back gracefully if absent.
  const [name, tagline] = project.title.split(" — ");

  return (
    <QMCard className="flex flex-col gap-4 h-full">
      <div className="flex items-start gap-3">
        <span className="font-mono text-[11px] text-(--fg-subtle) pt-1 w-6 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl tracking-tight text-(--fg)">{name}</h3>
          {tagline && <p className="text-sm text-(--fg-subtle) mt-0.5">{tagline}</p>}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-(--fg-muted)">{project.summary}</p>

      {/* Methodology chips — surfaced before stack */}
      {project.methods.length > 0 && (
        <div>
          <QMLabel className="block mb-2">Methods</QMLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.methods.map((m) => (
              <QMChip key={m} tone="accent">
                {m}
              </QMChip>
            ))}
          </div>
        </div>
      )}

      {/* Stack */}
      {project.stack.length > 0 && (
        <div>
          <QMLabel className="block mb-2">Stack</QMLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] px-2 py-0.5 rounded-md border text-(--fg-subtle) whitespace-nowrap"
                style={{ borderColor: "var(--glass-border)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links — external opened safely in a new tab */}
      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-auto pt-2">
          {project.links.map((l) =>
            l.url === "#" ? (
              <span
                key={l.label}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-(--fg-subtle)"
              >
                {l.label}
              </span>
            ) : (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                {l.label}
                <ArrowUpRight size={12} />
              </a>
            )
          )}
        </div>
      )}
    </QMCard>
  );
};

/** Projects section: 2-column responsive grid sourced from the single quant
 *  data source. Renders an empty-state message when no projects exist. */
export const QMProjects: React.FC = () => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;
  const quantProjects = projectsByDomain("quant");

  return (
    <QMSection id="projects" eyebrow="MODELS & PLATFORMS" title="Quantitative systems, shipped.">
      {quantProjects.length === 0 ? (
        <p className="text-sm text-(--fg-muted)">No projects to display yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {quantProjects.map((p, i) => (
            <motion.div key={p.title} variants={itemVariants}>
              <QMProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </div>
      )}
    </QMSection>
  );
};

export default QMProjects;
