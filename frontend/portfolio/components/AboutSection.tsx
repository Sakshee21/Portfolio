'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--mint max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-cyan mb-3">NODE_PROFILE // ABOUT</p>
              <h2 className="text-4xl md:text-5xl font-bold">About the Operator</h2>
            </div>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            I build distributed systems that stay reliable under network turbulence, with a focus on
            gossip protocols, WebAuthn security, and backend observability. My projects translate complex
            infrastructure into interfaces that are usable, readable, and precise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {[
              { label: 'PRIMARY_FOCUS', value: 'Gossip & Anti-Entropy' },
              { label: 'SPECIALTY', value: 'Passkeys + Zero-Trust' },
              { label: 'MODE', value: 'Explainable Security' },
            ].map((item) => (
              <div key={item.label} className="border border-dark-border rounded-2xl p-4 bg-dark-bg/50 transition hover:border-cyan/40 hover:bg-dark-bg/70">
                <p className="text-xs text-gray-400 font-mono mb-2">{item.label}</p>
                <p className="text-cyan font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
