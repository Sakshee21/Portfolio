'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { useScrollOrb } from '@/hooks/useScrollOrb';

type ImpactState = {
  key: number;
  y: number;
};

type OrbContextValue = {
  orbY: number;
  enabled: boolean;
  registerSection: (id: string, element: HTMLElement | null) => void;
  nearSectionId: string | null;
  impact: ImpactState | null;
  emitImpact: (y: number) => void;
};

const OrbContext = createContext<OrbContextValue | null>(null);

export function OrbProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const { orbY } = useScrollOrb({ enabled });
  const sectionsRef = useRef(new Map<string, HTMLElement>());
  const [nearSectionId, setNearSectionId] = useState<string | null>(null);
  const nearRef = useRef<string | null>(null);
  const [impact, setImpact] = useState<ImpactState | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (!element) {
      sectionsRef.current.delete(id);
      return;
    }
    sectionsRef.current.set(id, element);
  }, []);

  const emitImpact = useCallback((y: number) => {
    setImpact({ key: Date.now(), y });
  }, []);

  useEffect(() => {
    if (!enabled) {
      setNearSectionId(null);
      nearRef.current = null;
      return;
    }

    let rafId = 0;

    const tick = () => {
      const orbDocY = orbY + window.scrollY;
      let nextNear: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionsRef.current.forEach((element, id) => {
        const top = element.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(orbDocY - top);
        if (distance < bestDistance) {
          bestDistance = distance;
          nextNear = id;
        }
      });

      const candidate = bestDistance <= 100 ? nextNear : null;
      if (nearRef.current !== candidate) {
        nearRef.current = candidate;
        setNearSectionId(candidate);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [enabled, orbY]);

  const value = useMemo(
    () => ({
      orbY,
      enabled,
      registerSection,
      nearSectionId,
      impact,
      emitImpact,
    }),
    [orbY, enabled, registerSection, nearSectionId, impact, emitImpact]
  );

  return <OrbContext.Provider value={value}>{children}</OrbContext.Provider>;
}

export function useOrbContext() {
  const context = useContext(OrbContext);
  if (!context) {
    throw new Error('useOrbContext must be used within OrbProvider');
  }
  return context;
}
