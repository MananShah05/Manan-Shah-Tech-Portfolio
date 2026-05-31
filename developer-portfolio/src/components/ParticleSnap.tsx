import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface ParticleSnapProps {
  active: boolean;
  portalOrigin: { x: number; y: number } | null;
  onSnapshotReady?: (dataUrl: string) => void;
  capturedImage: string | null;
}

interface ChunkData {
  id: number;
  col: number;
  row: number;
  left: number;
  top: number;
  width: number;
  height: number;
  destX: number;
  destY: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
}

export const ParticleSnap: React.FC<ParticleSnapProps> = ({
  active,
  portalOrigin,
  capturedImage,
}) => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const cols = 4;
  const rows = 3;

  const chunks = useMemo(() => {
    if (!portalOrigin) return [];
    
    const list: ChunkData[] = [];
    const chunkWidth = windowSize.width / cols;
    const chunkHeight = windowSize.height / rows;
    const originX = portalOrigin.x;
    const originY = portalOrigin.y;

    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const left = c * chunkWidth;
        const top = r * chunkHeight;
        const chunkCenterX = left + chunkWidth / 2;
        const chunkCenterY = top + chunkHeight / 2;

        // Calculate direction vector from portal origin to chunk center
        let dx = chunkCenterX - originX;
        let dy = chunkCenterY - originY;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Normalize and scale to get destination translation coordinates
        const flyDistance = 300 + Math.random() * 400; // how far they fly
        const destX = (dx / dist) * flyDistance;
        const destY = (dy / dist) * flyDistance;

        // Random 3D rotations for high visual impact
        const rotateX = (Math.random() - 0.5) * 720;
        const rotateY = (Math.random() - 0.5) * 720;
        const rotateZ = (Math.random() - 0.5) * 360;

        list.push({
          id,
          col: c,
          row: r,
          left,
          top,
          width: chunkWidth,
          height: chunkHeight,
          destX,
          destY,
          rotateX,
          rotateY,
          rotateZ,
        });
        id++;
      }
    }
    return list;
  }, [windowSize, portalOrigin]);

  if (!active || !capturedImage || !portalOrigin) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[99] pointer-events-none overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {chunks.map((chunk) => (
        <motion.div
          key={chunk.id}
          style={{
            position: "absolute",
            left: chunk.left,
            top: chunk.top,
            width: chunk.width,
            height: chunk.height,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          }}
          animate={{
            x: chunk.destX,
            y: chunk.destY,
            scale: [1, 0.9, 0.4],
            opacity: [1, 0.9, 0],
            rotateX: chunk.rotateX,
            rotateY: chunk.rotateY,
            rotateZ: chunk.rotateZ,
          }}
          transition={{
            duration: 0.5, // Tear Phase duration (500ms: 400ms - 900ms)
            ease: [0.25, 1, 0.5, 1], // cubic-bezier out
          }}
        >
          <div
            style={{
              width: windowSize.width,
              height: windowSize.height,
              backgroundImage: `url(${capturedImage})`,
              backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
              backgroundPosition: `-${chunk.left}px -${chunk.top}px`,
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Helper utility to take snap
export const captureViewport = async (
  elementId: string = "root"
): Promise<string | null> => {
  const rootEl = document.getElementById(elementId);
  if (!rootEl) return null;
  try {
    const canvas = await html2canvas(rootEl, {
      useCORS: true,
      allowTaint: true,
      scale: 1, // Capture at 1x resolution to avoid layout/GPU strain
      backgroundColor: null,
      logging: false,
    });
    return canvas.toDataURL("image/webp", 0.85);
  } catch (err) {
    console.error("Failed to capture snapshot:", err);
    return null;
  }
};
