'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useOrbContext } from '@/context/OrbContext';

export function ScrollOrb() {
  const { orbY, enabled, nearSectionId, impact } = useOrbContext();
  const [flareActive, setFlareActive] = useState(false);

  useEffect(() => {
    if (!impact) {
      return;
    }

    setFlareActive(true);
    const timeout = window.setTimeout(() => setFlareActive(false), 220);
    return () => window.clearTimeout(timeout);
  }, [impact]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`scroll-orb fixed left-7 top-0 z-[60] hidden lg:block ${
        flareActive ? 'scroll-orb--flare' : ''
      }`}
      style={{ transform: `translateY(${orbY}px)` }}
      aria-hidden="true"
    >
      <div className="scroll-orb__trail" />
      <div className="scroll-orb__ring scroll-orb__ring--pulse" />
      <div className="scroll-orb__ring scroll-orb__ring--mid" />
      <div className="scroll-orb__core" />
      <div className="scroll-orb__core-flare" />

      {nearSectionId && (
        <motion.div
          key={nearSectionId}
          className="scroll-orb__handshake"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {impact && (
        <motion.div
          key={impact.key}
          className="scroll-orb__impact"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 5.5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}
