"use client";

import { useRef, useEffect } from "react";
import { getSkills } from "@/utils/data";
import { getIcon } from "@/utils/icons";
import { useGSAPSectionAnimation } from "@/hooks/useGSAPSectionAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardParticles from "./CardParticles";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const skills = getSkills();
  const sectionRef = useGSAPSectionAnimation({
    y: 40,
    scale: 0.98,
    duration: 0.6,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger animation for skill cards
    const cards = containerRef.current.querySelectorAll(".skill-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantico-bold">
            <span className="text-gradient">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto quantico-regular">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => {
            const IconComponent = getIcon(skill.icon);

            return (
              <CardParticles
                key={index}
                particleCount={15}
                particleColor="#ff6600"
              >
                <div className="skill-card card-animated-bg group p-6 rounded-xl bg-card border border-border/20 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {IconComponent && (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-foreground quantico-bold">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-3 quantico-regular">
                    {skill.description}
                  </p>
                  <p className="text-sm text-primary font-medium quantico-regular">
                    {skill.subtitle}
                  </p>
                </div>
              </CardParticles>
            );
          })}
        </div>
      </div>
    </section>
  );
}
