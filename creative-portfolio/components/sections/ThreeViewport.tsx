"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isThemeDark, setIsThemeDark] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Track theme mode
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsThemeDark(isDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Detect initial theme
    setIsThemeDark(document.documentElement.classList.contains("dark"));

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isThemeDark ? 0x09090b : 0xfafafa, 0.05);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Grid Floor
    const gridColor = isThemeDark ? 0x3f3f46 : 0xd4d4d8;
    const gridHelper = new THREE.GridHelper(20, 20, 0xdfe104, gridColor);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Floating Interactive Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 8 + 1;
      const z = (Math.random() - 0.5) * 15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions.push({ x, y, z });
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Custom circular particle texture using standard HTML canvas drawing
    const createCircleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 16;
      c.height = 16;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(8, 8, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      return new THREE.CanvasTexture(c);
    };

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdfe104,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      map: createCircleTexture(),
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse tracking & Raycaster repulsion
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.set(-999, -999);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Handle Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Intersection Observer to pause rendering when out of viewport
    let isIntersecting = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isIntersecting) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate scene slowly
      gridHelper.rotation.y = time * 0.03;
      particles.rotation.y = time * 0.03;

      // Mouse repulsion physics
      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);

      const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        let px = originalPositions[i].x;
        let py = originalPositions[i].y;
        let pz = originalPositions[i].z;

        // Apply a small orbit floating animation
        px += Math.sin(time + i) * 0.05;
        py += Math.cos(time * 0.8 + i) * 0.05;

        // Mouse repulsion
        if (mouse.x > -900) {
          const dx = posArray[idx] - intersectPoint.x;
          const dy = posArray[idx + 1] - intersectPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 3) {
            const force = (3 - dist) / 3;
            posArray[idx] += (dx / dist) * force * 0.15;
            posArray[idx + 1] += (dy / dist) * force * 0.15;
          }
        }

        // Return to home position gently
        posArray[idx] += (px - posArray[idx]) * 0.05;
        posArray[idx + 1] += (py - posArray[idx + 1]) * 0.05;
        posArray[idx + 2] += (pz - posArray[idx + 2]) * 0.05;
      }
      positionsAttr.needsUpdate = true;

      // Dynamic fog color sync with background theme
      const currentBgColor = isThemeDark ? 0x09090b : 0xfafafa;
      scene.fog.color.setHex(currentBgColor);
      renderer.setClearColor(currentBgColor, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      
      // Dispose materials & geometries to satisfy memory audit
      particleGeometry.dispose();
      particleMaterial.dispose();
      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((m) => m.dispose());
      } else {
        gridHelper.material.dispose();
      }
      renderer.dispose();
    };
  }, [isThemeDark]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-transparent rounded-sm"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
      />
      {/* Editorial Viewport UI overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[9px] uppercase tracking-widest text-ink-muted/50 flex flex-col gap-1">
        <span>viewport: perspective</span>
        <span>fps: 60 (locked)</span>
      </div>
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none font-mono text-[9px] uppercase tracking-widest text-accent flex items-center gap-1.5 animate-pulse">
        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
        <span>transcend_engine.active</span>
      </div>
    </div>
  );
}
