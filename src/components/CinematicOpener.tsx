import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Config ─── */
const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_DURATION = 4800; // ms before auto-dismiss

/* ─── Particle Network Canvas ─── */
function ParticleNetwork({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const mouseRef = useRef({ x: width / 2, y: height / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const COUNT = 60;
    const CONNECT = 140;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Update & draw nodes
      for (const n of nodes) {
        n.x += n.vx + Math.sin(t + n.pulse) * 0.15;
        n.y += n.vy + Math.cos(t + n.pulse) * 0.15;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));

        const glow = 0.3 + Math.sin(t * 2 + n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${glow})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.06 * (1 - d / CONNECT)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse glow
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, position: "absolute", inset: 0 }}
    />
  );
}

/* ─── Scan Ring ─── */
function ScanRing() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 320, height: 320,
        left: "50%", top: "50%",
        marginLeft: -160, marginTop: -160,
        borderRadius: "50%",
        border: "1px solid rgba(56, 189, 248, 0.08)",
      }}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: [0.7, 1.1, 1.15], opacity: [0, 0.4, 0] }}
      transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
    >
      {/* Rotating arc */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid transparent",
          borderTopColor: "rgba(56, 189, 248, 0.35)",
          borderRightColor: "rgba(56, 189, 248, 0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/* ─── Main Opener ─── */
interface CinematicOpenerProps {
  onComplete: () => void;
}

function useCinematicAudio() {
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Resume context in case it's suspended (works if user previously interacted)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // 1. Deep Sub Bass Impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(100, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 2.5);
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(ctx.currentTime);
      subOsc.stop(ctx.currentTime + 3);

      // 2. High-tech Startup Hum (Metallic pad)
      const humOsc = ctx.createOscillator();
      const humGain = ctx.createGain();
      humOsc.type = "sawtooth";
      humOsc.frequency.setValueAtTime(55, ctx.currentTime);
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 2);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 4);

      humGain.gain.setValueAtTime(0, ctx.currentTime);
      humGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5);
      humGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);

      humOsc.connect(filter);
      filter.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start(ctx.currentTime);
      humOsc.stop(ctx.currentTime + 4);

      // 3. Digital "Scan" Pings
      const playPing = (delay: number, freq: number) => {
        const pingOsc = ctx.createOscillator();
        const pingGain = ctx.createGain();
        pingOsc.type = "sine";
        pingOsc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        pingOsc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + delay + 0.1);
        pingGain.gain.setValueAtTime(0, ctx.currentTime + delay);
        pingGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.05);
        pingGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.8);
        pingOsc.connect(pingGain);
        pingGain.connect(ctx.destination);
        pingOsc.start(ctx.currentTime + delay);
        pingOsc.stop(ctx.currentTime + delay + 0.8);
      };

      playPing(0.9, 1200); // Matches "Manan" reveal
      playPing(1.15, 1600); // Matches "Shah" reveal

      return () => {
        if (ctx.state !== "closed") {
          ctx.close();
        }
      };
    } catch (e) {
      console.log("Audio playback failed or blocked by browser.", e);
    }
  }, []);
}

export default function CinematicOpener({ onComplete }: CinematicOpenerProps) {
  useCinematicAudio();
  const [phase, setPhase] = useState<"intro" | "exit">("intro");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure
  useEffect(() => {
    const measure = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(() => setPhase("exit"), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, []);

  // Skip on click
  const handleSkip = useCallback(() => setPhase("exit"), []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" ? null : null}
      {/* Always render, use motion exit */}
      <motion.div
        key="opener"
        ref={containerRef}
        onClick={handleSkip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSkip();
          }
        }}
        tabIndex={0}
        aria-label="Cinematic Opener. Click or press Enter to skip."
        className="fixed inset-0 flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        style={{ zIndex: 9999, background: "#06080d" }}
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(12px)",
        }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.04, filter: "blur(12px)" } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        onAnimationComplete={() => {
          if (phase === "exit") onComplete();
        }}
      >
        {/* ── BG: Gradient base ── */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, rgba(15, 23, 42, 1) 0%, #06080d 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* ── BG: Particle network ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          {dims.w > 0 && <ParticleNetwork width={dims.w} height={dims.h} />}
        </motion.div>

        {/* ── BG: Faint grid ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── BG: Ambient orbs ── */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            left: "50%", top: "45%", marginLeft: -300, marginTop: -300,
            background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Sweep line ── */}
        <motion.div
          className="absolute left-0 h-[1px] pointer-events-none"
          style={{
            top: "50%",
            background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.5) 50%, transparent 100%)",
          }}
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "100%", opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, delay: 0.5, ease: EASE }}
        />

        {/* ── Scan ring ── */}
        <ScanRing />

        {/* ── Center content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Status tag */}
          <motion.div
            className="flex items-center gap-2 mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#38bdf8" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(148, 163, 184, 0.6)",
              }}
            >
              Initializing identity…
            </span>
          </motion.div>

          {/* Name: "Manan" */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "120%", opacity: 0, filter: "blur(16px)", letterSpacing: "0.1em" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)", letterSpacing: "-0.02em" }}
              transition={{ duration: 1.3, delay: 0.9, ease: EASE }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(3.8rem, 10vw, 8rem)",
                lineHeight: 0.95,
                color: "#f1f5f9",
                textShadow: "0 0 80px rgba(56,189,248,0.15), 0 0 160px rgba(56,189,248,0.05)",
              }}
            >
              Manan
            </motion.h1>
          </div>

          {/* Name: "Shah" */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "120%", opacity: 0, filter: "blur(16px)", letterSpacing: "0.1em" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)", letterSpacing: "-0.02em" }}
              transition={{ duration: 1.3, delay: 1.15, ease: EASE }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(3.8rem, 10vw, 8rem)",
                lineHeight: 0.95,
                color: "#f1f5f9",
                textShadow: "0 0 80px rgba(56,189,248,0.15), 0 0 160px rgba(56,189,248,0.05)",
              }}
            >
              Shah
            </motion.h1>
          </div>

          {/* Underline */}
          <motion.div
            className="mt-5 h-[1.5px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(56,189,248,0.2), transparent)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.0, ease: EASE }}
          />

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 2.4, ease: EASE }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              letterSpacing: "0.08em",
              color: "rgba(148, 163, 184, 0.55)",
              marginTop: 28,
            }}
          >
            AI/ML Developer · Research-Oriented · Final Year IT Engineer
          </motion.p>

          {/* Skip hint */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(148, 163, 184, 0.4)",
              marginTop: 48,
            }}
          >
            Click anywhere to enter
          </motion.span>
        </div>

        {/* ── Corner accents ── */}
        {/* Top-left */}
        <motion.div
          className="absolute top-8 left-8 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div style={{
            width: 24, height: 24,
            borderLeft: "1px solid rgba(56,189,248,0.3)",
            borderTop: "1px solid rgba(56,189,248,0.3)",
          }} />
        </motion.div>
        {/* Bottom-right */}
        <motion.div
          className="absolute bottom-8 right-8 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div style={{
            width: 24, height: 24,
            borderRight: "1px solid rgba(56,189,248,0.3)",
            borderBottom: "1px solid rgba(56,189,248,0.3)",
          }} />
        </motion.div>

        {/* ── Bottom status bar ── */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          {["SYSTEM READY", "NLP CORE ACTIVE", "v2.4.1"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(56,189,248,0.35)",
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
