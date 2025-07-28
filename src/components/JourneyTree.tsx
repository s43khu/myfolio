"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getExperience } from "@/utils/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardParticles from "./CardParticles";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyTree() {
  const experience = getExperience();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger animation for journey items
    const journeyItems = containerRef.current.querySelectorAll(".journey-item");
    gsap.fromTo(
      journeyItems,
      {
        opacity: 0,
        x: -50,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
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
    <div ref={containerRef} className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent"></div>

      <div className="space-y-8">
        {experience.journey.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="journey-item relative ml-16"
          >
            <div className="absolute left-[-2rem] top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>

            <CardParticles particleCount={10} particleColor="#ff6600">
              <div className="card-animated-bg bg-card border border-border/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-primary font-medium">{item.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                    {item.period}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{item.description}</p>

                {item.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-foreground mb-2">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-1">
                      {item.achievements.map(
                        (achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardParticles>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
