import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PortalRingProps {
  origin: { x: number; y: number } | null;
  active: boolean;
}

export const PortalRing: React.FC<PortalRingProps> = ({ origin, active }) => {
  const [maxRadius, setMaxRadius] = useState(1000);

  useEffect(() => {
    if (active) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dist = Math.sqrt(w * w + h * h);
      setMaxRadius(dist * 1.2);
    }
  }, [active]);

  if (!active || !origin) return null;

  return (
    <svg className="fixed inset-0 w-screen h-screen pointer-events-none z-[100] overflow-visible">
      <defs>
        <linearGradient id="portal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFE104" stopOpacity="1" /> {/* Creative Yellow */}
          <stop offset="50%" stopColor="#2d6a4f" stopOpacity="1" /> {/* Dev Green */}
          <stop offset="100%" stopColor="#f97316" stopOpacity="1" /> {/* Orange accent */}
        </linearGradient>
        
        <filter id="portal-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main expanding spark ring */}
      <motion.circle
        cx={origin.x}
        cy={origin.y}
        initial={{ r: 0, opacity: 0, strokeDasharray: "20 15" }}
        animate={{
          r: [0, maxRadius * 0.4, maxRadius],
          opacity: [0, 1, 0.9, 0],
          strokeDashoffset: [0, -300, -800],
          strokeWidth: [4, 18, 2],
        }}
        transition={{
          duration: 0.5, // 500ms duration (Tear Phase: 400ms - 900ms)
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
        fill="none"
        stroke="url(#portal-gradient)"
        filter="url(#portal-glow-filter)"
      />

      {/* Secondary outer rotating ring */}
      <motion.circle
        cx={origin.x}
        cy={origin.y}
        initial={{ r: 0, opacity: 0, strokeDasharray: "10 25" }}
        animate={{
          r: [0, maxRadius * 0.45, maxRadius * 1.05],
          opacity: [0, 0.8, 0.6, 0],
          strokeDashoffset: [100, 450, 900],
          strokeWidth: [2, 10, 1],
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        fill="none"
        stroke="url(#portal-gradient)"
        filter="url(#portal-glow-filter)"
      />

      {/* Internal electric sparks */}
      <motion.circle
        cx={origin.x}
        cy={origin.y}
        initial={{ r: 0, opacity: 0, strokeDasharray: "5 8" }}
        animate={{
          r: [0, maxRadius * 0.35, maxRadius * 0.95],
          opacity: [0, 1, 0],
          strokeDashoffset: [-50, -250, -500],
          strokeWidth: [5, 12, 1],
        }}
        transition={{
          duration: 0.48,
          ease: "easeInOut",
        }}
        fill="none"
        stroke="#ffffff"
      />
    </svg>
  );
};
