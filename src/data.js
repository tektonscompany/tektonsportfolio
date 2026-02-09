export const projects = [
  {
    id: 'campuzon',
    name: 'CAMPUZON',
    category: 'commerce',
    categoryLabel: 'E-Commerce',
    tagline: 'The Trust Protocol for Student Commerce',
    description: 'A peer-to-peer student marketplace engineered for high-stakes campus transactions. We have productized trust -- the number one barrier to GMV in African informal commerce.',
    featureLabel: 'Key Innovation',
    featureText: 'Sale & Purchase Insurance -- an escrow-native fraud-protection protocol built on accounting principles. Funds held in secure vaults with algorithmic seller scoring and auto-triggered insurance payouts.',
    tags: ['Marketplace', 'Escrow', 'Trust Protocol'],
    stage: 'Implementation',
    progress: 65,
    status: 'active'
  },
  {
    id: 'rebot',
    name: 'REBOT',
    category: 'travel',
    categoryLabel: 'Travel & Health',
    tagline: 'Your AI Chief of Staff for Movement',
    description: 'Autonomous AI agent for travel planning and real-time health consultation. Dynamic itinerary optimization with destination health risk assessment and telemedicine escalation.',
    featureLabel: 'Data Integration',
    featureText: 'Inherits trust scores from Campuzon to build verified travel networks. Real-time health risk mapping for every destination.',
    tags: ['AI Agent', 'Travel', 'Health'],
    stage: 'Design',
    progress: 40,
    status: 'design'
  },
  {
    id: 'mybella',
    name: 'myBELLA',
    category: 'ai',
    categoryLabel: 'Wellness AI',
    tagline: 'The Companion That Knows You',
    description: 'Emotionally intelligent AI companion with mental wellness coaching. Features persistent memory, adaptive personality, and crisis detection protocols for proactive mental health support.',
    featureLabel: 'Core Technology',
    featureText: 'Advanced emotional cognition engine with contextual memory. Learns interaction patterns to provide increasingly personalized wellness guidance.',
    tags: ['AI Companion', 'Wellness', 'Mental Health'],
    stage: 'Planning',
    progress: 20,
    status: 'planning'
  },
  {
    id: 'athena',
    name: 'ATHENA',
    category: 'edtech',
    categoryLabel: 'Education Technology',
    tagline: 'Personalized Learning Engine',
    description: 'AI-powered adaptive curriculum that maps individual cognitive patterns to optimize learning outcomes. A data collection engine for understanding how people learn best.',
    featureLabel: 'Business Model',
    featureText: 'B2B2C model targeting institutions and individual learners. Cognitive pattern data feeds back into the intelligence core for cross-venture optimization.',
    tags: ['Adaptive Learning', 'AI Curriculum', 'B2B2C'],
    stage: 'Planning',
    progress: 15,
    status: 'planning'
  },
  {
    id: 'gaia',
    name: 'GAIA',
    category: 'agritech',
    categoryLabel: 'Agriculture Technology',
    tagline: 'Intelligence for the Harvest',
    description: 'Precision agriculture AI combining satellite imagery and IoT sensor fusion. Local language voice interfaces designed for accessibility across West Africa where agriculture represents 25% of GDP.',
    featureLabel: 'Market Opportunity',
    featureText: 'Serving the agricultural backbone of West African economies. Satellite data combined with ground-level IoT creates unprecedented yield optimization for smallholder farmers.',
    tags: ['Precision Ag', 'IoT', 'Satellite'],
    stage: 'Planning',
    progress: 10,
    status: 'planning'
  }
]

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'commerce', label: 'Commerce' },
  { key: 'ai', label: 'AI' },
  { key: 'travel', label: 'Travel' },
  { key: 'edtech', label: 'EdTech' },
  { key: 'agritech', label: 'AgriTech' }
]

export const capabilities = [
  {
    id: 'backend',
    title: 'Backend Architecture',
    name: 'Backend Architecture',
    stack: 'Go / Python / Express',
    description: 'High-concurrency microservices in Go. Python for rapid API development and ML pipelines. Express.js for Node-based backends. Sub-10ms response times at scale.',
    detail: 'High-concurrency microservices in Go. Python for rapid API development and ML pipelines. Express.js for Node-based backends. Sub-10ms response times at scale.',
    items: ['Go', 'Python', 'Express', 'Microservices', 'REST APIs'],
    icon: 'Server'
  },
  {
    id: 'ai',
    title: 'AI & ML Orchestration',
    name: 'AI & ML Orchestration',
    stack: 'Python / TensorFlow / LLMs',
    description: 'Model training, data pipelines, and LLM integration. Emotional cognition for myBella. Adaptive learning algorithms for Athena. Precision agriculture models for Gaia.',
    detail: 'Model training, data pipelines, and LLM integration. Emotional cognition for myBella. Adaptive learning algorithms for Athena. Precision agriculture models for Gaia.',
    items: ['TensorFlow', 'LLMs', 'NLP', 'Computer Vision', 'Data Pipelines'],
    icon: 'Brain'
  },
  {
    id: 'frontend',
    title: 'Product Interface',
    name: 'Product Interface',
    stack: 'React / Next.js',
    description: 'All consumer-facing frontends built mobile-first and PWA-ready. Campuzon marketplace UI, Rebot travel dashboard, and cross-platform design systems.',
    detail: 'All consumer-facing frontends built mobile-first and PWA-ready. Campuzon marketplace UI, Rebot travel dashboard, and cross-platform design systems.',
    items: ['React', 'Next.js', 'PWA', 'Design Systems', 'Mobile-first'],
    icon: 'Layout'
  },
  {
    id: 'finance',
    title: 'Financial Modeling',
    name: 'Financial Modeling',
    stack: 'Excel / Pandas / Custom Tools',
    description: 'Unit economics simulators, runway projections, and M&A scenarios. Every venture is stress-tested financially before a single line of code is written.',
    detail: 'Unit economics simulators, runway projections, and M&A scenarios. Every venture is stress-tested financially before a single line of code is written.',
    items: ['Unit Economics', 'Pandas', 'Financial Projections', 'M&A'],
    icon: 'TrendingUp'
  },
  {
    id: 'risk',
    title: 'Risk & Fraud Systems',
    name: 'Risk & Fraud Systems',
    stack: 'Fraud Analytics / Escrow Logic',
    description: 'Sale & Purchase Insurance protocol. GAAP-compliant escrow logic. Statistical anomaly detection and algorithmic trust scoring.',
    detail: 'Sale & Purchase Insurance protocol. GAAP-compliant escrow logic. Statistical anomaly detection and algorithmic trust scoring.',
    items: ['Escrow', 'Fraud Detection', 'Trust Scoring', 'GAAP'],
    icon: 'ShieldCheck'
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    name: 'Infrastructure',
    stack: 'Docker / K8s / GCP',
    description: 'Multi-region deployment with auto-scaling. PostgreSQL, Redis, and BigQuery for data infrastructure. 99.9% uptime SLA targets across all ventures.',
    detail: 'Multi-region deployment with auto-scaling. PostgreSQL, Redis, and BigQuery for data infrastructure. 99.9% uptime SLA targets across all ventures.',
    items: ['Docker', 'Kubernetes', 'GCP', 'PostgreSQL', 'Redis'],
    icon: 'Cloud'
  }
]
