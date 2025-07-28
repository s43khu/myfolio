import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function useGSAPShine<T extends HTMLElement = HTMLElement>(options?: { angle?: number; duration?: number }) {
  const shineRef = useRef<T | null>(null);

  useEffect(() => {
    if (!shineRef.current) return;
    const el = shineRef.current;
    // Create a pseudo-element for shine if not present
    let shineEl = el.querySelector('.gsap-shine') as HTMLElement | null;
    if (!shineEl) {
      shineEl = document.createElement('span');
      shineEl.className = 'gsap-shine';
      shineEl.style.position = 'absolute';
      shineEl.style.top = '0';
      shineEl.style.left = '-60%';
      shineEl.style.width = '60%';
      shineEl.style.height = '100%';
      shineEl.style.pointerEvents = 'none';
      shineEl.style.background = 'linear-gradient(' + (options?.angle ?? 120) + 'deg, transparent 0%, #fff6e6 50%, transparent 100%)';
      shineEl.style.opacity = '0.5';
      shineEl.style.transform = 'skewX(-20deg)';
      shineEl.style.zIndex = '2';
      el.style.position = 'relative';
      el.appendChild(shineEl);
    }
    const tween = gsap.fromTo(
      shineEl,
      { left: '-60%' },
      {
        left: '120%',
        duration: options?.duration ?? 1.5,
        repeat: -1,
        ease: 'power1.inOut',
      }
    );
    return () => {
      tween.kill();
      if (shineEl && shineEl.parentNode === el) el.removeChild(shineEl);
    };
  }, [options]);

  return shineRef;
} 