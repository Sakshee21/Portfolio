'use client';

import { motion } from 'framer-motion';

const stacks = [
  {
    title: 'Core Languages',
    status: 'HEALTHY',
    items: [
      { name: 'C', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'TypeScript', level: 72 },
      { name: 'JavaScript', level: 70 },
      { name: 'Dart/Flutter', level: 60 },
      { name: 'SQL', level: 65 },
    ],
  },
  {
    title: 'Distributed Layer',
    status: 'STABLE',
    items: [
      { name: 'Gossip Protocols', level: 88 },
      { name: 'P2P Networking', level: 85 },
      { name: 'Epidemic Dissemination', level: 82 },
      { name: 'Consensus Protocols', level: 72 },
      { name: 'UDP/Socket Programming', level: 80 },
    ],
  },
  {
    title: 'Security Layer',
    status: 'HARDENED',
    items: [
      { name: 'WebCrypto API', level: 85 },
      { name: 'Zero-Trust Auth', level: 82 },
      { name: 'PBKDF2 / HMAC-SHA256', level: 80 },
      { name: 'Smart Contract Security', level: 72 },
      { name: 'Behavioral Risk Scoring', level: 75 },
      { name: 'Threat Modeling', level: 68 },
    ],
  },
  {
    title: 'Blockchain Layer',
    status: 'ACTIVE',
    items: [
      { name: 'Solidity', level: 75 },
      { name: 'Hardhat', level: 70 },
      { name: 'Web3.js', level: 72 },
      { name: 'Smart Contracts', level: 78 },
      { name: 'EVM / L2', level: 65 },
    ],
  },
  {
    title: 'Observability / ML',
    status: 'ACTIVE',
    items: [
      { name: 'scikit-learn / XGBoost', level: 82 },
      { name: 'SHAP', level: 78 },
      { name: 'Concept Drift Detection', level: 80 },
      { name: 'Feature Engineering', level: 75 },
      { name: 'IBM Watsonx / LLMs', level: 70 },
      { name: 'Few-Shot Prompting', level: 72 },
    ],
  },
  {
    title: 'Backend / DevOps',
    status: 'STABLE',
    items: [
      { name: 'FastAPI', level: 78 },
      { name: 'React + Vite', level: 70 },
      { name: 'JWT Auth', level: 75 },
      { name: 'GitHub Actions', level: 68 },
      { name: 'Firebase Auth', level: 65 },
      { name: 'REST API Design', level: 80 },
    ],
  },
];

export function TechnologyRegistry() {
  return (
    <section id="stack" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--violet max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-cyan mb-3">TECH_REGISTRY // HEALTH_MONITOR</p>
              <h2 className="text-4xl md:text-5xl font-bold">Technology Registry</h2>
            </div>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mb-10">
            A live view of the tooling and systems I use most — modeled as health indicators instead of a static list.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stacks.map((stack, index) => (
              <motion.div
                key={stack.title}
                className="group border border-dark-border rounded-2xl p-6 bg-dark-bg/68 backdrop-blur transition hover:border-cyan/40 hover:bg-dark-bg/86"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-400 font-mono mb-1">SYSTEM_LAYER</p>
                    <h3 className="text-xl font-semibold text-white">{stack.title}</h3>
                  </div>
                  <span className="rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 text-xs font-mono text-cyan">
                    {stack.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {stack.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                        <span>{item.name}</span>
                        <span className="text-cyan font-mono">{item.level}%</span>
                      </div>
                      <div className="h-2 rounded bg-dark-border/80">
                        <div
                          className="h-2 rounded bg-gradient-to-r from-cyan to-blue-electric shadow-[0_0_18px_rgba(79,255,176,0.15)]"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
