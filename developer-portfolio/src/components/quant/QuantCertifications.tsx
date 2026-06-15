import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QMSection, QMCard, QMChip, REVEAL_ITEM, REVEAL_ITEM_RM } from "./QuantPrimitives";
import { DEFAULT_CREDENTIALS, type Credential } from "./quantData";

/** Map credential status → human label + QMChip tone (neutral/accent only — no
 *  green-on-black terminal styling, no border-left stripes). */
const STATUS_META: Record<Credential["status"], { label: string; tone: "default" | "accent" }> = {
  verified: { label: "Verified", tone: "accent" },
  "in-progress": { label: "In Progress", tone: "default" },
  completed: { label: "Completed", tone: "accent" },
};

interface QMCertificationCardProps {
  credential: Credential;
}

const QMCertificationCard: React.FC<QMCertificationCardProps> = ({ credential }) => {
  const { title, org, status, icon, href } = credential;
  const meta = STATUS_META[status];

  const body = (
    <div className="flex items-start gap-4">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-sm font-bold text-(--fg)">{title}</span>
          <QMChip tone={meta.tone}>{meta.label}</QMChip>
        </div>
        <p className="text-[11px] leading-relaxed text-(--fg-subtle) mt-1.5">{org}</p>
      </div>
    </div>
  );

  return (
    <QMCard className="h-full">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </QMCard>
  );
};

export interface QMCertificationsProps {
  credentials?: Credential[];
}

export const QMCertifications: React.FC<QMCertificationsProps> = ({
  credentials = DEFAULT_CREDENTIALS,
}) => {
  const reduce = useReducedMotion();
  const itemVariants = reduce ? REVEAL_ITEM_RM : REVEAL_ITEM;

  return (
    <QMSection
      id="certifications"
      eyebrow="REGULATORY & DOMAIN"
      title="Credentials quant desks check first."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {credentials.map((c) => (
          <motion.div key={c.title} variants={itemVariants}>
            <QMCertificationCard credential={c} />
          </motion.div>
        ))}
      </div>
    </QMSection>
  );
};

export default QMCertifications;
