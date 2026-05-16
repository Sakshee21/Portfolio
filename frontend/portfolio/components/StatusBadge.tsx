'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type StatusBadgeProps = {
  status: 'offline' | 'online';
  uptimeStart: number | null;
};

const formatUptime = (elapsedMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
};

export function StatusBadge({ status, uptimeStart }: StatusBadgeProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (status !== 'online' || !uptimeStart) {
      return;
    }

    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [status, uptimeStart]);

  const uptime = useMemo(() => {
    if (!uptimeStart) {
      return '00:00';
    }
    return formatUptime(now - uptimeStart);
  }, [now, uptimeStart]);

  return (
    <div className={`node-status ${status === 'online' ? 'node-status--online' : 'node-status--offline'}`}>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'offline' ? (
          <motion.div
            key="offline"
            className="node-status__content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <span className="node-status__line">
              <span className="node-status__dot node-status__dot--offline" />
              NODE_OFFLINE
            </span>
            <span className="node-status__line">signal: searching...</span>
          </motion.div>
        ) : (
          <motion.div
            key="online"
            className="node-status__content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <span className="node-status__line">
              <span className="node-status__dot node-status__dot--online" />
              NODE_ONLINE
            </span>
            <span className="node-status__line">uptime: {uptime}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
