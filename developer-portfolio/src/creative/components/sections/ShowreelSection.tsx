"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SceneFallback } from "../ui/SceneFallback";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import * as THREE from "three";

// RULE 2: Performance gates (non-negotiable)
// React-based Error Boundary to catch R3F crashes inside the Showreel overlay
class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn("Showreel R3F canvas error caught:", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function ShowreelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Web Audio API refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    // Initialize Web Audio API on first user interaction (browser requirement)
    if (!audioContextRef.current && videoRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // Low FFT size for fast reactivity

        const source = ctx.createMediaElementSource(videoRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      } catch (err) {
        console.warn("Failed to initialize Web Audio API:", err);
      }
    }

    // Toggle mute state
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    // Resume AudioContext if unmuting
    if (!nextMuted && audioContextRef.current) {
      audioContextRef.current.resume().catch(() => {});
    }
  };

  // Clean up Web Audio nodes on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="showreel" className="w-full relative h-[70vh] min-h-[500px] border-y-2 border-border overflow-hidden bg-black flex items-center justify-center">
      {/* Background reel video */}
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32212-large.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 select-none pointer-events-none"
      />

      {/* R3F Canvas overlay (pointer-events-none so users can interact with UI elements underneath) */}
      {/* RULE 3: Framer Motion / UI overlays exist separately from the R3F Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <CanvasErrorBoundary fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full bg-transparent"
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#dfe104" />
            <Suspense fallback={null}>
              <FloatingObjects
                analyserRef={analyserRef}
                dataArrayRef={dataArrayRef}
                isMuted={isMuted}
              />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Fullscreen typographic Overlay content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 pointer-events-none">
        {/* Top Header */}
        <div className="flex justify-between items-start w-full">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              studio.showreel()
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mt-1">
              Motion Graphic Reel
            </h2>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">
            FRAME: 01 // 60
          </div>
        </div>

        {/* Bottom controls row (needs pointer-events-auto to click buttons) */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-accent hover:text-accent bg-black/40 text-white flex items-center justify-center transition-all duration-300 active:scale-[0.95] cursor-pointer"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            
            <button
              onClick={toggleMute}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 active:scale-[0.95] cursor-pointer ${
                isMuted
                  ? "border-white/20 bg-black/40 text-white hover:border-white"
                  : "border-accent bg-accent/20 text-accent hover:bg-accent/30 animate-pulse"
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX size={14} />
                  <span>Unmute (Reacts to Audio)</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Mute Audio</span>
                </>
              )}
            </button>
          </div>
          
          <div className="hidden md:block font-mono text-[8px] uppercase tracking-widest text-white/30 text-right">
            DRIVEN_BY_WEB_AUDIO_API<br />
            FREQUENCY_BINS: 32_CORES
          </div>
        </div>
      </div>
    </section>
  );
}

interface FloatingObjectsProps {
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  dataArrayRef: React.MutableRefObject<Uint8Array | null>;
  isMuted: boolean;
}

function FloatingObjects({ analyserRef, dataArrayRef, isMuted }: FloatingObjectsProps) {
  const count = 15;
  const meshRefs = useRef<THREE.Mesh[]>([]);

  // Generate random data once for drift and rotation physics
  const items = React.useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 12, // x range
        (Math.random() - 0.5) * 6,  // y range
        (Math.random() - 0.5) * 4,  // z range
      ] as [number, number, number],
      speedY: (Math.random() - 0.5) * 0.15 + 0.05, // drifting speed
      rotSpeed: [
        Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.3,
      ] as [number, number, number],
      restScale: Math.random() * 0.6 + 0.3,
      freqIndex: Math.floor(Math.random() * 20), // Bind to a frequency bin
    }));
  }, []);

  // RULE 4: Scroll-driven and smooth spring physics interpolations
  useFrame((state, delta) => {
    let volumeValue = 0;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    // Fetch frequency data if unmuted
    if (analyser && dataArray && !isMuted) {
      analyser.getByteFrequencyData(dataArray);
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = items[i];

      // Update floating positioning physics
      mesh.position.y += data.speedY * delta;
      // Wrap vertical position if drifting out of bounds
      if (mesh.position.y > 4) mesh.position.y = -4;
      if (mesh.position.y < -4) mesh.position.y = 4;

      // Rotate objects
      mesh.rotation.x += data.rotSpeed[0] * delta;
      mesh.rotation.y += data.rotSpeed[1] * delta;
      mesh.rotation.z += data.rotSpeed[2] * delta;

      // React to volume frequency index (if active)
      let reaction = 0;
      if (analyser && dataArray && !isMuted) {
        // Read specific frequency bin value (normalized 0-1)
        reaction = dataArray[data.freqIndex] / 255;
      }

      // Smoothly interpolate scale: target is restScale + reaction volume multiplier
      // Using lerp for smooth spring-like dampening (RULE 4)
      const targetScale = data.restScale + reaction * 1.8;
      const currentScale = mesh.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      
      mesh.scale.set(nextScale, nextScale, nextScale);
    });
  });

  return (
    <group>
      {items.map((item, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={item.position}
        >
          {/* Drifting crystal meshes (Icosahedron) */}
          <icosahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#dfe104"
            roughness={0.1}
            metalness={0.3}
            transmission={0.8}
            thickness={0.5}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
