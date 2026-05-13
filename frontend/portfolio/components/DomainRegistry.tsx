'use client';

import { motion } from 'framer-motion';
import { Shield, Server, Network, Radar, KeyRound, Database } from 'lucide-react';

const domains = [
  {
    title: 'Distributed Systems',
    tag: 'ANTI_ENTROPY',
    description: 'Consensus, gossip propagation, and fault-tolerant coordination patterns.',
    chips: ['Cyclon', 'Raft', 'Vector Clocks', 'CRDTs'],
    icon: Network,
  },
  {
    title: 'Backend Engineering',
    tag: 'SERVICE_MESH',
    description: 'High-throughput APIs, orchestration flows, and data reliability under load.',
    chips: ['Go', 'Rust', 'gRPC', 'Kafka'],
    icon: Server,
  },
  {
    title: 'Security & Identity',
    tag: 'ZERO_TRUST',
    description: 'Passwordless auth, policy enforcement, and secure session orchestration.',
    chips: ['WebAuthn', 'mTLS', 'OAuth2', 'DID'],
    icon: Shield,
  },
  {
    title: 'Observability',
    tag: 'TRACE_STREAM',
    description: 'Metrics, tracing, and system diagnostics for live infrastructure clarity.',
    chips: ['Tracing', 'Metrics', 'Alerts', 'Dashboards'],
    icon: Radar,
  },
  {
    title: 'Data Systems',
    tag: 'RELIABILITY',
    description: 'Resilient storage, caching, and consistent data pipelines.',
    chips: ['PostgreSQL', 'Redis', 'Event Logs', 'Indexing'],
    icon: Database,
  },
  {
    title: 'Trust Protocols',
    tag: 'HANDSHAKE',
    description: 'Secure flows for node identity, verification, and safe exchange.',
    chips: ['FIDO2', 'Passkeys', 'PKCE', 'JWT'],
    icon: KeyRound,
  },
];

export function DomainRegistry() {
  return (
    <section id="domains" className="relative z-10 py-24 px-6">
      <div className="registry-shell registry-shell--blue max-w-6xl mx-auto rounded-[2rem] border border-dark-border bg-dark-card/55 backdrop-blur-md shadow-2xl overflow-hidden">
        <motion.div
          className="px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-cyan mb-3">DOMAIN_REGISTRY // NETWORK_OVERVIEW</p>
              <h2 className="text-4xl md:text-5xl font-bold">Domain Registry</h2>
            </div>
          </div>
          <p className="text-gray-300 text-lg mb-12">
            Core engineering domains represented as active nodes in the portfolio network.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.title}
                  className="border border-dark-border rounded-2xl p-6 bg-dark-bg/68 backdrop-blur-sm transition duration-300 hover:border-cyan/35 hover:bg-dark-bg/84"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-cyan/40 flex items-center justify-center text-cyan">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{domain.title}</h3>
                        <p className="text-xs font-mono text-cyan">{domain.tag}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 border border-cyan/40 text-cyan rounded">
                      ACTIVE
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-5">{domain.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {domain.chips.map((chip) => (
                      <span key={chip} className="px-2 py-1 rounded text-xs bg-dark-border text-gray-300">
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
