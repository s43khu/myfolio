"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Camera position
    camera.position.z = 5;

    // Particle system
    const particleCount = 10;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random positions across width, starting from bottom
      positions[i3] = (Math.random() - 0.5) * 20; // X: spread across width
      positions[i3 + 1] = Math.random() * -15 - 5; // Y: start from bottom
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // Z: slight depth

      // Velocities for upward movement with slight horizontal drift
      velocities[i3] = (Math.random() - 0.5) * 0.02; // X: slight horizontal movement
      velocities[i3 + 1] = Math.random() * 0.05 + 0.03; // Y: upward movement
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01; // Z: slight depth movement

      // Smaller sizes for fire particles
      sizes[i] = Math.random() * 1.5 + 0.5;

      // Flame colors - orange, red, yellow
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Bright red-orange
        colors[i3] = 1.0; // R
        colors[i3 + 1] = 0.1; // G
        colors[i3 + 2] = 0.0; // B
      } else if (colorType < 0.7) {
        // Bright orange
        colors[i3] = 1.0; // R
        colors[i3 + 1] = 0.4; // G
        colors[i3 + 2] = 0.0; // B
      } else {
        // Bright yellow
        colors[i3] = 1.0; // R
        colors[i3 + 1] = 1.0; // G
        colors[i3 + 2] = 0.2; // B
      }
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader for glowing fire particles
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        vColor = color;
        
        // Calculate alpha based on distance from camera
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float distance = length(mvPosition.xyz);
        vAlpha = 1.0 - (distance / 15.0);
        vAlpha = clamp(vAlpha, 0.3, 1.0);
        
        gl_PointSize = size * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        // Create circular particle with soft edges
        vec2 center = gl_PointCoord - vec2(0.5);
        float distance = length(center);
        
        if (distance > 0.5) discard;
        
        // Soft circular gradient
        float alpha = 1.0 - (distance * 2.0);
        alpha = pow(alpha, 1.5);
        
        // Add glow effect for fire particles
        float glow = 1.0 - distance;
        glow = pow(glow, 2.0);
        
        vec3 finalColor = vColor + (vColor * glow * 0.3);
        gl_FragColor = vec4(finalColor, alpha * vAlpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Update particles
      const positionAttribute = geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const sizeAttribute = geometry.getAttribute(
        "size"
      ) as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Update position - upward movement from bottom to top
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Size pulsing effect for fire
        sizes[i] = Math.random() * 1.5 + 0.5 + Math.sin(time * 3 + i) * 0.2;

        // Reset particles that go too high - send them back to bottom
        if (positions[i3 + 1] > 10) {
          positions[i3] = (Math.random() - 0.5) * 20; // Random X position
          positions[i3 + 1] = Math.random() * -15 - 5; // Back to bottom
          positions[i3 + 2] = (Math.random() - 0.5) * 10; // Random Z position
        }
      }

      // Mark attributes for update
      positionAttribute.needsUpdate = true;
      sizeAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    console.log(
      "Fire particles initialized with",
      particleCount,
      "particles floating from bottom to top"
    );

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
