'use client';

import { motion } from 'framer-motion';
import { Shield, Server, Network, Radar, KeyRound, Database } from 'lucide-react';

const domains = [
  {
    name: 'Languages',
    sublabel: 'CORE_STACK',
    status: 'ACTIVE',
    description: 'Across systems programming, backend services, and full-stack development.',
    tags: ['C', 'Python', 'Java', 'TypeScript', 'JavaScript', 'Dart', 'SQL'],
    icon: Server,
  },
  {
    name: 'Distributed Systems',
    sublabel: 'ANTI_ENTROPY',
    status: 'ACTIVE',
    description:
      'Implemented Cyclon gossip from scratch in C — peer sampling, epidemic dissemination, convergence analysis across 128-node simulations.',
    tags: ['Gossip Protocols', 'P2P Networking', 'UDP Sockets', 'Epidemic Broadcast', 'Peer Sampling', 'Cyclon'],
    icon: Network,
  },
  {
    name: 'Security & Cryptography',
    sublabel: 'ZERO_TRUST',
    status: 'HARDENED',
    description:
      'Device-bound RSA key generation, PBKDF2 key derivation, behavioral risk scoring, and SHA-256 tamper-evident audit chains.',
    tags: ['WebCrypto API', 'RSA-2048', 'AES-256-GCM', 'PBKDF2', 'Zero-Trust', 'FIDO2', 'JWT'],
    icon: Shield,
  },
  {
    name: 'Blockchain',
    sublabel: 'ON_CHAIN',
    status: 'ACTIVE',
    description:
      'Four production smart contracts for SafeHavenWS — RBAC, SOS case creation, case registry, and volunteer coordination on EVM.',
    tags: ['Solidity', 'Hardhat', 'Web3.js', 'Smart Contracts', 'EVM', 'Firebase'],
    icon: Database,
  },
  {
    name: 'ML & Observability',
    sublabel: 'ML_PIPELINE',
    status: 'ACTIVE',
    description:
      'Explainable IDS trained on 2.83M records with temporal concept drift monitoring. Medical triage chatbot via few-shot prompting on Granite-13B.',
    tags: ['XGBoost', 'SHAP / XAI', 'Concept Drift', 'scikit-learn', 'Few-Shot Prompting', 'IBM Watsonx'],
    icon: Radar,
  },
  {
    name: 'Full-Stack & DevOps',
    sublabel: 'FULL_STACK',
    status: 'STABLE',
    description:
      'End-to-end web applications with role-based access control, analytics pipelines, and automated CI/CD deployment.',
    tags: ['React', 'FastAPI', 'Node.js', 'REST APIs', 'GitHub Actions', 'SQLite', 'JWT Auth'],
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
                  key={domain.name}
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
                        <h3 className="text-lg font-semibold text-white">{domain.name}</h3>
                        <p className="text-xs font-mono text-cyan">{domain.sublabel}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 border border-cyan/40 text-cyan rounded">
                      {domain.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-5">{domain.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {domain.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs bg-dark-border text-gray-300">
                        {tag}
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
