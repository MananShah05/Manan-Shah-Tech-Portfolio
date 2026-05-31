"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices to avoid sticky click states
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add trail point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Draw particle trail
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;

        // Fading opacity based on age
        const alpha = Math.max(0, 1 - p.age / 18);
        if (alpha <= 0) continue;

        ctx.strokeStyle = `rgba(223, 225, 4, ${alpha * 0.45})`;
        ctx.lineWidth = Math.max(1, 4 * alpha);
        ctx.lineCap = "round";

        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          // Smooth curve connecting lines
          const prev = points[i - 1];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + p.x) / 2, (prev.y + p.y) / 2);
        }
      }
      ctx.stroke();

      // Keep only active trail points
      pointsRef.current = points.filter((p) => p.age < 18);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* High-performance hardware accelerated Canvas mouse trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99] hidden md:block"
        style={{ mixBlendMode: "difference" }}
      />

      {/* Kinetic Typography interactive target ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 40 : 6,
          height: isHovering ? 40 : 6,
          backgroundColor: isHovering ? "transparent" : "#DFE104",
          border: isHovering
            ? "1.5px solid #DFE104"
            : "0px solid transparent",
        }}
        transition={{
          duration: 0.15,
          ease: [0.23, 1, 0.32, 1], // Emil Kowalski cubic bezier ease-out
        }}
      />
    </>
  );
}
