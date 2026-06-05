import 'dotenv/config';
import mongoose from 'mongoose';
import { Project } from './models/Project.js';

const MONGODB_URI = process.env.MONGODB_URI ?? '';
if (!MONGODB_URI) {
  console.error('[Seed] MONGODB_URI is not set. Create server/.env first.');
  process.exit(1);
}

const seedData = [
  {
    title: 'Roorq — Curated Vintage Marketplace',
    slug: 'roorq-marketplace',
    tagline: 'Full-stack marketplace platform built from scratch as Founding Engineer',
    description:
      'Building a curated vintage/fashion-discovery marketplace incubated at IIT Roorkee\'s TIDES Business Incubator. Owning the product end-to-end — catalog, user flows, search/discovery, and backend services — heading into MVP launch.',
    tech: ['TypeScript', 'React', 'Node.js', 'REST APIs'],
    category: 'FullStack' as const,
    githubUrl: 'https://github.com/helloroorq/ROORQ',
    liveUrl: undefined,
    featured: true,
    hasCaseStudy: false,
    displayOrder: 1,
  },
  {
    title: 'Voyager — Travel Planning App',
    slug: 'voyager-travel-app',
    tagline: 'Collaborative travel planner with real-time sync, AI itineraries, and interactive mapping',
    description:
      'Full-stack collaborative travel-planning app with real-time data sync, expense tracking, AI-assisted itinerary generation, and interactive mapping.',
    tech: ['Flutter', 'Django', 'Firebase', 'Mapbox'],
    category: 'FullStack' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    hasCaseStudy: false,
    displayOrder: 2,
  },
  {
    title: 'Transformer-Enhanced Mobile-Edge Offloading',
    slug: 'transformer-edge-offloading',
    tagline: '~32% lower energy consumption over CNN baselines via Transformer + deep-RL',
    description:
      'Transformer-enhanced, Lyapunov-guided deep reinforcement learning model for dynamic mobile-edge offloading under varying user loads. Achieved ~32% lower energy consumption and ~30% improved queue stability compared to CNN baselines, with a full training, testing, and evaluation pipeline.',
    tech: ['Python', 'TensorFlow', 'NumPy', 'SciPy'],
    category: 'AI' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    hasCaseStudy: true,
    caseStudyProblem:
      'Mobile-edge computing suffers from high energy costs and unstable task queues under fluctuating user loads. Existing CNN-based approaches lack the temporal modelling depth needed for dynamic environments.',
    caseStudyApproach:
      'Combined a Transformer encoder for sequence-aware state representation with a Lyapunov-guided DRL agent that balances energy consumption against queue stability — making offloading decisions that are both energy-efficient and robust to load spikes.',
    caseStudyArchitecture:
      'Python simulation environment with configurable user-load profiles. Transformer encoder produces contextual embeddings fed into a DQN-style RL agent. Lyapunov drift-plus-penalty objective drives the reward shaping.',
    caseStudyOutcome:
      '~32% reduction in energy consumption and ~30% improvement in queue stability over CNN baseline models across all tested load scenarios.',
    displayOrder: 3,
  },
  {
    title: 'BitTorrent P2P File Transfer System',
    slug: 'bittorrent-p2p',
    tagline: 'Decentralized chunk-based file sharing implementing the BitTorrent protocol in C++',
    description:
      'Decentralized file-sharing system implementing the BitTorrent protocol — peer communication and chunk-based transfer over TCP, UDP, and HTTP, designed for scalability and fault tolerance.',
    tech: ['C++', 'TCP/IP', 'UDP', 'HTTP'],
    category: 'Systems' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    hasCaseStudy: false,
    displayOrder: 4,
  },
  {
    title: 'Compare Cart IQ — Price-Comparison Assistant',
    slug: 'compare-cart-iq',
    tagline: 'Smart shopping assistant comparing prices across Amazon, Flipkart, and Shopify',
    description:
      'Intelligent shopping assistant with a Python backend integrating Amazon, Flipkart, and Shopify APIs. Features advanced search, color-based filtering, and real-time price comparison built on a scalable backend.',
    tech: ['Python', 'REST APIs'],
    category: 'Backend' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    hasCaseStudy: false,
    displayOrder: 5,
  },
  {
    title: 'RISC-V Assembler with Cache Simulation',
    slug: 'riscv-assembler',
    tagline: 'RISC-V assembler, 5-stage pipelined processor, and LRU cache simulator in C++',
    description:
      'A RISC-V assembler and 5-stage pipelined processor implemented in C++, plus a cache simulator using LRU replacement — hands-on low-level system design and performance analysis.',
    tech: ['C++', 'Computer Architecture'],
    category: 'Systems' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    hasCaseStudy: false,
    displayOrder: 6,
  },
  {
    title: 'SIC/XE Assembler with Control Sections',
    slug: 'sicxe-assembler',
    tagline: 'Two-pass SIC/XE assembler supporting control sections and program blocks',
    description:
      'Two-pass SIC/XE assembler supporting control sections and program blocks. Generates object programs and listing files with comprehensive error handling, emphasizing modular design.',
    tech: ['C++', 'STL'],
    category: 'Systems' as const,
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    hasCaseStudy: false,
    displayOrder: 7,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('[Seed] Connected to MongoDB');

  await Project.deleteMany({});
  console.log('[Seed] Cleared existing projects');

  await Project.insertMany(seedData);
  console.log(`[Seed] Inserted ${seedData.length} projects`);

  await mongoose.disconnect();
  console.log('[Seed] Done');
}

seed().catch((err) => {
  console.error('[Seed] Error:', err);
  process.exit(1);
});
