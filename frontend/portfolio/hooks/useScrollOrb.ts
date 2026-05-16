'use client';

import { useEffect, useRef, useState } from 'react';

type UseScrollOrbOptions = {
  enabled?: boolean;
  lerp?: number;
};

export function useScrollOrb(options: UseScrollOrbOptions = {}) {
  const { enabled = true, lerp = 0.12 } = options;
  const [orbY, setOrbY] = useState(120);
  const targetRef = useRef(120);
  const currentRef = useRef(120);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let rafId = 0;

    const clamp = (value: number) => {
      const min = 80;
      const max = Math.max(min + 80, window.innerHeight - 120);
      return Math.min(Math.max(value, min), max);
    };

    const updateTarget = () => {
      targetRef.current = clamp(window.scrollY * 0.92);
    };

    const tick = () => {
      const current = currentRef.current;
      const next = current + (targetRef.current - current) * lerp;
      currentRef.current = next;
      setOrbY(next);
      rafId = window.requestAnimationFrame(tick);
    };

    updateTarget();
    currentRef.current = targetRef.current;
    setOrbY(targetRef.current);
    rafId = window.requestAnimationFrame(tick);

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, lerp]);

  return { orbY };
}
