"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

// Preload the GLTF file at root to optimize performance (RULE 2: Performance gates)
try {
  useGLTF.preload("/models/hero.glb");
} catch (e) {
  // Catch preload errors in environments where assets aren't yet populated
}

// RULE 2: Performance gates (non-negotiable)
// React-based Error Boundary to catch GLTF loading failures (e.g. 404)
// and dynamically fall back to a procedural mesh without breaking the scene.
class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("R3F assets failed to load, switching to procedural fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface HeroSceneProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroScene({ scrollYProgress }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-transparent">
      {/* RULE 2: Performance gates - frameloop="always" since we have mouse tracking + continuous rotation */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <HeroMesh scrollYProgress={scrollYProgress} />
          {/* Drei studio environment for realistic metallic/glass reflection (RULE 1) */}
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

interface HeroMeshProps {
  scrollYProgress: MotionValue<number>;
}

function HeroMesh({ scrollYProgress }: HeroMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollValRef = useRef(0);

  // Sync Framer Motion scroll value to R3F (RULE 3: Coexist cleanly via refs)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      scrollValRef.current = latest;
    });
  }, [scrollYProgress]);

  // RULE 4: Animation easing (Emil principles)
  // Configured spring physics with high tension & friction for premium tactile response
  const [spring, setSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    scale: [1.2, 1.2, 1.2],
    config: { mass: 2, tension: 150, friction: 35 },
  }));

  useFrame((state) => {
    const scroll = scrollValRef.current;
    
    // Parallax: tilts object ±15 degrees based on cursor position (Rule 4)
    // 15 degrees is approx 0.26 radians
    const targetX = state.pointer.x * 0.26;
    const targetY = state.pointer.y * 0.26;

    // RULE 4: Scroll-driven scale down + opacity fade
    const targetScale = Math.max(0.3, 1.3 * (1.0 - scroll * 0.8));
    const targetOpacity = Math.max(0.0, 1.0 - scroll * 1.5);

    // Update spring targets
    setSpring.start({
      rotation: [-targetY, targetX + state.clock.getElapsedTime() * 0.05, 0], // Parallax + slow continuous Y-rotation
      scale: [targetScale, targetScale, targetScale],
    });

    // Update material opacity recursively inside group (for GLB or procedural fallback)
    if (groupRef.current) {
      groupRef.current.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = targetOpacity;
        }
      });
    }
  });

  return (
    <a.group ref={groupRef} rotation={spring.rotation as any} scale={spring.scale as any}>
      <CanvasErrorBoundary fallback={<HeroProceduralFallback />}>
        <HeroModel />
      </CanvasErrorBoundary>
    </a.group>
  );
}

// Procedural visual fallback matching Emil aesthetic if hero.glb is 404 (RULE 2)
function HeroProceduralFallback() {
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      innerMeshRef.current.rotation.z = -state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Premium Translucent Torus Knot representing C4D design precision (RULE 1) */}
      <mesh ref={innerMeshRef}>
        <torusKnotGeometry args={[1, 0.35, 120, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#dfe104"
          roughness={0.1}
          metalness={0.2}
          transmission={0.7}
          thickness={1.2}
          ior={1.6}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

function HeroModel() {
  const { scene } = useGLTF("/models/hero.glb");

  // RULE 2: Performance gates - dispose materials/geometries on unmount
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
