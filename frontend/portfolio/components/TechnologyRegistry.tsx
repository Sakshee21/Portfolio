'use client';

import { motion } from 'framer-motion';

const stacks = [
  {
    title: 'Core Languages',
    status: 'HEALTHY',
    items: [
      { name: 'C', level: 88 },
      { name: 'Go', level: 82 },
      { name: 'Rust', level: 74 },
      { name: 'Python', level: 76 },
      { name: 'TypeScript', level: 70 },
    ],
  },
  {
    title: 'Distributed Layer',
    status: 'STABLE',
    items: [
      { name: 'gRPC', level: 75 },
      { name: 'Kafka', level: 68 },
      { name: 'Consensus Protocols', level: 80 },
      { name: 'Service Discovery', level: 62 },
    ],
  },
  {
    title: 'Observability',
    status: 'ACTIVE',
    items: [
      { name: 'Tracing', level: 72 },
      { name: 'Metrics', level: 78 },
      { name: 'Alerting', level: 66 },
      { name: 'Dashboards', level: 70 },
    ],
  },
  {
    title: 'Security Layer',
    status: 'HARDENED',
    items: [
      { name: 'Zero-Trust', level: 78 },
      { name: 'WebAuthn', level: 72 },
      { name: 'mTLS', level: 70 },
      { name: 'Threat Modeling', level: 64 },
    ],
  },
];

export function TechnologyRegistry() {
  return (
    <section id="stack" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-cyan mb-3">TECH_REGISTRY // HEALTH_MONITOR</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Technology Registry</h2>
          <p className="text-gray-300 text-lg mb-10">
            A live view of the tooling and systems I use most — modeled as health indicators instead of a static list.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stacks.map((stack, index) => (
              <motion.div
                key={stack.title}
                className="border border-dark-border rounded-2xl p-6 bg-dark-bg/50 backdrop-blur"
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
                  <span className="text-xs font-mono px-3 py-1 border border-cyan text-cyan rounded">
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
                      <div className="h-2 bg-dark-border rounded">
                        <div
                          className="h-2 rounded bg-gradient-to-r from-cyan to-blue-electric"
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
