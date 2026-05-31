import React from "react";

interface SceneFallbackProps {
  type?: "skeleton" | "static";
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
}

// RULE 2: Performance gates (non-negotiable)
// Suspend all R3F canvases: wrap in <Suspense fallback={<Skeleton />}>
// Show static image or video fallback for low GPU tiers
export function SceneFallback({
  type = "skeleton",
  imageUrl,
  videoUrl,
  className = "",
}: SceneFallbackProps) {
  if (type === "static") {
    if (videoUrl) {
      return (
        <div className={`w-full h-full relative overflow-hidden bg-surface flex items-center justify-center ${className}`}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            src={videoUrl}
          />
          <div className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-ink-muted/60 bg-bg/85 px-2 py-1 border border-border/40">
            GPU Fallback: Pre-rendered WebM
          </div>
        </div>
      );
    }
    
    return (
      <div className={`w-full h-full relative overflow-hidden bg-surface flex items-center justify-center p-8 border border-border/40 ${className}`}>
        {imageUrl ? (
          <img src={imageUrl} alt="3D scene static fallback" className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-2xl text-accent animate-pulse">✦</span>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink font-bold">
              WORKSPACE_PREVIEW
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-ink-muted">
              GPU Power-Saving Fallback Active
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-ink-muted/60 bg-bg/85 px-2 py-1 border border-border/40">
          GPU Fallback: Static Graphic
        </div>
      </div>
    );
  }

  // Sleek animated skeleton loading screen for Suspense
  return (
    <div
      className={`w-full h-full relative bg-surface/80 border border-border/40 animate-pulse flex flex-col justify-between p-5 ${className}`}
    >
      {/* Workspace header */}
      <div className="flex items-center justify-between border-b border-border/30 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <div className="w-24 h-2.5 bg-border/60 rounded" />
        </div>
        <div className="w-10 h-2 bg-border/40 rounded" />
      </div>

      {/* Main loading indicator */}
      <div className="flex-1 my-4 flex items-center justify-center">
        <div className="relative w-12 h-12 border border-border/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-accent animate-spin" />
          <div className="absolute w-12 h-12 rounded-full border border-dashed border-border/40 animate-pulse" />
        </div>
      </div>

      {/* Workspace bottom status bar */}
      <div className="border-t border-border/30 pt-3 flex justify-between font-mono text-[8px] text-ink-muted/50">
        <span>INITIALIZING_3D_CORE...</span>
        <span>FPS: -- / --</span>
      </div>
    </div>
  );
}
