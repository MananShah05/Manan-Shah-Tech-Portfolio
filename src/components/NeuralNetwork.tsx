import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "../hooks/useIsMobile";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export default function NeuralNetwork() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 70;
    const CONNECTION_DIST = 4.5;
    const MOUSE_REPEL = 5;
    const MOUSE_RADIUS = 6;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      particles.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.008,
        vz: (Math.random() - 0.5) * 0.004,
        baseX: x, baseY: y, baseZ: z,
      });
    }

    // Particle geometry
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8a8478,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const pointCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(pointCloud);

    // Connection lines
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1b4332,
      transparent: true,
      opacity: 0.08,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x =
        ((e.clientX - rect.left) / rect.width - 0.5) * 28;
      mouseRef.current.y =
        -((e.clientY - rect.top) / rect.height - 0.5) * 20;
    };
    container.addEventListener("mousemove", onMouseMove);

    let time = 0;
    let raf: number;

    const animate = () => {
      time += 0.003;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Gentle drift
        p.x += p.vx + Math.sin(time + i * 0.7) * 0.002;
        p.y += p.vy + Math.cos(time + i * 0.5) * 0.002;
        p.z += p.vz;

        // Return to base
        p.x += (p.baseX - p.x) * 0.002;
        p.y += (p.baseY - p.y) * 0.002;
        p.z += (p.baseZ - p.z) * 0.002;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.1) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_REPEL * 0.015;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Bounds
        if (Math.abs(p.x) > 15) p.vx *= -1;
        if (Math.abs(p.y) > 11) p.vy *= -1;
        if (Math.abs(p.z) > 6) p.vz *= -1;

        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      }

      particleGeo.attributes.position.needsUpdate = true;

      // Update connections
      let lineIdx = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DIST) {
            linePositions[lineIdx++] = particles[i].x;
            linePositions[lineIdx++] = particles[i].y;
            linePositions[lineIdx++] = particles[i].z;
            linePositions[lineIdx++] = particles[j].x;
            linePositions[lineIdx++] = particles[j].y;
            linePositions[lineIdx++] = particles[j].z;
          }
        }
      }

      // Clear remaining
      for (let k = lineIdx; k < linePositions.length; k++) {
        linePositions[k] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineMat.opacity = 0.06 + Math.sin(time * 2) * 0.02;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}
