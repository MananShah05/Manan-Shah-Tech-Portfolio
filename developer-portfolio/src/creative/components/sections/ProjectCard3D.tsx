"use client";

import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { SceneFallback } from "../ui/SceneFallback";
import * as THREE from "three";

// React Error Boundary to catch 404/loading errors on model assets (RULE 2)
class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // Suppress console crash, log warning
    console.warn("Card GLB not found, loading domains-specific procedural fallback.");
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface ProjectCard3DProps {
  projectSlug: string;
  isHovered: boolean;
  gpuTier: "high" | "low" | "unknown";
}

export function ProjectCard3D({ projectSlug, isHovered, gpuTier }: ProjectCard3DProps) {
  // RULE 2: Performance gates - If low capability GPU, immediately return static image/video fallback
  if (gpuTier === "low") {
    return <SceneFallback type="static" className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full relative bg-bg/40">
      <Suspense fallback={<SceneFallback type="skeleton" className="w-full h-full" />}>
        {/* RULE 2: Performance gates - frameloop="always" because canvas rotates continuously */}
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 40 }}
          gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 3]} intensity={1.5} />
          <directionalLight position={[-5, -5, -3]} intensity={0.3} />
          
          <Suspense fallback={null}>
            <CardMesh projectSlug={projectSlug} isHovered={isHovered} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}

interface CardMeshProps {
  projectSlug: string;
  isHovered: boolean;
}

function CardMesh({ projectSlug, isHovered }: CardMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const hoverProgress = useRef(0);
  const startingRotation = useRef(0);
  const wasHoveredRef = useRef(false);

  // RULE 4 & 5: Animation Easing and Asymmetric hover triggers
  // Hover Y-rotation: 360deg loop, 1200ms ease-in-out.
  // No hover: slow spin (8s per revolution, frameloop="always").
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isHovered) {
      if (!wasHoveredRef.current) {
        // Hover entered: record start angle
        wasHoveredRef.current = true;
        startingRotation.current = groupRef.current.rotation.y;
        hoverProgress.current = 0;
      }

      hoverProgress.current += delta;
      const duration = 1.2; // 1200ms
      const progress = Math.min(1.0, hoverProgress.current / duration);

      // strong ease-in-out: cubic-bezier(0.77, 0, 0.175, 1) approximation
      const ease = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      // Perform a full 360-degree (Math.PI * 2) rotation from starting Y-rotation
      groupRef.current.rotation.y = startingRotation.current + ease(progress) * Math.PI * 2;

      // Loop the hover animation if hover persists
      if (progress >= 1.0) {
        hoverProgress.current = 0;
        startingRotation.current = groupRef.current.rotation.y;
      }
    } else {
      if (wasHoveredRef.current) {
        // Hover exited: reset trackers
        wasHoveredRef.current = false;
      }
      
      // Auto-slow-rotate: 8s per revolution (pi*2 radians in 8 seconds)
      groupRef.current.rotation.y += (delta * (Math.PI * 2)) / 8;
    }
  });

  return (
    <group ref={groupRef}>
      <CanvasErrorBoundary fallback={<ProjectCardProceduralFallback slug={projectSlug} />}>
        <CardModel slug={projectSlug} />
      </CanvasErrorBoundary>
    </group>
  );
}

function CardModel({ slug }: { slug: string }) {
  const { scene } = useGLTF(`/models/${slug}.glb`);

  // RULE 2: Dispose resources on unmount
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

// Procedural visual components if GLB file does not exist (RULE 1 & 2)
function ProjectCardProceduralFallback({ slug }: { slug: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Core custom mechanical animations for each specific project area (Rule 1)
    if (slug === "ai-video-ads") {
      const sphere = meshRef.current.children[0] as THREE.Mesh;
      const box = meshRef.current.children[1] as THREE.Mesh;
      if (sphere) sphere.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.08);
      if (box) box.rotation.x = state.clock.getElapsedTime() * 0.4;
    } else if (slug === "3d-designs") {
      const torus = meshRef.current.children[0] as THREE.Mesh;
      const rings = meshRef.current.children[1] as THREE.Mesh;
      if (torus) torus.rotation.x = state.clock.getElapsedTime() * 0.2;
      if (rings) rings.rotation.y = state.clock.getElapsedTime() * 0.5;
    } else if (slug === "animations") {
      meshRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.getElapsedTime() * (0.2 + i * 0.15);
        child.rotation.y = state.clock.getElapsedTime() * (0.1 + i * 0.05);
      });
    } else if (slug === "uiux-design") {
      meshRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 2 + i * 2) * 0.12;
      });
    } else if (slug === "video-production") {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    }
  });

  if (slug === "ai-video-ads") {
    return (
      <group ref={meshRef}>
        {/* Core AI Core glowing glass sphere */}
        <mesh>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshPhysicalMaterial
            color="#dfe104"
            roughness={0.1}
            transmission={0.85}
            thickness={0.8}
            ior={1.4}
          />
        </mesh>
        {/* Ad Structure wireframe bounding box */}
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshBasicMaterial color="#dfe104" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    );
  }

  if (slug === "3d-designs") {
    return (
      <group ref={meshRef}>
        {/* Primary solid 3D Torus ring */}
        <mesh>
          <torusGeometry args={[0.55, 0.18, 16, 64]} />
          <meshStandardMaterial color="#dfe104" roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Abstract metallic orbit ring */}
        <mesh>
          <torusGeometry args={[0.85, 0.03, 8, 48]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
    );
  }

  if (slug === "animations") {
    return (
      <group ref={meshRef}>
        {/* Intersecting vector motion rings */}
        <mesh>
          <torusGeometry args={[0.65, 0.06, 12, 64]} />
          <meshPhysicalMaterial color="#dfe104" roughness={0.1} transmission={0.8} thickness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.05, 12, 64]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.15} transmission={0.7} thickness={0.3} />
        </mesh>
      </group>
    );
  }

  if (slug === "uiux-design") {
    return (
      <group ref={meshRef}>
        {/* Stacked floating glass panels representing user interfaces */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.04, 0.65]} />
          <meshPhysicalMaterial color="#dfe104" roughness={0.1} transmission={0.9} thickness={0.2} />
        </mesh>
        <mesh position={[0, -0.15, 0.08]}>
          <boxGeometry args={[1.0, 0.04, 0.65]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.1} transmission={0.8} thickness={0.2} transparent opacity={0.7} />
        </mesh>
      </group>
    );
  }

  if (slug === "video-production") {
    return (
      <group ref={meshRef}>
        {/* Cylinder strip helix representing video frames */}
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 1.1, 24, 1, true]} />
          <meshStandardMaterial color="#dfe104" roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.55, 0.75, 32]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} wireframe transparent opacity={0.25} />
        </mesh>
      </group>
    );
  }

  // Fallback for general projects
  return (
    <mesh ref={meshRef as any}>
      <octahedronGeometry args={[0.7]} />
      <meshStandardMaterial color="#dfe104" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}
