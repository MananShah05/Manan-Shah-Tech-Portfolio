import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Zap, Target, TrendingUp, Clock, GitCommit, Rocket, Shield, Brain, Award, FileText, Globe } from "lucide-react";

interface FloatingCardProps {
  children: ReactNode;
  positionClass: string;
  delay?: number;
  pointerX: any;
  pointerY: any;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pointerActiveRef?: React.MutableRefObject<boolean>;
}

function FloatingCard({ children, positionClass, delay = 0, pointerX, pointerY, containerRef, pointerActiveRef }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 22 });
  const y = useSpring(0, { stiffness: 180, damping: 22 });
  const baseCenter = useRef({ x: 0, y: 0 });
  const baseRadius = useRef(1);
  

  useEffect(() => {
    // compute base center relative to container center once
    if (cardRef.current && containerRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const cx = rect.left - containerRect.left + rect.width / 2;
      const cy = rect.top - containerRect.top + rect.height / 2;
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      const relX = cx - centerX;
      const relY = cy - centerY;
      baseCenter.current = { x: relX, y: relY };
      const r = Math.sqrt(relX * relX + relY * relY) || 1;
      baseRadius.current = r;
      // base angle/orbit disabled — cards stay anchored unless repelled
    }

    let raf = 0;

    // repulsion parameters (tweakable)
    const influenceRadius = 220; // px
    const tangentialStrength = 140; // px repulsion along edge
    const radialStrength = 20; // px slight radial push

    const loop = (_now: number) => {

      // no orbital rotation

      const baseX = baseCenter.current.x;
      const baseY = baseCenter.current.y;
      const r = baseRadius.current || 1;
      const radX = baseX / r;
      const radY = baseY / r;
      const tanX = -radY;
      const tanY = radX;

      // no idle orbital motion — keep a subtle bob via CSS only
      const idleTx = 0;
      const idleTy = 0;

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const px = pointerX.get();
      const py = pointerY.get();
      const pxc = px - containerRect.width / 2;
      const pyc = py - containerRect.height / 2;

      const vx = baseX - pxc;
      const vy = baseY - pyc;
      const dist = Math.sqrt(vx * vx + vy * vy);

      let repX = 0;
      let repY = 0;

      if (pointerActiveRef?.current && dist < influenceRadius && dist > 0.1) {
        const proximity = Math.pow((influenceRadius - dist) / influenceRadius, 2);
        const tangentialDelta = proximity * tangentialStrength;
        const radialDelta = proximity * radialStrength;
        repX = tanX * tangentialDelta + radX * radialDelta;
        repY = tanY * tangentialDelta + radY * radialDelta;
      }

      const finalX = idleTx + repX;
      const finalY = idleTy + repY;

      x.set(finalX);
      y.set(finalY);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pointerX, pointerY, x, y, containerRef]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`absolute ${positionClass} z-30 pointer-events-none`}
      style={{ x, y }}
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="floating-metric-card rounded-xl px-4 py-2.5 flex items-center gap-3">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const statusLines = [
  { key: "status", value: "building in public", icon: <Rocket size={11} /> },
  { key: "focus", value: "AI systems for real-world workflows", icon: <Target size={11} /> },
  { key: "current", value: "portfolio • resume • semantic search", icon: <Zap size={11} /> },
  { key: "mode", value: "research + implementation", icon: <GitCommit size={11} /> },
  { key: "signal", value: "high curiosity / high execution", icon: <TrendingUp size={11} /> },
  { key: "last deploy", value: "2 hours ago", icon: <Clock size={11} /> },
];

const personalityTags = [
  { label: "Developer mode: ON", icon: <Zap size={10} /> },
  { label: "Systems thinker", icon: <Target size={10} /> },
  { label: "Finance-aware engineer", icon: <Shield size={10} /> },
  { label: "Ships before it's perfect", icon: <Rocket size={10} /> },
];

export default function DeveloperDashboard() {
  const [activeLine, setActiveLine] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerActiveRef = useRef(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
    pointerActiveRef.current = true;
  };

  const handlePointerLeave = () => {
    pointerActiveRef.current = false;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // move pointer to off-center so repulsion doesn't trigger
    pointerX.set(rect.width / 2);
    pointerY.set(rect.height / 2);
  };

  // Global pointer tracking so cards react when pointer is near them (even outside container)
  useEffect(() => {
    const handleGlobalMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointerX.set(e.clientX - rect.left);
      pointerY.set(e.clientY - rect.top);
      pointerActiveRef.current = true;
    };

    const handleGlobalOut = () => {
      pointerActiveRef.current = false;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointerX.set(rect.width / 2);
      pointerY.set(rect.height / 2);
    };

    window.addEventListener("pointermove", handleGlobalMove, { passive: true });
    window.addEventListener("pointerout", handleGlobalOut);
    return () => {
      window.removeEventListener("pointermove", handleGlobalMove);
      window.removeEventListener("pointerout", handleGlobalOut);
    };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const line = statusLines[activeLine];
    const fullText = `> ${line.key}: ${line.value}`;
    let charIdx = 0;
    setTypedText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        setTypedText(fullText.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setActiveLine((prev) => (prev + 1) % statusLines.length);
        }, 2200);
      }
    }, 35 + Math.random() * 20);

    return () => clearInterval(typeInterval);
  }, [activeLine]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full lg:max-w-lg mx-auto"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 4 Floating Metric Cards */}
      <FloatingCard positionClass="top-[-40px] right-[-60px] md:top-[-20px] md:right-[-90px]" delay={1.4} pointerX={pointerX} pointerY={pointerY} containerRef={containerRef} pointerActiveRef={pointerActiveRef}>
        <span className="text-(--accent)"><Brain size={14} /></span>
        <div>
          <div className="font-mono text-sm font-bold text-(--fg)">5+</div>
          <div className="text-[9px] uppercase tracking-wider text-(--fg-subtle)">Projects</div>
        </div>
      </FloatingCard>

      <FloatingCard positionClass="top-[120px] right-[-40px] md:top-[160px] md:right-[-70px]" delay={1.6} pointerX={pointerX} pointerY={pointerY} containerRef={containerRef} pointerActiveRef={pointerActiveRef}>
        <span className="text-(--secondary)"><Award size={14} /></span>
        <div>
          <div className="font-mono text-sm font-bold text-(--fg)">3+</div>
          <div className="text-[9px] uppercase tracking-wider text-(--fg-subtle)">Experience</div>
        </div>
      </FloatingCard>

      <FloatingCard positionClass="bottom-[-30px] left-[-30px] md:bottom-[-20px] md:left-[-70px]" delay={1.8} pointerX={pointerX} pointerY={pointerY} containerRef={containerRef} pointerActiveRef={pointerActiveRef}>
        <span className="text-(--accent)"><FileText size={14} /></span>
        <div>
          <div className="font-mono text-sm font-bold text-(--fg)">1</div>
          <div className="text-[9px] uppercase tracking-wider text-(--fg-subtle)">Research</div>
        </div>
      </FloatingCard>

      <FloatingCard positionClass="top-[-30px] left-[-20px] md:top-[-10px] md:left-[-60px]" delay={2.0} pointerX={pointerX} pointerY={pointerY} containerRef={containerRef} pointerActiveRef={pointerActiveRef}>
        <span className="text-(--fg-subtle)"><Globe size={14} /></span>
        <div>
          <div className="font-mono text-xs font-bold text-(--fg)">Applied AI</div>
          <div className="text-[9px] uppercase tracking-wider text-(--fg-subtle)">Focus</div>
        </div>
      </FloatingCard>

      {/* Main Dashboard Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="glass-light rounded-2xl overflow-hidden relative z-10"
        style={{ border: "1px solid var(--glass-border)", boxShadow: "0 0 30px var(--accent-glow)" }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid var(--glass-border)", backgroundColor: "rgba(26, 26, 24, 0.015)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--secondary)", opacity: 0.7 }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--taupe)", opacity: 0.4 }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)", opacity: 0.5 }} />
            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: "var(--fg-subtle)" }}>
              developer.dashboard
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "var(--accent)", opacity: 0.6 }}>
              Live
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Main status area */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "rgba(26, 26, 24, 0.02)", border: "1px solid var(--glass-border)" }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: "var(--fg-subtle)" }}>
              System Status
            </div>

            {/* Previous lines (faded) */}
            <div className="space-y-1 mb-2">
              {statusLines
                .slice(0, activeLine)
                .concat(activeLine === 0 ? [] : statusLines.slice(0, activeLine))
                .slice(-3)
                .map((line, i) => (
                  <div
                    key={`${line.key}-${i}`}
                    className="font-mono text-[11px] leading-relaxed"
                    style={{ color: "var(--fg-subtle)", opacity: 0.5 }}
                  >
                    <span style={{ color: "var(--accent)", opacity: 0.3 }}>{`> ${line.key}:`}</span>{" "}
                    {line.value}
                  </div>
                ))}
            </div>

            {/* Currently typing line */}
            <div className="flex items-start gap-2">
              <span style={{ color: "var(--accent)", opacity: 0.5 }} className="mt-0.5">
                {statusLines[activeLine]?.icon}
              </span>
              <div className="font-mono text-[11px] leading-relaxed min-h-[18px]" style={{ color: "var(--fg-muted)" }}>
                {typedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-[5px] h-[13px] ml-0.5 align-middle"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.4 }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Personality tags */}
          <div className="flex flex-wrap gap-2">
            {personalityTags.map((tag, i) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono cursor-default"
                style={{
                  backgroundColor: "rgba(45, 106, 79, 0.06)",
                  border: "1px solid rgba(45, 106, 79, 0.12)",
                  color: "var(--accent)",
                }}
              >
                {tag.icon}
                <span>{tag.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Live counter widget */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(to right, rgba(45, 106, 79, 0.05), rgba(196, 92, 38, 0.03))",
              border: "1px solid rgba(45, 106, 79, 0.1)",
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: "var(--fg-subtle)" }}>
                  Build Streak
                </div>
                <div className="flex items-baseline gap-1.5">
                  <motion.span
                    className="font-mono text-3xl font-bold tabular-nums"
                    style={{ color: "var(--fg)" }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    847
                  </motion.span>
                  <span className="text-[11px] font-mono" style={{ color: "var(--fg-subtle)" }}>
                    days
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: "var(--fg-subtle)" }}>
                  This Month
                </div>
                <div className="flex items-baseline gap-1 justify-end">
                  <motion.span
                    className="font-mono text-xl font-bold tabular-nums"
                    style={{ color: "var(--accent)" }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    142
                  </motion.span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--fg-subtle)" }}>
                    commits
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 rounded-full overflow-hidden relative z-10" style={{ backgroundColor: "rgba(26, 26, 24, 0.05)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{ duration: 2, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex justify-between mt-1.5 relative z-10">
              <span className="text-[9px] font-mono" style={{ color: "var(--fg-subtle)" }}>
                momentum
              </span>
              <span className="text-[9px] font-mono" style={{ color: "var(--accent)", opacity: 0.6 }}>
                high
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
