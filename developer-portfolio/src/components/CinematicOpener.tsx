import { useEffect, useRef, useCallback } from "react";

/* ─── Config ─── */
const GREETINGS = ["Build.", "Ship.", "Analyze.", "Model.", "Manan Shah."];
const HOLD = 375; // ms each greeting holds
const ARC_DURATION = 1100; // ms for the wipe arc (speed up from 2000ms)

interface CinematicOpenerProps {
  onComplete: () => void;
}

export default function CinematicOpener({ onComplete }: CinematicOpenerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  const timersRef = useRef<number[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  // Stable reference to onComplete so the sequence effect runs once.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const greetEl = greetRef.current;
    const subEl = subRef.current;
    const arcPath = arcRef.current;
    if (!overlay || !greetEl || !subEl || !arcPath) return;

    // Clear initial content from HTML to avoid double flash
    greetEl.textContent = "";
    subEl.style.opacity = "0";

    const timers = timersRef.current;
    const pushTimer = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const setArc = (p: number) => {
      const edge = -30 + p * 140;
      const ctrl = edge - 25;
      arcPath.setAttribute(
        "d",
        `M 0 ${edge} Q 50 ${ctrl} 100 ${edge} L 100 -30 L 0 -30 Z`
      );
    };

    const animateArc = (onDone: () => void) => {
      const start = performance.now();
      const ease = (t: number) => {
        t = Math.min(Math.max(t, 0), 1);
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      const frame = (now: number) => {
        const t = Math.min((now - start) / ARC_DURATION, 1);
        setArc(ease(t));
        if (t < 1) animFrameRef.current = requestAnimationFrame(frame);
        else onDone();
      };
      animFrameRef.current = requestAnimationFrame(frame);
    };

    const showGreeting = (text: string, isName: boolean, onShown: () => void) => {
      const fadeOut = (callback: () => void) => {
        if (greetEl.textContent) {
          greetEl.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          greetEl.style.opacity = "0";
          greetEl.style.transform = "translateY(-12px)";
          pushTimer(callback, 400);
        } else {
          callback();
        }
      };

      fadeOut(() => {
        greetEl.style.transition = "none";
        greetEl.style.opacity = "0";
        greetEl.style.transform = "translateY(12px)";
        greetEl.textContent = text;

        // Force reflow
        void greetEl.offsetHeight;

        greetEl.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        greetEl.style.opacity = "1";
        greetEl.style.transform = "translateY(0)";

        if (isName) {
          subEl.style.transition = "opacity 0.8s ease 0.3s";
          subEl.style.opacity = "1";
        }
        onShown();
      });
    };

    const cycleGreetings = (idx: number, onDone: () => void) => {
      const isLast = idx === GREETINGS.length - 1;
      showGreeting(GREETINGS[idx], isLast, () => {
        const hold = isLast ? HOLD + 1000 : HOLD;
        pushTimer(() => {
          if (isLast) {
            onDone();
            return;
          }
          cycleGreetings(idx + 1, onDone);
        }, hold);
      });
    };

    const startSequence = () => {
      setArc(0);
      cycleGreetings(0, () => {
        animateArc(() => {
          overlay.style.transition = "opacity 0.25s ease";
          overlay.style.opacity = "0";
          pushTimer(() => {
            overlay.style.display = "none";
            finish();
          }, 300);
        });
      });
    };

    startSequence();

    return () => {
      timers.forEach((id) => clearTimeout(id));
      timersRef.current = [];
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [finish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        overflow: "hidden",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>{`
        @keyframes drawLines {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes slowRotate {
          0% {
            transform: rotate(0deg) scale(0.95);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(0.95);
          }
        }
        @keyframes fastRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
      <div
        ref={overlayRef}
        onClick={finish}
        role="button"
        tabIndex={0}
        aria-label="Intro animation. Click to skip."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            finish();
          }
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            ref={greetRef}
            style={{
              fontSize: "clamp(56px, 9vw, 96px)",
              fontWeight: 600,
              color: "#000000",
              letterSpacing: "-0.02em",
              userSelect: "none",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(12px)",
            }}
          >
            Build.
          </span>
          <span
            ref={subRef}
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#000000",
              opacity: 0,
              transition: "opacity 0.4s ease 0.1s",
              userSelect: "none",
            }}
          >
            Gen AI · Full Stack · Quant
          </span>
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            ref={arcRef}
            fill="#050505"
            d="M 0 -30 Q 50 -55 100 -30 L 100 -30 L 0 -30 Z"
          />
        </svg>
      </div>
    </div>
  );
}
