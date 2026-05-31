"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { SceneFallback } from "../ui/SceneFallback";
import * as THREE from "three";

// React Error Boundary to capture GLTF load issues and fall back (RULE 2)
class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("About GLB model failed to load. Initializing procedural C4D fallback system:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface About3DSceneProps {
  gpuTier: "high" | "low" | "unknown";
}

export function About3DScene({ gpuTier }: About3DSceneProps) {
  // RULE 2: Performance gates - return low power fallback if GPU tier is low
  if (gpuTier === "low") {
    return (
      <div className="w-full aspect-square relative border border-border bg-surface p-4 flex flex-col justify-between overflow-hidden">
        <SceneFallback type="static" className="flex-1" />
        <div className="mt-4 text-center">
          <p className="font-mono text-[9px] text-ink-muted uppercase">
            Signature C4D Sculpt // Power-Saving Mode
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-square relative border border-border bg-surface p-4 flex flex-col justify-between overflow-hidden group">
      {/* Workspace header UI */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink font-bold">
            INTERACTIVE_C4D_RENDER
          </span>
        </div>
        <div className="font-mono text-[8px] text-ink-muted/50">
          MODE: ORBIT_CAM
        </div>
      </div>

      {/* Main R3F Canvas */}
      <div className="flex-1 my-3 relative border border-border/40 overflow-hidden bg-bg/50 cursor-grab active:cursor-grabbing">
        <Suspense fallback={<SceneFallback type="skeleton" className="w-full h-full" />}>
          {/* RULE 2: Performance gates - frameloop="always" because user drags to rotate */}
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#dfe104" />
            <directionalLight position={[-5, -5, -3]} intensity={0.4} />

            <Suspense fallback={null}>
              <AboutSceneContainer />
              <Environment preset="studio" />
            </Suspense>

            {/* Drag to rotate only: zoom and pan disabled (RULE 5: Hover 200ms, exit 150ms) */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.8}
            />

            {/* Subtle premium postprocessing effects (RULE 5) */}
            <EffectComposer>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.8}
              />
              <ChromaticAberration
                offset={new THREE.Vector2(0.0012, 0.0012)}
              />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>

      {/* Caption bottom bar (RULE 5: links to project breakdown) */}
      <div className="border-t border-border pt-3 font-mono text-[9px] text-ink-muted/80 flex justify-between items-center">
        <a
          href="#projects"
          className="hover:text-accent font-bold uppercase transition-colors duration-200"
        >
          Built in Cinema 4D ↗
        </a>
        <span>SHADERS: GLSL</span>
      </div>
    </div>
  );
}

function AboutSceneContainer() {
  const groupRef = useRef<THREE.Group>(null);

  // Slow continuous rotation when user is not dragging
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <CanvasErrorBoundary fallback={<AboutProceduralFallback />}>
        <AboutModel />
      </CanvasErrorBoundary>
    </group>
  );
}

function AboutModel() {
  const { scene } = useGLTF("/models/about.glb");

  // RULE 2: Dispose materials/geometries on unmount
  useEffect(() => {
    return () => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return <primitive object={scene} />;
}

// Procedural visual system for signature sculpt fallback (RULE 1 & 2)
function AboutProceduralFallback() {
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (innerRef.current) innerRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -state.clock.getElapsedTime() * 0.25;
      ring2Ref.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Center glowing crystal core representing motion dynamics */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color="#dfe104"
          roughness={0.05}
          metalness={0.2}
          transmission={0.8}
          thickness={1.0}
          clearcoat={1.0}
        />
      </mesh>
      
      {/* Orbit ring 1 (Metallic silver) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.85, 0.04, 12, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Orbit ring 2 (Metallic gold/accent) */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1.05, 0.03, 12, 64]} />
        <meshStandardMaterial color="#dfe104" roughness={0.15} metalness={0.8} />
      </mesh>
    </group>
  );
}
