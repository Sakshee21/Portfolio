'use client';

import { motion } from 'framer-motion';
import { GossipCanvas } from './GossipCanvas';

export function ProtocolSimulationSection() {
  return (
    <section id="simulation" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-cyan mb-3">PROTOCOL_SIMULATION // LIVE_PROPAGATION</p>
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">Gossip Propagation</h2>
              <p className="text-gray-400 mt-3 max-w-2xl">
                A live simulation of information spreading across a small peer set. Click a node to start,
                then watch informed peers fan out through the network.
              </p>
            </div>
            <span className="rounded-full border border-cyan/40 bg-dark-card/80 px-4 py-2 text-xs font-mono text-cyan">
              9 NODES • EVENTUAL CONSISTENCY
            </span>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-dark-border bg-dark-card/40 backdrop-blur-md shadow-2xl">
            <GossipCanvas />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark-bg/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-bg/80 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}