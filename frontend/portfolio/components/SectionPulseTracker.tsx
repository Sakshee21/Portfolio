'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTION_IDS = ['home', 'about', 'experience', 'domains', 'topology', 'projects', 'stack', 'contact'];
const SECTION_LABELS: Record<string, string> = {
  home: 'ROOT HANDSHAKE',
  about: 'NODE PROFILE',
  experience: 'EXPERIENCE LOG',
  domains: 'DOMAIN REGISTRY',
  topology: 'TOPOLOGY MAP',
  projects: 'PROJECT REGISTRY',
  stack: 'TECH REGISTRY',
  contact: 'SECURE CHANNEL',
};

export function SectionPulseTracker() {
  const [activeSection, setActiveSection] = useState('home');
  const [orbY, setOrbY] = useState(110);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );

    if (!sections.length) return;

    let rafId = 0;

    const syncState = () => {
      const viewportTarget = window.innerHeight * 0.46;
      let bestSection = sections[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!isVisible) continue;

        const center = rect.top + rect.height * 0.35;
        const distance = Math.abs(center - viewportTarget);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = section;
        }
      }

      const activeId = bestSection.id;
      setActiveSection(activeId);

      for (const section of sections) {
        section.dataset.active = section.id === activeId ? 'true' : 'false';
        section.dataset.authenticated = section.id === activeId ? 'true' : 'false';
      }

      const bestRect = bestSection.getBoundingClientRect();
      const targetY = Math.max(112, Math.min(window.innerHeight - 140, bestRect.top + bestRect.height * 0.48));
      setOrbY(targetY);
    };

    const scheduleSync = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(syncState);
    };

    syncState();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      for (const section of sections) {
        section.dataset.active = 'false';
        section.dataset.authenticated = 'false';
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[45] hidden lg:block" aria-hidden="true">
      <div className="absolute left-1/2 top-6 h-[calc(100vh-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan/10 via-cyan/25 to-transparent" />

      <motion.div
        className="absolute left-1/2 top-6 h-[calc(100vh-3rem)] w-[120px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(79,255,176,0.02),transparent_18%,rgba(103,232,249,0.04)_48%,transparent_78%)] opacity-70"
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border border-cyan/70 bg-cyan shadow-[0_0_30px_rgba(79,255,176,0.72)]"
        animate={{ y: orbY, scale: 1 }}
        transition={{ type: 'spring', stiffness: 95, damping: 18, mass: 1.2 }}
      />

      <motion.div
        className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-cyan/20 bg-cyan/8 blur-sm"
        animate={{ y: orbY - 8, opacity: [0.2, 0.45, 0.2] }}
        transition={{
          y: { type: 'spring', stiffness: 90, damping: 20, mass: 1.2 },
          opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full border border-cyan/25 bg-dark-card/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan shadow-lg"
        animate={{ y: orbY + 20, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 1.1 }}
      >
        AUTH // {SECTION_LABELS[activeSection] ?? activeSection.toUpperCase()}
      </motion.div>
    </div>
  );
}