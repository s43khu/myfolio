"use client";

// NOTE: component can be found on the Three Examples on sandbox, it's used here as a reference.
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function JSText({ size = 0.15 }: { size?: number }) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  useEffect(() => {
    if (textRef.current) {
      // Add GSAP animation for initial appearance
      gsap.fromTo(
        textRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: size,
          y: size,
          z: size,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Add pulsing animation for futuristic effect
      gsap.to(textRef.current.scale, {
        x: size * 1.05,
        y: size * 1.05,
        z: size * 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }
  }, [size]);

  return (
    <group ref={textRef} position={[0, 0, 0]} scale={[size, size, size]}>
      {/* Main text with theme-consistent glow */}
      <Text
        position={[0, 0, 0]}
        fontSize={2.2}
        color="#ff6600"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
        material={
          new THREE.MeshStandardMaterial({
            color: "#ff6600",
            emissive: "#ff6600",
            emissiveIntensity: 0.8,
            roughness: 0.1,
            metalness: 0.9,
          })
        }
      >
        JS
      </Text>

      {/* Orange outline effect */}
      <Text
        position={[0.08, -0.08, -0.03]}
        fontSize={2.2}
        color="#ff4500"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
        material={
          new THREE.MeshBasicMaterial({
            color: "#ff4500",
            transparent: true,
            opacity: 0.7,
          })
        }
      >
        JS
      </Text>

      {/* Holographic effect layer */}
      <Text
        position={[0.04, -0.04, 0.02]}
        fontSize={2.2}
        color="#ffaa00"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
        material={
          new THREE.MeshBasicMaterial({
            color: "#ffaa00",
            transparent: true,
            opacity: 0.4,
          })
        }
      >
        JS
      </Text>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 30;

  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z

    // Theme-consistent orange colors
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 1; // R - Bright Orange
      colors[i * 3 + 1] = 0.4; // G
      colors[i * 3 + 2] = 0; // B
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 1; // R - Red-Orange
      colors[i * 3 + 1] = 0.27; // G
      colors[i * 3 + 2] = 0; // B
    } else {
      colors[i * 3] = 1; // R - Golden Orange
      colors[i * 3 + 1] = 0.67; // G
      colors[i * 3 + 2] = 0; // B
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function ModelCard({ size = 0.15 }: { size?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // NOTE: Add 3D card tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;

      gsap.to(cardRef.current, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
      });
    };

    const card = cardRef.current;
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full h-[500px] perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* NOTE: 3D Card Frame with advanced styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Top breakout effect - text appears to come out */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent rounded-t-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-orange-400/5 to-transparent"></div>
        </div>

        {/* Bottom containment frame */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent rounded-b-2xl"></div>

        {/* Side borders for 3D effect */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500/50 via-orange-400/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-500/50 via-orange-400/30 to-transparent"></div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>

        {/* Inner glow effect */}
        <div className="absolute inset-2 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 rounded-xl"></div>

        {/* TV Screen Effect */}
        <div className="absolute inset-4 bg-black rounded-xl border border-slate-600/30 overflow-hidden">
          {/* Screen Scan Lines Effect */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-orange-500"
                style={{ top: `${i * 3.33}%` }}
              />
            ))}
          </div>

          {/* TV Screen Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5"></div>

          {/* 3D Text Container */}
          <div className="relative w-full h-full">
            <Canvas
              camera={{ position: [0, 0, 2], fov: 60 }}
              style={{ background: "black" }}
              gl={{ alpha: false, antialias: true }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 2]} />

              {/* Theme-consistent Lighting */}
              <ambientLight intensity={0.3} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1.2}
                color="#ff6600"
              />
              <pointLight
                position={[-5, -5, -5]}
                intensity={0.6}
                color="#ff4500"
              />
              <pointLight
                position={[0, 0, 3]}
                intensity={0.8}
                color="#ffaa00"
              />

              {/* JS Text */}
              <JSText size={size} />

              {/* Floating Particles */}
              <FloatingParticles />

              {/* Subtle orbit controls for interaction */}
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </div>

          {/* TV Frame Accent */}
          <div className="absolute inset-0 border-2 border-slate-600/20 rounded-xl"></div>

          {/* TV Power Light */}
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        </div>

        {/* Floating particles around the frame */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Bottom frame accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>

      {/* NOTE: Shadow for 3D depth */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-xl transform scale-95"></div>
    </div>
  );
}
