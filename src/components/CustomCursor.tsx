import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
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

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf: number;
    const animate = () => {
      const ease = 0.18;

      vel.current.x = target.current.x - pos.current.x;
      vel.current.y = target.current.y - pos.current.y;

      pos.current.x += vel.current.x * ease;
      pos.current.y += vel.current.y * ease;

      const stretch = Math.min(
        Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2) * 0.03,
        0.5
      );
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      }

      if (ringRef.current) {
        const scale = isHovering.current ? 2.2 : 1 + stretch * 0.3;
        ringRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px) rotate(${angle}deg) scale(${scale})`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#1b4332] pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#1b4332]/30 pointer-events-none z-[9998] mix-blend-difference transition-[border-color] duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
