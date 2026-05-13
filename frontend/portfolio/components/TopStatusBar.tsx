'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Cpu } from 'lucide-react';

export function TopStatusBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 px-3 md:px-5 py-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex items-center justify-between gap-3 rounded-full border border-dark-border bg-dark-card/85 backdrop-blur-xl px-4 md:px-5 py-2 shadow-lg max-w-7xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan shrink-0" />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-cyan truncate">
              SAKSHEE.UJJWAL.KUMAT
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-[11px] md:text-xs font-mono text-gray-300">
          <span className="flex items-center gap-2">
            <Cpu size={13} className="text-cyan" />
            NODES: <span className="text-cyan">09 ACTIVE</span>
          </span>
          <span className="flex items-center gap-2">
            <Activity size={13} className="text-blue" />
            GOSSIP: <span className="text-blue">LIVE</span>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-purple" />
            CONSISTENCY: <span className="text-purple">EVENTUAL</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
