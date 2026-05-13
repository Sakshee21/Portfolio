export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  category: 'Distributed Systems' | 'Backend Engineering' | 'Security' | 'Observability' | 'AI/ML';
  status: 'ACTIVE' | 'ARCHIVED' | 'EXPERIMENTAL';
  technologies: string[];
  github: string;
  demo?: string;
  metrics?: {
    latency?: string;
    uptime?: string;
    nodes?: number;
    replication?: string;
  };
  color: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
}

export const projects: Project[] = [
  {
    id: 'cyclon-gossip',
    name: 'Cyclon Gossip Protocol',
    title: 'Distributed Consensus Engine',
    description: 'Cyclon-enhanced gossip protocol implementation for distributed peer-to-peer communication. Enables probabilistic epidemic dissemination with efficient convergence.',
    category: 'Distributed Systems',
    status: 'ACTIVE',
    technologies: ['C', 'Network Programming', 'Consensus Algorithms'],
    github: 'https://github.com/Sakshee21/Cyclon-Gossip-Protocol-in-C',
    metrics: {
      latency: '< 50ms',
      nodes: 128,
      replication: 'ENABLED',
    },
    color: 'cyan',
  },
  {
    id: 'safe-haven',
    name: 'SafeHavenWS',
    title: 'Identity-Aware API Gateway',
    description: 'Zero-trust network architecture with identity verification. Enforces mTLS, JWT validation, RBAC policies, and continuous device attestation.',
    category: 'Security',
    status: 'ACTIVE',
    technologies: ['Rust', 'Zero-Trust', 'mTLS', 'OAuth2'],
    github: 'https://github.com/Sakshee21/SafeHavenWS',
    metrics: {
      latency: '< 10ms',
      uptime: '99.97%',
    },
    color: 'blue',
  },
  {
    id: 'medical-chatbot',
    name: 'Medical Chatbot',
    title: 'Symptom Analysis AI Service',
    description: 'Intelligent medical diagnostic assistant using Watson AI and LLMs. Provides evidence-based symptom analysis and health recommendations.',
    category: 'AI/ML',
    status: 'ACTIVE',
    technologies: ['Python', 'Watson Assistant', 'watsonx.ai', 'NLP'],
    github: 'https://github.com/Sakshee21/Medical-Chatbot-for-Symptom-Analysis-using-watsonx-assistant-and-watsonx.ai',
    color: 'purple',
  },
  {
    id: 'neurodecept',
    name: 'NeuroDecept',
    title: 'Adaptive Cyber Deception System',
    description: 'Threat detection and deception framework that adapts to attacker behavior. Uses threat modeling and adaptive honeypots.',
    category: 'Security',
    status: 'ACTIVE',
    technologies: ['Python', 'Machine Learning', 'Threat Detection'],
    github: 'https://github.com/Sakshee21/NeuroDecept-Adaptive-Cyber-Deception',
    metrics: {
      latency: '< 20ms',
    },
    color: 'orange',
  },
  {
    id: 'driftxplain-ids',
    name: 'DriftXplain IDS',
    title: 'Observability & Anomaly Detection',
    description: 'Intrusion detection system with explainable AI. Detects network anomalies and provides interpretable threat analysis.',
    category: 'Observability',
    status: 'ACTIVE',
    technologies: ['Go', 'Network Analysis', 'XAI', 'Real-time Detection'],
    github: 'https://github.com/Sakshee21/DriftXplain-IDS',
    metrics: {
      uptime: '99.9%',
    },
    color: 'cyan',
  },
  {
    id: 'passwordless-auth',
    name: 'PasswordlessAuth',
    title: 'FIDO2/WebAuthn Implementation',
    description: 'Secure passwordless authentication using WebAuthn and passkeys. Implements FIDO2 ceremony visualization and trust protocols.',
    category: 'Security',
    status: 'ACTIVE',
    technologies: ['TypeScript', 'WebAuthn', 'FIDO2', 'Passkeys', 'DID'],
    github: 'https://github.com/Sakshee21/PasswordlessAuth',
    metrics: {
      latency: '< 5ms',
    },
    color: 'blue',
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener System',
    title: 'Distributed Data Service',
    description: 'High-throughput URL shortening service with distributed caching, rate limiting, and analytics pipeline.',
    category: 'Backend Engineering',
    status: 'ACTIVE',
    technologies: ['Go', 'Rust', 'Redis', 'PostgreSQL', 'Kafka'],
    github: 'https://github.com/Sakshee21/URL-Shortener-System',
    metrics: {
      latency: '< 8ms',
      uptime: '99.99%',
    },
    color: 'purple',
  },
];

// Topology relationships (which projects relate to each other)
export const topologyEdges = [
  { source: 'cyclon-gossip', target: 'driftxplain-ids', label: 'Gossip Propagation' },
  { source: 'safe-haven', target: 'passwordless-auth', label: 'Identity Layer' },
  { source: 'url-shortener', target: 'driftxplain-ids', label: 'System Monitoring' },
  { source: 'medical-chatbot', target: 'url-shortener', label: 'Service Integration' },
  { source: 'cyclon-gossip', target: 'neurodecept', label: 'Threat Detection' },
];

// Categories for filtering
export const categories = ['Distributed Systems', 'Backend Engineering', 'Security', 'Observability', 'AI/ML'] as const;
