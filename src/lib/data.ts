import {
  Code2,
  ShoppingCart,
  Bot,
  BarChart3,
  Search,
  ShoppingBag,
  Receipt,
  Globe,
  Cloud,
  Lightbulb,
  LifeBuoy,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  short: string;
  description: string;
  features: string[];
  technologies: string[];
  badge?: 'NEW' | 'POPULAR';
  color: string;
};

export const services: Service[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: Code2,
    short: 'Blazing-fast, conversion-optimized websites built with modern frameworks.',
    description:
      'We design and develop high-performance websites that load instantly, rank well, and convert visitors into customers. From landing pages to complex web apps, every pixel is crafted for impact.',
    features: [
      'Custom UI/UX design system',
      'Core Web Vitals optimization',
      'SEO-ready architecture',
      'Headless CMS integration',
    ],
    technologies: ['React', 'Next.js', 'Tailwind', 'Vite', 'Supabase'],
    badge: 'POPULAR',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    icon: ShoppingCart,
    short: 'Full-stack online stores with seamless checkout and inventory.',
    description:
      'Launch profitable e-commerce experiences with custom storefronts, secure payments, inventory sync, and analytics dashboards that help you scale.',
    features: [
      'Custom storefront design',
      'Stripe & PayPal integration',
      'Inventory & order management',
      'Conversion analytics',
    ],
    technologies: ['Shopify', 'Stripe', 'React', 'Supabase'],
    badge: 'POPULAR',
    color: 'from-brand-500 to-emerald-500',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    icon: Bot,
    short: 'Automate repetitive workflows with custom AI agents.',
    description:
      'Put your business on autopilot. We build AI-powered automation systems that handle lead qualification, customer support, data entry, and more — 24/7, without human intervention.',
    features: [
      'Custom AI agents & chatbots',
      'Workflow automation pipelines',
      'Document processing & OCR',
      'CRM & email integration',
    ],
    technologies: ['OpenAI', 'LangChain', 'Python', 'Supabase'],
    badge: 'NEW',
    color: 'from-purple-500 to-pink-500',
  },
  {
    slug: 'data-analytics-bi',
    title: 'Data Analytics & BI',
    icon: BarChart3,
    short: 'Turn raw data into actionable dashboards and insights.',
    description:
      'We build end-to-end analytics pipelines and interactive dashboards that give you real-time visibility into your business — from sales trends to customer behavior.',
    features: [
      'Custom BI dashboards',
      'ETL & data pipelines',
      'Predictive analytics',
      'Automated reporting',
    ],
    technologies: ['Python', 'Tableau', 'Power BI', 'SQL'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    slug: 'seo-digital-marketing',
    title: 'SEO & Digital Marketing',
    icon: Search,
    short: 'Rank higher, attract more traffic, and convert leads.',
    description:
      'Data-driven SEO and digital marketing strategies that grow your organic traffic, improve search rankings, and drive qualified leads to your business.',
    features: [
      'Technical SEO audits',
      'Content strategy & creation',
      'PPC campaign management',
      'Performance tracking',
    ],
    technologies: ['Google Ads', 'Ahrefs', 'GA4', 'Search Console'],
    color: 'from-rose-500 to-red-500',
  },
  {
    slug: 'amazon-marketplace',
    title: 'Amazon Marketplace',
    icon: ShoppingBag,
    short: 'Scale your Amazon sales with listing optimization and ads.',
    description:
      'Maximize your Amazon presence with optimized listings, sponsored ads management, review automation, and competitor analysis that drives sales growth.',
    features: [
      'Listing optimization & A+ content',
      'PPC campaign management',
      'Review automation',
      'Competitor analysis',
    ],
    technologies: ['Amazon Ads', 'Helium 10', 'Jungle Scout'],
    color: 'from-amber-500 to-yellow-500',
  },
  {
    slug: 'amazon-chargeback-analytics',
    title: 'Amazon Chargeback Analytics',
    icon: Receipt,
    short: 'Recover lost revenue from Amazon chargebacks and shortages.',
    description:
      'Automatically track, dispute, and recover Amazon chargebacks and shortage claims. Our analytics platform identifies patterns and helps you prevent future deductions.',
    features: [
      'Automated chargeback tracking',
      'Dispute filing automation',
      'Shortage claim recovery',
      'Root-cause analytics',
    ],
    technologies: ['Python', 'React', 'Supabase', 'Amazon SP-API'],
    badge: 'NEW',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    slug: 'web-scraping',
    title: 'Web Scraping',
    icon: Globe,
    short: 'Extract structured data from any source at scale.',
    description:
      'Custom web scraping solutions that collect, clean, and deliver structured data from any website — for competitive intelligence, lead generation, or market research.',
    features: [
      'Custom scraper development',
      'Anti-bot bypass techniques',
      'Data cleaning & enrichment',
      'Scheduled data delivery',
    ],
    technologies: ['Python', 'Scrapy', 'Playwright', 'BeautifulSoup'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    slug: 'cloud-api-integrations',
    title: 'Cloud & API Integrations',
    icon: Cloud,
    short: 'Connect your tools and systems with robust API integrations.',
    description:
      'We design and build reliable API integrations that connect your CRM, ERP, payment gateways, and third-party services into one seamless ecosystem.',
    features: [
      'REST & GraphQL API design',
      'Third-party API integration',
      'Cloud infrastructure setup',
      'Webhook & event systems',
    ],
    technologies: ['AWS', 'Docker', 'Node.js', 'Supabase'],
    color: 'from-sky-500 to-blue-500',
  },
  {
    slug: 'strategic-business-consulting',
    title: 'Strategic Business Consulting',
    icon: Lightbulb,
    short: 'Get expert guidance on technology and growth strategy.',
    description:
      'We help you make the right technology investments, optimize operations, and build a roadmap for sustainable growth backed by data and industry expertise.',
    features: [
      'Technology roadmap planning',
      'Process optimization',
      'Market & competitor analysis',
      'Growth strategy sessions',
    ],
    technologies: ['Notion', 'Miro', 'Figma'],
    color: 'from-violet-500 to-purple-500',
  },
  {
    slug: 'support-maintenance',
    title: 'Support & Maintenance',
    icon: LifeBuoy,
    short: 'Ongoing support, updates, and monitoring for your systems.',
    description:
      'Keep your software running smoothly with proactive monitoring, security updates, performance optimization, and dedicated support when you need it.',
    features: [
      '24/7 monitoring & alerts',
      'Security patching',
      'Performance optimization',
      'Priority support channel',
    ],
    technologies: ['Sentry', 'Datadog', 'GitHub Actions'],
    color: 'from-emerald-500 to-brand-500',
  },
  {
    slug: 'preemption-algo-software',
    title: 'Preemption Algo Software',
    icon: TrendingUp,
    short: 'Proprietary algorithmic trading and analytics platform.',
    description:
      'Our flagship software product — a real-time algorithmic trading and analytics platform with predictive modeling, backtesting, and automated execution capabilities.',
    features: [
      'Real-time market analytics',
      'Predictive modeling engine',
      'Backtesting framework',
      'Automated execution rules',
    ],
    technologies: ['Python', 'React', 'WebSocket', 'Supabase'],
    badge: 'NEW',
    color: 'from-brand-500 to-brand-600',
  },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    category: 'Data Analytics',
    description:
      'A real-time financial analytics platform for a fintech startup, processing millions of transactions daily with interactive visualizations.',
    image:
      'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'D3.js', 'Python', 'AWS'],
    metrics: [
      { label: 'Transactions/day', value: '2M+' },
      { label: 'Query speed', value: '<50ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
  },
  {
    slug: 'ecommerce-platform',
    title: 'D2C E-commerce Platform',
    category: 'E-commerce',
    description:
      'A full-stack e-commerce solution for a direct-to-consumer brand with custom checkout, subscription billing, and inventory automation.',
    image:
      'https://images.pexels.com/photos/4464820/pexels-photo-4464820.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Next.js', 'Stripe', 'Supabase', 'Tailwind'],
    metrics: [
      { label: 'Conversion rate', value: '+340%' },
      { label: 'Revenue', value: '$2.4M' },
      { label: 'Page speed', value: '0.8s' },
    ],
  },
  {
    slug: 'ai-customer-support',
    title: 'AI Customer Support Agent',
    category: 'AI Automation',
    description:
      'An AI-powered support system that handles 80% of customer queries automatically, escalating complex issues to human agents.',
    image:
      'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['OpenAI', 'LangChain', 'Python', 'React'],
    metrics: [
      { label: 'Auto-resolution', value: '80%' },
      { label: 'Response time', value: '<2s' },
      { label: 'CSAT score', value: '4.7/5' },
    ],
  },
  {
    slug: 'amazon-chargeback-tool',
    title: 'Amazon Chargeback Recovery Tool',
    category: 'Amazon',
    description:
      'An automated platform that tracks, disputes, and recovers Amazon chargebacks — recovering over $1.2M for clients in year one.',
    image:
      'https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Python', 'Amazon SP-API', 'React', 'Supabase'],
    metrics: [
      { label: 'Recovered', value: '$1.2M+' },
      { label: 'Win rate', value: '73%' },
      { label: 'Time saved', value: '500 hrs' },
    ],
  },
  {
    slug: 'saas-landing-page',
    title: 'SaaS Marketing Website',
    category: 'Web Development',
    description:
      'A high-converting marketing website for a B2B SaaS company with animated hero, interactive demos, and SEO-optimized content.',
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    metrics: [
      { label: 'Bounce rate', value: '-45%' },
      { label: 'Signups', value: '+220%' },
      { label: 'Lighthouse', value: '100' },
    ],
  },
  {
    slug: 'web-scraping-pipeline',
    title: 'Competitive Intelligence Pipeline',
    category: 'Web Scraping',
    description:
      'A large-scale web scraping pipeline that monitors competitor pricing across 500+ retailers in real-time.',
    image:
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Python', 'Scrapy', 'PostgreSQL', 'Redis'],
    metrics: [
      { label: 'Sources', value: '500+' },
      { label: 'Data points/day', value: '10M+' },
      { label: 'Accuracy', value: '99.5%' },
    ],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  image: string;
  services: string[];
  duration: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'fintech-scaling',
    client: 'FinTech Startup',
    industry: 'Finance',
    title: 'Scaling a fintech platform to 2M daily transactions',
    summary:
      'We rebuilt the analytics infrastructure from the ground up, enabling real-time processing of millions of transactions with sub-50ms query performance.',
    challenge:
      'The client\'s existing analytics system couldn\'t handle their rapid growth. Queries took minutes to run, dashboards were slow, and the team had no real-time visibility into transaction data.',
    solution:
      'We designed a new data pipeline using Python for ETL, a columnar database for fast aggregations, and a React dashboard with D3.js visualizations. The system processes 2M+ transactions daily with sub-50ms query times.',
    results: [
      { label: 'Query speed', value: '120x faster' },
      { label: 'Transactions', value: '2M+/day' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Cost savings', value: '$200K/yr' },
    ],
    image:
      'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: ['Data Analytics & BI', 'Cloud & API Integrations'],
    duration: '4 months',
  },
  {
    slug: 'ecommerce-growth',
    client: 'D2C Fashion Brand',
    industry: 'E-commerce',
    title: 'Driving 340% conversion growth for a D2C brand',
    summary:
      'A complete e-commerce rebuild with optimized checkout, subscription billing, and data-driven product recommendations drove massive revenue growth.',
    challenge:
      'The brand\'s existing Shopify store had a 0.8% conversion rate, slow page loads, and no way to offer subscriptions or personalized recommendations.',
    solution:
      'We built a custom Next.js storefront with Stripe subscription billing, a Supabase-backed recommendation engine, and an optimized checkout flow. We also implemented a full SEO and content strategy.',
    results: [
      { label: 'Conversion rate', value: '0.8% → 3.5%' },
      { label: 'Revenue', value: '$2.4M/yr' },
      { label: 'Page speed', value: '0.8s' },
      { label: 'Repeat orders', value: '+180%' },
    ],
    image:
      'https://images.pexels.com/photos/4464820/pexels-photo-4464820.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: ['E-commerce', 'SEO & Digital Marketing', 'Website Development'],
    duration: '3 months',
  },
  {
    slug: 'ai-support-automation',
    client: 'SaaS Company',
    industry: 'Technology',
    title: 'Automating 80% of customer support with AI',
    summary:
      'We deployed an AI-powered support agent that resolves 80% of tickets automatically, cutting response times from hours to seconds.',
    challenge:
      'The client\'s support team was overwhelmed with repetitive tickets. Average response time was 4 hours, and CSAT scores were declining.',
    solution:
      'We built a custom AI agent using OpenAI and LangChain that integrates with their helpdesk. It understands context, accesses their knowledge base, and escalates complex issues to human agents with full conversation history.',
    results: [
      { label: 'Auto-resolution', value: '80%' },
      { label: 'Response time', value: '4h → 2s' },
      { label: 'CSAT score', value: '3.2 → 4.7' },
      { label: 'Support costs', value: '-60%' },
    ],
    image:
      'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: ['AI Automation', 'Cloud & API Integrations'],
    duration: '2 months',
  },
  {
    slug: 'amazon-chargeback-recovery',
    client: 'Amazon Seller',
    industry: 'E-commerce',
    title: 'Recovering $1.2M in Amazon chargebacks',
    summary:
      'Our automated chargeback analytics platform identified, tracked, and disputed chargebacks — recovering over $1.2M in the first year.',
    challenge:
      'The client was losing hundreds of thousands annually to Amazon chargebacks and shortage claims, with no systematic way to track or dispute them.',
    solution:
      'We built a custom platform that connects to Amazon SP-API, automatically tracks chargebacks, identifies valid disputes, files them with proper documentation, and provides root-cause analytics to prevent future deductions.',
    results: [
      { label: 'Recovered', value: '$1.2M+' },
      { label: 'Dispute win rate', value: '73%' },
      { label: 'Time saved', value: '500 hrs/yr' },
      { label: 'Prevention rate', value: '45%' },
    ],
    image:
      'https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    services: ['Amazon Chargeback Analytics', 'Amazon Marketplace'],
    duration: '6 months',
  },
];

export type Industry = {
  name: string;
  icon: string;
  description: string;
};

export const industries: Industry[] = [
  { name: 'Finance & FinTech', icon: '💰', description: 'Trading platforms, payment systems, and financial analytics.' },
  { name: 'E-commerce & Retail', icon: '🛍️', description: 'Online stores, marketplaces, and inventory systems.' },
  { name: 'Healthcare', icon: '🏥', description: 'HIPAA-compliant patient portals and health data platforms.' },
  { name: 'Logistics & Supply Chain', icon: '🚚', description: 'Route optimization, tracking, and warehouse management.' },
  { name: 'SaaS & Technology', icon: '💻', description: 'B2B SaaS platforms, developer tools, and API services.' },
  { name: 'Manufacturing', icon: '🏭', description: 'IoT, predictive maintenance, and production analytics.' },
  { name: 'Real Estate', icon: '🏠', description: 'Property platforms, CRM, and market intelligence.' },
  { name: 'Education', icon: '📚', description: 'E-learning platforms, LMS, and student analytics.' },
];

export type TechItem = { name: string; category: string };

export const techStack: TechItem[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Redis', category: 'Backend' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'Cloud' },
  { name: 'Vercel', category: 'Cloud' },
  { name: 'GitHub Actions', category: 'Cloud' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'LangChain', category: 'AI' },
  { name: 'TensorFlow', category: 'AI' },
  { name: 'Pandas', category: 'AI' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Amazon SP-API', category: 'Payments' },
];

export type TimelineStep = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export const timelineSteps: TimelineStep[] = [
  {
    step: 1,
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business, goals, and challenges to craft a tailored technology roadmap.',
    icon: '🔍',
  },
  {
    step: 2,
    title: 'Design & Architecture',
    description: 'We design scalable, beautiful solutions — from UI/UX to system architecture and data models.',
    icon: '✏️',
  },
  {
    step: 3,
    title: 'Development & Build',
    description: 'Our team builds your solution with clean, production-ready code and regular progress updates.',
    icon: '⚙️',
  },
  {
    step: 4,
    title: 'Testing & Launch',
    description: 'Rigorous testing, performance optimization, and a smooth launch with zero downtime.',
    icon: '🚀',
  },
  {
    step: 5,
    title: 'Growth & Support',
    description: 'Ongoing optimization, monitoring, and support to keep your business growing after launch.',
    icon: '📈',
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$299',
    period: 'project',
    description: 'Perfect for small businesses needing a professional online presence.',
    features: [
      '5-page custom website',
      'Responsive design',
      'Basic SEO setup',
      'Contact form integration',
      '30 days support',
      '1 round of revisions',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$999',
    period: 'project',
    description: 'For growing businesses that need advanced features and automation.',
    features: [
      'Custom web application',
      'Up to 15 pages',
      'Advanced SEO & analytics',
      'API integrations',
      'AI automation setup',
      '90 days support',
      '3 rounds of revisions',
      'Performance optimization',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale solutions for established businesses with complex needs.',
    features: [
      'Custom software development',
      'Unlimited pages & features',
      'Dedicated development team',
      'Advanced AI & data systems',
      'Cloud infrastructure setup',
      '12 months priority support',
      'Unlimited revisions',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

export type FAQItem = { question: string; answer: string };

export const softwareFAQs: FAQItem[] = [
  {
    question: 'What is Preemption Algo Software?',
    answer:
      'Preemption Algo Software is our proprietary algorithmic trading and analytics platform. It provides real-time market data analysis, predictive modeling, backtesting capabilities, and automated execution rules — all in one intuitive dashboard.',
  },
  {
    question: 'Do I need coding experience to use it?',
    answer:
      'No. The platform is designed for traders and analysts, not just developers. You can build, test, and deploy strategies using our visual workflow builder, though we also offer a Python SDK for advanced users.',
  },
  {
    question: 'What markets does it support?',
    answer:
      'Preemption Algo currently supports equities, futures, forex, and cryptocurrency markets. We\'re continuously adding new data sources and exchanges based on client demand.',
  },
  {
    question: 'Can I backtest my strategies?',
    answer:
      'Yes. The platform includes a comprehensive backtesting framework with historical data going back 10+ years. You can test strategies against multiple timeframes, asset classes, and market conditions.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. All data is encrypted in transit and at rest. We use Supabase with row-level security, and your trading strategies are never shared with other users. You can also self-host the platform if needed.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Pricing is customized based on your team size, data requirements, and execution needs. We offer flexible monthly and annual plans. Book a demo and we\'ll provide a tailored quote within 24 hours.',
  },
];
