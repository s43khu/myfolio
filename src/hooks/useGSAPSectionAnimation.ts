import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPSectionAnimation(options?: { y?: number; scale?: number; duration?: number; delay?: number }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const anim = gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: options?.y ?? 40,
        scale: options?.scale ?? 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    return () => { anim.kill(); };
  }, [options]);

  return sectionRef;
} 