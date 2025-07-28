"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

interface AnimatedNameProps {
  name: string;
  className?: string;
}

export default function AnimatedName({
  name,
  className = "",
}: AnimatedNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const letters = lettersRef.current;

    // NOTE: Create 3D text effect with multiple layers
    const create3DText = () => {
      container.innerHTML = "";
      lettersRef.current = [];

      // Create multiple layers for 3D effect
      const layers = 5;
      const depth = 20;

      for (let layer = 0; layer < layers; layer++) {
        const layerDiv = document.createElement("div");
        layerDiv.className = "absolute inset-0";
        layerDiv.style.zIndex = layer.toString();
        layerDiv.style.transform = `translateZ(${-layer * depth}px)`;
        layerDiv.style.filter = `blur(${layer * 0.5}px)`;
        layerDiv.style.opacity = (1 - layer * 0.15).toString();

        const letterSpans = name.split("").map((letter, index) => {
          const span = document.createElement("span");
          span.textContent = letter === " " ? "\u00A0" : letter;
          span.className = "inline-block relative text-gradient";
          span.style.transform = "translateY(100px) rotateX(90deg) scale(0.5)";
          span.style.opacity = "0";
          span.style.filter = "blur(10px)";
          span.style.transition = "all 0.3s ease";
          span.style.color = "#ff6600"; // Fallback orange color

          // Add hover effects
          span.addEventListener("mouseenter", () => {
            gsap.to(span, {
              duration: 0.3,
              scale: 1.3,
              rotateY: 20,
              rotateX: 20,
              filter: "blur(0px) drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))",
              ease: "power2.out",
            });
          });

          span.addEventListener("mouseleave", () => {
            gsap.to(span, {
              duration: 0.3,
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              filter: "blur(0px)",
              ease: "power2.out",
            });
          });

          layerDiv.appendChild(span);
          return span;
        });

        container.appendChild(layerDiv);
        lettersRef.current.push(...letterSpans);
      }
    };

    create3DText();

    // NOTE: Advanced animation timeline
    const tl = gsap.timeline({ delay: 0.8 });

    // Animate each layer with different timing
    const layers = container.children;
    for (let layer = 0; layer < layers.length; layer++) {
      const layerDiv = layers[layer] as HTMLElement;
      const layerLetters = layerDiv.children;

      // Animate letters in each layer
      gsap.to(Array.from(layerLetters), {
        duration: 0.8,
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "back.out(1.7)",
        stagger: 0.05,
        delay: layer * 0.1,
      });
    }

    // Add floating animation
    tl.to(
      container,
      {
        duration: 3,
        y: -15,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      },
      "-=0.5"
    );

    // Add rotation animation
    tl.to(
      container,
      {
        duration: 8,
        rotateY: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      },
      "-=3"
    );

    // Add glow effect
    tl.to(
      container,
      {
        duration: 2,
        filter: "drop-shadow(0 0 30px rgba(255, 165, 0, 0.6))",
        ease: "power2.out",
      },
      "-=2"
    );

    // NOTE: Create particle system around the name
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full pointer-events-none";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.zIndex = "1000";
      container.appendChild(particle);

      gsap.to(particle, {
        duration: 3,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: 0,
        scale: 0,
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 200);

    // NOTE: Add wave effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;

      gsap.to(container, {
        duration: 0.5,
        rotateY: rate * 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);

    // NOTE: Add magnetic effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(container, {
        duration: 0.5,
        x: x * 0.1,
        y: y * 0.1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Reset position when mouse leaves
    const handleMouseLeave = () => {
      gsap.to(container, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: "power2.out",
      });
    };

    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(particleInterval);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [name]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    />
  );
}
