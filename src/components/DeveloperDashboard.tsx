import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Target, TrendingUp, Clock, GitCommit, Rocket, Shield } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function AnimatedCounter({ target, suffix = "", label, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center"
    >
      <motion.div
        className="font-mono text-2xl md:text-3xl font-bold tabular-nums"
        style={{ color: "var(--fg)" }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-[9px] font-mono uppercase tracking-[0.2em] mt-1" style={{ color: "var(--fg-subtle)" }}>
        {label}
      </div>
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-light rounded-2xl overflow-hidden"
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
        {/* Stat counters row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(45, 106, 79, 0.06)", border: "1px solid rgba(45, 106, 79, 0.1)" }}>
            <AnimatedCounter target={5} suffix="+" label="Projects" delay={1600} />
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(196, 92, 38, 0.06)", border: "1px solid rgba(196, 92, 38, 0.1)" }}>
            <AnimatedCounter target={1} label="Research" delay={1800} />
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(45, 106, 79, 0.06)", border: "1px solid rgba(45, 106, 79, 0.1)" }}>
            <AnimatedCounter target={3} suffix="+" label="Experience" delay={2000} />
          </div>
        </div>

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
              transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
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
          transition={{ delay: 2.5 }}
          className="rounded-xl p-4"
          style={{
            background: "linear-gradient(to right, rgba(45, 106, 79, 0.05), rgba(196, 92, 38, 0.03))",
            border: "1px solid rgba(45, 106, 79, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
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
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(26, 26, 24, 0.05)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
              initial={{ width: "0%" }}
              animate={{ width: "78%" }}
              transition={{ duration: 2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
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
  );
}
