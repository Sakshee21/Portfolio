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
      <div className="registry-shell registry-shell--mint mx-auto flex max-w-7xl flex-col items-center gap-1.5 rounded-2xl border border-dark-border bg-dark-card/90 px-4 py-2.5 shadow-lg backdrop-blur-xl sm:flex-row sm:justify-between sm:gap-3 sm:rounded-full sm:py-2 md:px-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan shrink-0" />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-cyan truncate">
              SAKSHEE.UJJWAL.KUMAT
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] font-mono text-gray-300 sm:flex-nowrap sm:gap-5 sm:text-[11px] md:text-xs">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Cpu size={12} className="text-cyan" />
            NODES: <span className="text-cyan">06 ACTIVE</span>
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Activity size={12} className="text-blue" />
            GOSSIP: <span className="text-blue">LIVE</span>
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck size={12} className="text-purple" />
            CONSISTENCY: <span className="text-purple">EVENTUAL</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
