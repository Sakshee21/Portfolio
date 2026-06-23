export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Distributed Systems' | 'Backend Engineering' | 'Security' | 'Observability' | 'AI/ML' | 'Blockchain';
  status: 'ACTIVE' | 'ARCHIVED' | 'EXPERIMENTAL';
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
  imageHint: string;
  metrics?: {
    latency?: string;
    uptime?: string;
    nodes?: number;
    replication?: string;
    dataset?: string;
    accuracy?: string;
  };
  color: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
}

export const projects: Project[] = [
  {
    id: 'cyclon-gossip',
    name: 'Cyclon Gossip Protocol',
    title: 'Structured P2P Overlay Engine',
    description:
      'Implements the Cyclon peer-sampling protocol in C over raw UDP sockets. Each node maintains a partial peer view using age-based cycling and Fisher-Yates random sampling. Bloom filters reduce redundant forwarding across 128-node simulations with provable epidemic convergence.',
    longDescription:
      'Built for Computer Networks at VIT Chennai. Core uses select() I/O multiplexing for concurrent network and user input without blocking. CYCLON_PUSH / CYCLON_REPLY messages implement the push-pull peer exchange. A FIFO message cache with is_duplicate_message() detection prevents redundant forwarding. FORWARD_COUNT parameter controls epidemic spread factor.',
    category: 'Distributed Systems',
    status: 'ACTIVE',
    technologies: ['C', 'UDP Sockets', 'Gossip Protocol', 'Bloom Filters', 'select() I/O', 'P2P Networking'],
    github: 'https://github.com/Sakshee21/Cyclon-Gossip-Protocol-in-C',
    image: '/projects/cyclon-gossip.png',
    imageHint:
      'network topology diagram with nodes in mesh formation, directed gossip edges, and animated packet flow arrows between peers',
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
    title: 'Blockchain Women Safety App',
    description:
      'Decentralized SOS alert system where emergency incidents are permanently logged on-chain with GPS coordinates via Solidity smart contracts. Role-based contracts differentiate victims and volunteers. Records are immutable — no central authority can alter or erase them once written.',
    longDescription:
      'Four smart contracts: RoleManagerContract (RBAC for user and volunteer roles), CaseContract (SOS creation with lat/lng + timestamp), CaseRegistry (victim-to-case mapping for audit queries), VolunteerContract. Flutter mobile app triggers SOS; Node.js/Express backend receives location data and calls createCase() via Web3.js ABI calls. Deployed with Hardhat. Firebase handles authentication only — all case data lives on-chain.',
    category: 'Blockchain',
    status: 'ACTIVE',
    technologies: ['Solidity', 'Hardhat', 'Flutter', 'Node.js', 'Web3.js', 'Firebase Auth', 'Smart Contracts'],
    github: 'https://github.com/Sakshee21/SafeHavenWS',
    image: '/projects/safehavenws.png',
    imageHint:
      'Flutter mobile SOS screen, or data flow diagram: app → Node.js backend → createCase() smart contract → immutable blockchain ledger',
    metrics: {
      latency: '< 2s',
      uptime: '99.9%',
    },
    color: 'orange',
  },
  {
    id: 'securebank',
    name: 'SecureBank',
    title: 'Device-Bound Cryptographic Auth Framework',
    description:
      'RSA-2048 keypairs generated in-browser and bound to device fingerprints via PBKDF2 (310,000 HMAC-SHA256 iterations). Private keys are encrypted with AES-256-GCM and never leave the device. A 6-dimension behavioral risk engine scores every transaction and responds with ALLOW, STEP_UP, or DENY. Audit events chain SHA-256 hashes blockchain-style for tamper detection.',
    longDescription:
      'Authentication uses RSA-PSS-SHA256 challenge-response: server issues a nonce, client signs with its device-bound keypair — same zero-trust pattern as WebAuthn/FIDO2 but implemented from scratch using the WebCrypto API. The risk scoring engine evaluates 6 signal dimensions (location, device, behavior, timing, context, history) post-auth. A /verify-logs endpoint performs a linear chain scan to detect any tampering in the audit log. Operation context hashing prevents parameter-substitution attacks on financial transactions.',
    category: 'Security',
    status: 'ACTIVE',
    technologies: ['RSA-2048', 'AES-256-GCM', 'PBKDF2', 'WebCrypto API', 'HMAC-SHA256', 'Node.js', 'Risk Scoring', 'Zero-Trust', 'Challenge-Response'],
    github: 'https://github.com/Sakshee21/SecureBank',
    demo: 'https://contextdriftlock.onrender.com',
    image: '/projects/securebank.png',
    imageHint:
      'auth flow diagram: browser RSA keygen → device fingerprint → PBKDF2 → AES encrypt → challenge → RSA-PSS sign → 6D risk score → ALLOW/STEP_UP/DENY decision',
    metrics: {
      latency: '< 5ms',
    },
    color: 'blue',
  },
  {
    id: 'driftxplain-ids',
    name: 'DriftXplain IDS',
    title: 'Explainable Intrusion Detection System',
    description:
      'ML-based IDS trained on 2.83M network flow records (CIC-IDS-2017). Detects DoS, DDoS, brute force, port scanning, botnets, and web exploits. Concept drift monitoring tracks model degradation across Mon–Fri temporal splits. SHAP explainability reveals which features drive each alert decision.',
    longDescription:
      'Binary class imbalance 4.1:1 (BENIGN:ATTACK); within-attack imbalance up to 200,000:1 for Heartbleed. Correlation-based feature selection reduces 79 features to 20. Day-tags on each record enable temporal drift analysis across the week. Model pipeline: EDA → feature engineering → XGBoost/Random Forest training → drift detection → SHAP layer. Traditional signature-based IDS cannot detect the evolving attack patterns this system catches.',
    category: 'Observability',
    status: 'ACTIVE',
    technologies: ['Python', 'XGBoost', 'Random Forest', 'SHAP', 'scikit-learn', 'pandas', 'Concept Drift'],
    github: 'https://github.com/Sakshee21/DriftXplain-IDS',
    image: '/projects/driftxplain-ids.png',
    imageHint:
      'SHAP summary plot or feature importance bar chart from Colab output, or temporal drift curve showing model accuracy degradation across Mon–Fri',
    metrics: {
      dataset: '2.83M records',
      accuracy: '99.1%',
    },
    color: 'cyan',
  },
  {
    id: 'medical-chatbot',
    name: 'MediCure',
    title: 'AI Medical Consultation Assistant',
    description:
      'Symptom-driven triage chatbot powered by IBM Watsonx and the Granite-13B foundation model. Few-shot prompting maps symptom inputs — age, gender, blood pressure, cholesterol — to likely conditions and specialist departments. Routes to General Practitioner when diagnostic confidence is low.',
    longDescription:
      'Model selected via Prompt Lab experimentation across multiple Watsonx foundation models — granite-13b-instruct-v2 chosen for accuracy and prompt responsiveness. Symptom questions designed from Kaggle medical datasets mapping symptoms to diseases. Integration built with watsonx-openapi.json and secure API key auth. Conversational flow designed in Watsonx Assistant; responses returned in natural language within the chat interface.',
    category: 'AI/ML',
    status: 'ACTIVE',
    technologies: ['IBM Watsonx', 'Granite-13B', 'Watsonx Assistant', 'Few-Shot Prompting', 'Python', 'REST API'],
    github: 'https://github.com/Sakshee21/Medical-Chatbot-for-Symptom-Analysis-using-watsonx-assistant-and-watsonx.ai',
    demo: 'https://sakshee21.github.io/Medical-Chatbot-for-Symptom-Analysis-using-watsonx-assistant-and-watsonx.ai/',
    image: '/projects/medicure.png',
    imageHint:
      'chatbot conversation UI screenshot showing symptom input and department recommendation response, or flow: user input → Watsonx Assistant → Granite-13B → diagnosis → department',
    metrics: {
      latency: '< 800ms',
    },
    color: 'purple',
  },
  {
    id: 'url-shortener',
    name: 'LinkSprint',
    title: 'Secure URL Management Service',
    description:
      'Full-stack URL shortener with role-based access control (admin and user), safe redirection via warning/preview checks before forwarding to unknown destinations, click-level analytics with CSV export, and rate limiting. React frontend with FastAPI backend deployed via GitHub Actions to Render.',
    longDescription:
      'Layered monolithic architecture: React + Vite frontend with protected route guards and role-aware navigation, FastAPI backend with service-class separation of concerns, SQLite persistence, GitHub Actions CI/CD pipeline to Render. Admin dashboard shows platform-wide link and user activity. JWT token-based session handling. Analytics endpoint supports CSV export for reporting. Preview/warning flow protects end-users from unsafe destinations.',
    category: 'Backend Engineering',
    status: 'ACTIVE',
    technologies: ['React', 'Vite', 'FastAPI', 'Python', 'SQLite', 'GitHub Actions', 'JWT Auth', 'Render'],
    github: 'https://github.com/Sakshee21/URL-Shortener-System',
    demo: 'https://linksprint-landing.onrender.com',
    image: '/projects/linksprint.png',
    imageHint:
      'analytics dashboard screenshot showing link stats and click graphs, or system architecture diagram of the layered client-server design',
    metrics: {
      latency: '< 8ms',
      uptime: '99.99%',
    },
    color: 'purple',
  },
];

// Topology relationships (which projects relate to each other)
export const topologyEdges = [
  { source: 'cyclon-gossip', target: 'driftxplain-ids', label: 'Epidemic Propagation' },
  { source: 'securebank', target: 'safe-haven', label: 'On-chain Audit Pattern' },
  { source: 'driftxplain-ids', target: 'securebank', label: 'Behavioral Risk Signals' },
  { source: 'url-shortener', target: 'driftxplain-ids', label: 'Traffic Monitoring' },
  { source: 'medical-chatbot', target: 'url-shortener', label: 'Service Integration' },
  { source: 'cyclon-gossip', target: 'safe-haven', label: 'State Dissemination' },
];

// Categories for filtering
export const categories = [
  'Distributed Systems',
  'Backend Engineering',
  'Security',
  'Observability',
  'AI/ML',
  'Blockchain',
] as const;
