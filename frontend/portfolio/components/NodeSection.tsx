'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimate, useReducedMotion } from 'framer-motion';

import { useOrbContext } from '@/context/OrbContext';
import { CornerBrackets } from '@/components/CornerBrackets';
import { StatusBadge } from '@/components/StatusBadge';
import { useNodeChildren, type NodeChild } from '@/hooks/useNodeChildren';

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
  const scanRafRef = useRef<number | null>(null);
  const arrivalsRef = useRef(new Set<HTMLElement>());
  const [scope, animate] = useAnimate();
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { itemsRef, ready } = useNodeChildren(contentRef, { enabled });
  const triggerRafRef = useRef<number | null>(null);

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
      if (scanRafRef.current) {
        window.cancelAnimationFrame(scanRafRef.current);
        scanRafRef.current = null;
      }
      if (triggerRafRef.current) {
        window.cancelAnimationFrame(triggerRafRef.current);
        triggerRafRef.current = null;
      }
    };
  }, []);

  const applyOfflineState = useCallback(() => {
    itemsRef.current.forEach((item) => {
      const element = item.element;
      element.classList.remove('replica-arrived');
      if (!prefersReducedMotion) {
        element.classList.add('replica-drifting');
        element.style.opacity = '0';
        element.style.filter = `blur(${item.blur}px)`;
        element.style.transform = `translate(${item.origin.x}px, ${item.origin.y}px) scale(${item.scale})`;
      } else {
        element.classList.remove('replica-drifting');
        element.style.opacity = '0';
        element.style.filter = 'none';
        element.style.transform = 'none';
      }
    });
  }, [itemsRef, prefersReducedMotion]);

  const revealReplicaBadge = useCallback(
    (item: NodeChild, delaySeconds: number) => {
      const element = item.element;
      const computed = window.getComputedStyle(element);
      if (computed.position === 'static') {
        element.style.position = 'relative';
      }

      const badge = document.createElement('span');
      badge.className = 'replica-badge';
      badge.textContent = `\u2713 replica_0x${item.hexId}`;
      element.appendChild(badge);

      const timer = window.setTimeout(() => {
        animate(
          badge,
          { opacity: [0, 0.8, 0] },
          { duration: 0.8, ease: 'easeOut' }
        );
      }, delaySeconds * 1000);

      const cleanup = window.setTimeout(() => {
        badge.remove();
      }, delaySeconds * 1000 + 900);

      timersRef.current.push(timer, cleanup);
    },
    [animate]
  );

  const triggerArrival = useCallback(
    (item: NodeChild) => {
      const element = item.element;
      if (arrivalsRef.current.has(element)) {
        return;
      }

      arrivalsRef.current.add(element);
      element.classList.remove('replica-drifting');

      const elementRect = element.getBoundingClientRect();
      const isVisible = elementRect.bottom > 0 && elementRect.top < window.innerHeight;
      const batchDelay = Math.floor(item.orderIndex / 20) * 0.1;
      const listDelay = item.isListItem ? item.listIndex * 0.025 : 0;
      const delaySeconds = batchDelay + listDelay;

      if (!isVisible) {
        element.style.opacity = '1';
        element.style.filter = 'blur(0px)';
        element.style.transform = 'translate(0px, 0px) scale(1)';
        return;
      }

      if (prefersReducedMotion) {
        animate(element, { opacity: 1 }, { duration: 0.25, delay: delaySeconds, ease: 'easeOut' });
        return;
      }

      element.style.transform = `translate(${item.origin.x}px, ${item.origin.y}px) scale(${item.scale})`;
      element.style.filter = `blur(${item.blur}px)`;

      const spring = item.isCard
        ? { type: 'spring', stiffness: 220, damping: 14, mass: 0.8, delay: delaySeconds }
        : { type: 'spring', stiffness: 180, damping: 18, mass: 0.8, delay: delaySeconds };

      animate(
        element,
        { x: 0, y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 },
        spring
      );

      if (item.isHeading) {
        const baseColor = window.getComputedStyle(element).color;
        animate(
          element,
          { color: [baseColor, '#4fffb0', baseColor] },
          { duration: 0.12, delay: delaySeconds + 0.12, ease: 'easeOut' }
        );
      }

      if (item.isCard) {
        const borderColor = window.getComputedStyle(element).borderColor;
        animate(
          element,
          { borderColor: ['rgba(79, 255, 176, 0.6)', borderColor] },
          { duration: 0.4, delay: delaySeconds, ease: 'easeOut' }
        );
      }

      revealReplicaBadge(item, delaySeconds + 0.12);
    },
    [animate, prefersReducedMotion, revealReplicaBadge]
  );

  const startScanline = useCallback(
    (sectionHeight: number) => {
      if (!sectionRef.current) {
        return;
      }

      const initialRect = sectionRef.current.getBoundingClientRect();
      const startDelay = 200;
      const duration = 600;
      const startTime = performance.now() + startDelay;

      const tick = (now: number) => {
        if (!sectionRef.current) {
          return;
        }

        if (now < startTime) {
          scanRafRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min(1, (now - startTime) / duration);
        const scanY = progress * sectionHeight;
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const rectTop = Number.isFinite(sectionRect.top) ? sectionRect.top : initialRect.top;

        itemsRef.current.forEach((item) => {
          const elementTop = item.element.getBoundingClientRect().top - rectTop;
          if (scanY >= elementTop) {
            triggerArrival(item);
          }
        });

        if (progress < 1) {
          scanRafRef.current = window.requestAnimationFrame(tick);
        }
      };

      scanRafRef.current = window.requestAnimationFrame(tick);
    },
    [itemsRef, triggerArrival]
  );

  const runSequence = useCallback(() => {
    if (!sectionRef.current) {
      return;
    }

    emitImpact(orbY);
    setStatus('powering-up');
    arrivalsRef.current.clear();
    if (scanRafRef.current) {
      window.cancelAnimationFrame(scanRafRef.current);
      scanRafRef.current = null;
    }

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

    startScanline(sectionHeight);

    timersRef.current.push(
      window.setTimeout(() => {
        setStatus('online');
        setUptimeStart(Date.now());
      }, 700)
    );
  }, [animate, emitImpact, orbY, startScanline]);

  useEffect(() => {
    if (!enabled || !ready) {
      return;
    }

    if (status === 'offline') {
      applyOfflineState();
    }
  }, [applyOfflineState, enabled, ready, status]);

  const checkTrigger = useCallback(() => {
    if (!enabled || triggeredRef.current || !sectionRef.current) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    const orbDocY = orbY + window.scrollY;
    const sectionTop = rect.top + window.scrollY;
    const threshold = 8;

    if (isVisible && orbDocY >= sectionTop - threshold) {
      triggeredRef.current = true;
      runSequence();
    }
  }, [enabled, orbY, runSequence]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const scheduleCheck = () => {
      if (triggerRafRef.current) {
        window.cancelAnimationFrame(triggerRafRef.current);
      }
      triggerRafRef.current = window.requestAnimationFrame(() => {
        triggerRafRef.current = null;
        checkTrigger();
      });
    };

    scheduleCheck();
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);

    return () => {
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (triggerRafRef.current) {
        window.cancelAnimationFrame(triggerRafRef.current);
        triggerRafRef.current = null;
      }
    };
  }, [checkTrigger, enabled]);

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
      <div className="node-section__content" data-node="content" ref={contentRef}>
        {children}
      </div>
    </section>
  );
}
