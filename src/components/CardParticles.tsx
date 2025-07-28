"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CardParticlesProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export default function CardParticles({
  children,
  className = "",
  particleCount = 200,
  particleColor = "#ff6600",
}: CardParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    console.log("CardParticles: Initializing with", particleCount, "particles");

    // NOTE: Create particles for card background
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";
      particle.style.backgroundColor = particleColor;
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.zIndex = "50";
      particle.style.opacity = "0";
      particle.style.transform = "scale(0)";
      particle.style.boxShadow = `0 0 8px ${particleColor}, 0 0 12px ${particleColor}`;
      particle.style.filter = "blur(0.5px)";

      container.appendChild(particle);
      particles.push(particle);

      console.log("CardParticles: Created particle", particles.length);

      // NOTE: Continuous loop animation
      const animateParticle = () => {
        // Reset particle to starting position
        gsap.set(particle, {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
        });

        // Animate particle appearance and movement
        gsap.to(particle, {
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          onComplete: () => {
            // Start movement animation
            gsap.to(particle, {
              duration: 5 + Math.random() * 4,
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 0,
              scale: 0,
              ease: "power2.out",
              onComplete: () => {
                // Loop the animation
                animateParticle();
              },
            });
          },
        });
      };

      // Start the loop animation
      animateParticle();
    };

    // Create initial particles with delay
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        createParticle();
      }, i * 300);
    }

    // Create additional particles periodically (less frequent since they loop now)
    const particleInterval = setInterval(() => {
      if (particles.length < particleCount * 1.5) {
        createParticle();
      }
    }, 2000);

    // NOTE: Add hover effect to create more particles
    const handleMouseEnter = () => {
      // Create burst of particles on hover
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle();
        }, i * 150);
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearInterval(particleInterval);
      container.removeEventListener("mouseenter", handleMouseEnter);

      // NOTE: Clean up particles (they now loop continuously)
      particles.forEach((particle) => {
        gsap.killTweensOf(particle);
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, particleColor]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
