import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicked = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.classList.contains("cursor-pointer")
      ) {
        isHovering.current = true;
      }
    };

    const onOut = () => {
      isHovering.current = false;
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let raf: number;
    const animate = () => {
      const ease = 0.16;

      vel.current.x = target.current.x - pos.current.x;
      vel.current.y = target.current.y - pos.current.y;

      pos.current.x += vel.current.x * ease;
      pos.current.y += vel.current.y * ease;

      const stretch = Math.min(
        Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2) * 0.025,
        0.4
      );
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      if (dotRef.current) {
        let dotScale = 1;
        if (isClicked.current) {
          dotScale = 1.4;
        } else if (isHovering.current) {
          dotScale = 0.4;
        }
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px) scale(${dotScale})`;
      }

      if (ringRef.current) {
        let ringScale = 1 + stretch * 0.25;
        if (isClicked.current) {
          ringScale = 0.7;
        } else if (isHovering.current) {
          ringScale = 1.8;
        }
        ringRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px) rotate(${angle}deg) scale(${ringScale})`;
        ringRef.current.style.backgroundColor = isHovering.current ? "rgba(255, 255, 255, 0.15)" : "transparent";
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference"
        style={{
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] border border-white mix-blend-difference transition-colors duration-300"
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
}
