import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import App from "./App";
import "./index.css";

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll is desktop-only. On touch devices, native momentum
    // scrolling is already hardware-accelerated, and Lenis's rAF-driven easing
    // fires continuous micro-scroll events that break scroll-dependent UI
    // (like the dock collapse/expand).
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </StrictMode>
);
