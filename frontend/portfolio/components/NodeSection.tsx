'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimate } from 'framer-motion';

import { useOrbContext } from '@/context/OrbContext';
import { CornerBrackets } from '@/components/CornerBrackets';
import { StatusBadge } from '@/components/StatusBadge';

type NodeSectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

type NodeStatus = 'offline' | 'powering-up' | 'online';

export function NodeSection({ id, className, children }: NodeSectionProps) {
  const { orbY, enabled, registerSection, emitImpact } = useOrbContext();
  const [status, setStatus] = useState<NodeStatus>('offline');
  const [uptimeStart, setUptimeStart] = useState<number | null>(null);
  const triggeredRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const [scope, animate] = useAnimate();
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      scope.current = node;
      if (enabled) {
        registerSection(id, node);
      }
    },
    [enabled, id, registerSection, scope]
  );

  useEffect(() => {
    return () => registerSection(id, null);
  }, [id, registerSection]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const runSequence = useCallback(() => {
    if (!sectionRef.current) {
      return;
    }

    emitImpact(orbY);
    setStatus('powering-up');

    const sectionHeight = sectionRef.current.offsetHeight;

    animate(
      '[data-node="sweep"]',
      { strokeDashoffset: [1, 0], opacity: [0, 1] },
      { duration: 0.5, delay: 0.05, ease: 'easeInOut' }
    );

    animate(
      '[data-node="scanline"]',
      { y: [0, sectionHeight], opacity: [0, 1, 0] },
      { duration: 0.6, delay: 0.2, ease: 'linear' }
    );

    animate(
      '[data-node="overlay"]',
      { opacity: 0 },
      { duration: 0.5, delay: 0.3, ease: 'easeOut' }
    );

    animate(
      '[data-node="content"]',
      { opacity: 1, filter: 'blur(0px) saturate(1)' },
      { duration: 0.5, delay: 0.3, ease: 'easeOut' }
    );

    animate(
      '[data-node="content"] > *',
      { opacity: [0, 1], y: [12, 0], scale: [0.97, 1] },
      { duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94], stagger: 0.06 }
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setStatus('online');
        setUptimeStart(Date.now());
      }, 700)
    );
  }, [animate, emitImpact, orbY]);

  useEffect(() => {
    if (!enabled || triggeredRef.current || !sectionRef.current) {
      return;
    }

    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const orbDocY = orbY + window.scrollY;

    if (orbDocY >= sectionTop) {
      triggeredRef.current = true;
      runSequence();
    }
  }, [enabled, orbY, runSequence]);

  const baseClassName = ['portfolio-section', className].filter(Boolean).join(' ');
  const mergedClassName = enabled ? `${baseClassName} node-section` : baseClassName;

  if (!enabled) {
    return (
      <section id={id} className={mergedClassName}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={mergedClassName} data-status={status} ref={setRefs}>
      <div className="node-section__overlay" data-node="overlay" />
      <div className="node-section__scanline" data-node="scanline" />
      <svg className="node-section__sweep" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect data-node="sweep" x="1" y="1" width="98" height="98" pathLength="1" />
      </svg>
      <CornerBrackets active={status !== 'offline'} />
      <StatusBadge status={status === 'online' ? 'online' : 'offline'} uptimeStart={uptimeStart} />
      <div className="node-section__content" data-node="content">
        {children}
      </div>
    </section>
  );
}
