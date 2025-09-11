"use client";

import { useEffect, useRef } from "react";
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { getPersonalInfo } from "@/utils/data";
import { useGSAP } from "@/hooks/useGSAP";
import { useGSAPSectionAnimation } from "@/hooks/useGSAPSectionAnimation";
import { useGSAPShine } from "@/hooks/useGSAPShine";
import Counter from "./Counter";
import AnimatedName from "./AnimatedName";
import ModelCard from "./ModelCard";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const personalInfo = getPersonalInfo();
  const { elementRef, fadeInUp, typewriter } = useGSAP();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const sectionRef = useGSAPSectionAnimation({
    y: 60,
    scale: 0.95,
    duration: 0.7,
  });

  // Shine refs for buttons
  const getInTouchShineRef = useGSAPShine<HTMLAnchorElement>();
  const downloadResumeShineRef = useGSAPShine<HTMLAnchorElement>();
  const githubShineRef = useGSAPShine<HTMLAnchorElement>();
  const linkedinShineRef = useGSAPShine<HTMLAnchorElement>();
  const twitterShineRef = useGSAPShine<HTMLAnchorElement>();

  useEffect(() => {
    if (titleRef.current) {
      typewriter(personalInfo.title, 0.5, 0.05);
    }
  }, [personalInfo.title, typewriter]);

  // NOTE: Advanced name animation with GSAP
  useEffect(() => {
    if (!nameRef.current) return;

    const name = personalInfo.name;
    const nameContainer = nameRef.current;

    // Clear existing content
    nameContainer.innerHTML = "";

    // Create individual letter spans
    const letters = name.split("").map((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter; // Use non-breaking space
      span.className = "inline-block relative text-gradient";
      span.style.transform = "translateY(100px) rotateX(90deg)";
      span.style.opacity = "0";
      span.style.filter = "blur(10px)";
      span.style.color = "#ff6600"; // Fallback orange color
      nameContainer.appendChild(span);
      return span;
    });

    // Create timeline for name animation
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate each letter individually
    letters.forEach((letter, index) => {
      tl.to(
        letter,
        {
          duration: 0.6,
          y: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "back.out(1.7)",
          delay: index * 0.1,
        },
        index * 0.1
      );
    });

    // Add floating animation after letters appear
    tl.to(
      letters,
      {
        duration: 2,
        y: -10,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.1,
      },
      "-=0.5"
    );

    // Add glow effect
    tl.to(
      nameContainer,
      {
        duration: 1,
        filter: "drop-shadow(0 0 20px rgba(255, 165, 0, 0.5))",
        ease: "power2.out",
      },
      "-=1"
    );

    // Add 3D rotation effect on hover
    letters.forEach((letter) => {
      letter.addEventListener("mouseenter", () => {
        gsap.to(letter, {
          duration: 0.3,
          scale: 1.2,
          rotateY: 15,
          rotateX: 15,
          filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.8))",
          ease: "power2.out",
        });
      });

      letter.addEventListener("mouseleave", () => {
        gsap.to(letter, {
          duration: 0.3,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          filter: "drop-shadow(0 0 5px rgba(255, 165, 0, 0.3))",
          ease: "power2.out",
        });
      });
    });

    // Add particle effect around name
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      nameContainer.appendChild(particle);

      gsap.to(particle, {
        duration: 2,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
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
    const particleInterval = setInterval(createParticle, 300);

    return () => {
      clearInterval(particleInterval);
      tl.kill();
    };
  }, [personalInfo.name]);

  // Convert stats object to array for mapping
  const statsArray = [
    {
      label: "Years Experience",
      value: parseInt(personalInfo.stats.experience),
      suffix: "+",
    },
    {
      label: "Projects Completed",
      value: parseInt(personalInfo.stats.projects),
      suffix: "+",
    },
    {
      label: "Happy Clients",
      value: parseInt(personalInfo.stats.clients),
      suffix: "+",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - 3D Model Card */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <ModelCard size={0.5} />
          </div>

          {/* Right Column - Content */}
          <div className="text-center lg:text-right order-1 lg:order-2">
            {/* NOTE: Choose between enhanced inline animation or advanced 3D component */}
            {/* Option 1: Enhanced inline animation (current) */}
            <div
              ref={nameRef}
              className="text-4xl md:text-6xl font-bold mb-6 cursor-default"
              style={{ perspective: "1000px" }}
            />

            {/* Option 2: Advanced 3D AnimatedName component (uncomment to use) */}
            {/* <AnimatedName 
              name={personalInfo.name}
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient cursor-default"
            /> */}

            <h2
              ref={titleRef}
              className="text-xl md:text-2xl text-muted-foreground mb-6 h-12 quantico-regular"
            />

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:ml-auto lg:mr-0 quantico-regular">
              {personalInfo.description}
            </p>

            {/* Stats - Horizontal layout for better space usage */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 mb-8">
              {statsArray.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1 quantico-bold">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground quantico-regular">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 mb-8">
              <a
                ref={getInTouchShineRef}
                href={`mailto:${personalInfo.email}`}
                className="relative px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-orange-700 transition-colors duration-300 overflow-hidden quantico-bold"
              >
                <Mail className="inline-block w-4 h-4 mr-2" />
                Get In Touch
              </a>

              <a
                ref={downloadResumeShineRef}
                href="/resume_my.pdf"
                download="resume_my.pdf"
                className="relative px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden quantico-bold"
              >
                <Download className="inline-block w-4 h-4 mr-2" />
                Download Resume
              </a>

              <a
                ref={githubShineRef}
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden quantico-bold"
              >
                <Github className="inline-block w-4 h-4 mr-2" />
                GitHub
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-end space-x-4">
              {personalInfo.social.linkedin && (
                <a
                  ref={linkedinShineRef}
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}

              {personalInfo.social.twitter && (
                <a
                  ref={twitterShineRef}
                  href={personalInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
