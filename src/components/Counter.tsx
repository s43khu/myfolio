'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

const Counter = ({ end, duration = 2, delay = 0, suffix = '', className = '' }: CounterProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const element = counterRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          gsap.fromTo(
            element,
            { textContent: 0 },
            {
              textContent: end,
              duration,
              delay,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate: function() {
                const currentValue = Math.floor(this.targets()[0].textContent);
                element.textContent = currentValue + suffix;
              },
            }
          );
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, delay, suffix]);

  return (
    <span ref={counterRef} className={className}>
      0{suffix}
    </span>
  );
};

export default Counter; 