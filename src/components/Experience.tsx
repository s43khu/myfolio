"use client";

import { useRef, useEffect } from "react";
import { getExperience } from "@/utils/data";
import { getIcon } from "@/utils/icons";
import { useGSAPSectionAnimation } from "@/hooks/useGSAPSectionAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "./Counter";
import JourneyTree from "./JourneyTree";
import CardParticles from "./CardParticles";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const experience = getExperience();
  const sectionRef = useGSAPSectionAnimation({
    y: 40,
    scale: 0.98,
    duration: 0.5,
  });
  const statsRef = useRef<HTMLDivElement>(null);

  // Convert stats to proper format for Counter component
  const statsArray = experience.stats.map((stat) => ({
    ...stat,
    value: parseInt(stat.value),
    suffix: stat.value.includes("%")
      ? "%"
      : stat.value.includes("+")
      ? "+"
      : "",
  }));

  useEffect(() => {
    if (!statsRef.current) return;

    // Stagger animation for stat cards
    const statCards = statsRef.current.querySelectorAll(".stat-card");
    gsap.fromTo(
      statCards,
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
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantico-bold">
            <span className="text-gradient">Experience & Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto quantico-regular">
            My professional journey and achievements over the years
          </p>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {statsArray.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);

            return (
              <CardParticles
                key={index}
                particleCount={12}
                particleColor="#ff6600"
              >
                <div className="stat-card card-animated-bg text-center p-6 rounded-xl bg-card border border-border/20 hover:border-primary/50 transition-all duration-300">
                  {IconComponent && (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 quantico-bold">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-muted-foreground quantico-regular">
                    {stat.label}
                  </p>
                </div>
              </CardParticles>
            );
          })}
        </div>

        <div className="relative">
          <h3 className="text-2xl font-bold text-center mb-12 text-gradient quantico-bold">
            Professional Journey
          </h3>
          <JourneyTree />
        </div>
      </div>
    </section>
  );
}
