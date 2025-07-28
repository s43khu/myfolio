'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null);

  const fadeInUp = (delay = 0, duration = 1) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const staggerIn = (selector: string, delay = 0, stagger = 0.1) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const scaleIn = (delay = 0, duration = 1) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const slideInLeft = (delay = 0, duration = 1) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const slideInRight = (delay = 0, duration = 1) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const typewriter = (text: string, delay = 0, speed = 0.05) => {
    if (!elementRef.current) return;

    elementRef.current.textContent = '';
    
    gsap.to(elementRef.current, {
      duration: text.length * speed,
      delay,
      ease: 'none',
      onUpdate: function() {
        const progress = this.progress();
        const currentLength = Math.floor(text.length * progress);
        elementRef.current!.textContent = text.slice(0, currentLength);
      },
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });
  };

  const parallax = (speed = 0.5) => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  return {
    elementRef,
    fadeInUp,
    staggerIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    typewriter,
    parallax,
  };
}; 