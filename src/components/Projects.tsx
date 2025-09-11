"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjects } from "@/utils/data";
import { getIcon } from "@/utils/icons";
// import { useGSAPSectionAnimation } from '@/hooks/useGSAPSectionAnimation';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardParticles from "./CardParticles";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projects = getProjects();
  const [currentProject, setCurrentProject] = useState(0);
  // const sectionRef = useGSAPSectionAnimation({ y: 40, scale: 0.98, duration: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [projects.length]);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    // Only run GSAP animations once on initial load
    const elements = containerRef.current.querySelectorAll(".project-element");
    gsap.fromTo(
      elements,
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
        onComplete: () => {
          hasAnimated.current = true;
        },
      }
    );
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantico-bold">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto quantico-regular">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 project-element"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground quantico-bold">
                Recent Work
              </h3>
              <p className="text-muted-foreground text-lg quantico-regular">
                Each project represents a unique challenge and demonstrates my
                ability to deliver high-quality solutions across different
                technologies.
              </p>
            </div>

            <div className="flex space-x-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentProject ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={prevProject}
                className="p-2 rounded-full border border-border hover:border-primary transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                className="p-2 rounded-full border border-border hover:border-primary transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <CardParticles particleCount={20} particleColor="#ff6600">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-animated-bg bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 project-element"
            >
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  {React.createElement(getIcon(projects[currentProject].icon), {
                    className: "w-8 h-8 text-white",
                  })}
                </div>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 border border-primary/20 quantico-regular">
                  {projects[currentProject].category}
                </span>
                <h4 className="text-2xl font-bold text-foreground mb-4 quantico-bold">
                  {projects[currentProject].title}
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-6 quantico-regular">
                  {projects[currentProject].description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {projects[currentProject].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm quantico-regular"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center space-x-4">
                  <a
                    href={projects[currentProject].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-orange-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={projects[currentProject].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </CardParticles>
        </div>
      </div>
    </section>
  );
}
