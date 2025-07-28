"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { getNavigation, getPersonalInfo } from "@/utils/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = getNavigation();
  const personalInfo = getPersonalInfo();

  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Navbar animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px top",
        scrub: 0.5,
      },
    });

    tl.to(
      nameRef.current,
      {
        x: 50,
        scale: 0.9,
        duration: 0.7,
      },
      0
    );

    tl.to(
      navRef.current,
      {
        x: -50,
        scale: 0.9,
        duration: 0.6,
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div ref={nameRef} className="text-2xl font-bold text-gradient">
            AT
          </div>

          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
