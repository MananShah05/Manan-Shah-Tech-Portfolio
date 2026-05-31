"use client";

import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface LottieItemProps {
  name: string;
  url: string;
  index: number;
}

export function LottieItem({ name, url, index }: LottieItemProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch Lottie JSON from CDN
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Lottie asset");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => {
        console.warn(`Lottie JSON not found or blocked by CORS for ${name}, running SVG fallback:`, err);
        if (isMounted) setError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [url, name]);

  // RULE 3: UI Hover interactions play/stop using lottie refs
  // RULE 5: Hover durations are 200ms enter and 150ms exit (handled via CSS transition on the wrapper card)
  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.stop(); // stop and reset to frame 0
    }
  };

  // RULE 4: Animation easing - 50ms stagger scroll enter reveal
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1], // ease-out-strong
        delay: index * 0.05, // 50ms stagger
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col items-center justify-center p-6 border border-border bg-surface hover:border-accent transition-all duration-300 relative cursor-pointer min-h-[150px] select-none"
      style={{ transitionDuration: "200ms" }} // Hover enter (Rule 5)
    >
      <div className="w-16 h-16 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay={false}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        ) : error ? (
          <SVGFallbackIcon name={name} />
        ) : (
          <div className="w-6 h-6 border-2 border-transparent border-t-accent rounded-full animate-spin" />
        )}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted group-hover:text-accent font-bold mt-4 transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}

function SVGFallbackIcon({ name }: { name: string }) {
  if (name === "Cinema 4D") {
    // 3D wireframe cube representing C4D
    return (
      <svg className="w-10 h-10 text-ink-muted group-hover:text-accent transition-colors duration-300 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5M2 7v10M12 12v10M22 7v10" />
      </svg>
    );
  }
  if (name === "After Effects") {
    // Waveform circles representing motion design and compositing
    return (
      <svg className="w-10 h-10 text-ink-muted group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" strokeDasharray="3 3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    );
  }
  if (name === "Premiere Pro") {
    // Film reel strips representing Premiere video editing
    return (
      <svg className="w-10 h-10 text-ink-muted group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h6M3 15h6M15 9h6M15 15h6" />
      </svg>
    );
  }
  // Photoshop: Stacked layer squares
  return (
    <svg className="w-10 h-10 text-ink-muted group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export default function LottieSkillGrid() {
  const tools = [
    {
      name: "Cinema 4D",
      url: "https://lottie.host/8024976c-31c3-4d64-b615-ce1bbcb62544/6d9kZJdYf1.json",
    },
    {
      name: "After Effects",
      url: "https://lottie.host/02008f1b-c12e-4b6f-8703-e8ecf6630f9a/tQZ2xS7o1U.json",
    },
    {
      name: "Premiere Pro",
      url: "https://lottie.host/27d35ca2-63bc-42b7-a37a-f88db2b53a06/H9aP4hW8gE.json",
    },
    {
      name: "Photoshop",
      url: "https://lottie.host/2e23d1c1-4b13-41c3-88bc-467617b01d1c/J2uN9YwL2b.json",
    },
  ];

  const gridVariants = {
    hidden: {},
    visible: {},
  };

  return (
    <div className="w-full relative z-10 my-12">
      <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-4 font-bold border-b border-border/20 pb-2">
        Creative Tools Integration (Hover to Animate)
      </p>
      
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border"
      >
        {tools.map((tool, i) => (
          <LottieItem
            key={tool.name}
            name={tool.name}
            url={tool.url}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}
