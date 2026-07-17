import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  BarChart3,
  Zap,
  Download,
  Play,
  Check,
  ChevronDown,
  FileText,
  Cpu,
  ShieldCheck,
  Workflow,
  LineChart,
  Bell,
  Layers,
  Users,
  Terminal,
  Monitor,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { softwareFAQs } from '../lib/data';
import { supabase } from '../lib/supabase';
import { whatsappLink, COMPANY } from '../lib/constants';

const keyFeatures = [
  { icon: Layers, title: 'Multi-Broker Architecture', desc: 'Connect and manage multiple broker accounts from a single desktop application.' },
  { icon: Users, title: 'Multi-Account Execution', desc: 'Place orders simultaneously across multiple trading accounts with minimal latency.' },
  { icon: Workflow, title: 'Advanced Multi-Leg Orders', desc: 'Execute complex multi-leg options strategies with synchronized order routing.' },
  { icon: BarChart3, title: 'Professional Option Chain', desc: 'Real-time strike selection with live premiums and one-click order placement.' },
  { icon: Zap, title: 'All Order Types', desc: 'Market, Limit, Stop Loss (SL), and Stop Loss Market (SL-M) order support.' },
  { icon: Users, title: 'Bulk Order Placement', desc: 'Place bulk orders across multiple accounts in a single action.' },
  { icon: ShieldCheck, title: 'Bulk Order Cancellation', desc: 'Cancel all pending orders across accounts with one click.' },
  { icon: TrendingUp, title: 'One-Click Square-Off', desc: 'Instantly square-off all open positions across all connected accounts.' },
  { icon: Activity, title: 'Real-Time Monitoring', desc: 'Live order book and position monitoring with continuous updates.' },
  { icon: Cpu, title: 'Order Modification', desc: 'Modify or cancel individual orders with full control over every request.' },
  { icon: LineChart, title: 'Integrated P&L Tracking', desc: 'Real-time profit and loss tracking across all accounts and strategies.' },
  { icon: Terminal, title: 'Smart Settings', desc: 'Customizable defaults for order types, quantities, and execution preferences.' },
  { icon: Monitor, title: 'Configurable Workspace', desc: 'Hide or show panels to build your ideal trading workspace.' },
  { icon: FileText, title: 'Event Logging', desc: 'Comprehensive logging with precise latency tracking for every event.' },
  { icon: Zap, title: 'Optimized Performance', desc: 'Stable, responsive desktop application engineered for active traders.' },
  { icon: ShieldCheck, title: 'Secure by Design', desc: 'Hardware-based licensing, secure authentication, and encrypted communication.' },
];

const workflowSteps = [
  { icon: Cpu, title: 'Multi-Broker Login', desc: 'Connect to multiple broker accounts simultaneously through a secure, unified interface.' },
  { icon: Workflow, title: 'Strategy Selection', desc: 'Choose single-leg or multi-leg options strategies from the professional option chain.' },
  { icon: ShieldCheck, title: 'Risk Validation', desc: 'Smart settings validate each order against your configured defaults and risk rules.' },
  { icon: Zap, title: 'Multi-Account Execution', desc: 'Orders route simultaneously across all selected accounts with minimal latency.' },
  { icon: LineChart, title: 'Monitor & Manage', desc: 'Track real-time order status, positions, and P&L with full modification control.' },
];

const analyticsFeatures = [
  { icon: TrendingUp, title: 'Real-time P&L', desc: 'Track profit and loss across all accounts and strategies in real-time.' },
  { icon: BarChart3, title: 'Execution Analytics', desc: 'Monitor fill rates, rejection rates, and execution quality metrics.' },
  { icon: Activity, title: 'Live Order Book', desc: 'Real-time order status with broker acknowledgments and execution events.' },
  { icon: Bell, title: 'Latency Tracking', desc: 'Every order request logged with precise timestamps for performance analysis.' },
];

const screenshots = [
  { title: 'Main Dashboard', desc: 'Unified view of all broker accounts, positions, and P&L' },
  { title: 'Option Chain', desc: 'Professional option chain with real-time strikes and premiums' },
  { title: 'Multi-Leg Builder', desc: 'Build and execute complex multi-leg options strategies' },
  { title: 'Order Management', desc: 'Live order book with modification, cancellation, and bulk operations' },
  { title: 'Position Monitor', desc: 'Real-time position tracking with one-click square-off' },
  { title: 'Event Log', desc: 'Comprehensive execution log with latency tracking' },
];

const targetUsers = [
  'Professional Traders',
  'Proprietary Trading Firms',
  'Portfolio Managers',
  'Algorithmic Traders',
  'Multi-Account Traders',
  'Active Options Traders',
];

const PREEMPTION_WHATSAPP = whatsappLink('Hi, I have an enquiry about Preemption Algo Software.', 'preemption');

export default function Software() {
  const [searchParams] = useSearchParams();
  const showDemo = searchParams.get('demo') === 'true';

  const [demoOpen, setDemoOpen] = useState(showDemo);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', phone: '', team_size: '', message: '' });
  const [demoStatus, setDemoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoStatus('loading');
    const { error } = await supabase.from('demo_requests').insert(demoForm);
    setDemoStatus(error ? 'error' : 'success');
    if (!error) setDemoForm({ name: '', email: '', company: '', phone: '', team_size: '', message: '' });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-500/8 blur-[140px] rounded-full" />

        <div className="relative container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Flagship Software Product
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance"
            >
              PREEMPTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3 text-lg text-brand-700 font-semibold"
            >
              Professional Multi-Broker Algorithmic Trading & Order Management System
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              A high-performance desktop-based Order Management System (OMS) built for professional
              traders, proprietary trading firms, portfolio managers, and algorithmic trading
              enthusiasts. Manage multiple broker accounts, execute complex strategies, and monitor
              positions through a single, intuitive interface.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-3"
            >
              <button onClick={() => setDemoOpen(true)} className="btn-primary">
                <Play className="w-4 h-4" />
                Book Demo
              </button>
              <a href={PREEMPTION_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-800 font-semibold hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5 transition-all">
                <Zap className="w-4 h-4 text-brand-600" />
                Enquire on WhatsApp
              </a>
              <a href="#brochure" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-800 font-semibold hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5 transition-all">
                <Download className="w-4 h-4 text-brand-600" />
                Download Brochure
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview / Description */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            eyebrow="Overview"
            title="Built for speed, reliability, and flexibility"
          />
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            <p>
              PREEMPTION is a high-performance desktop-based Order Management System (OMS) built for
              professional traders, proprietary trading firms, portfolio managers, and algorithmic
              trading enthusiasts. Designed with speed, reliability, and flexibility in mind,
              PREEMPTION enables users to manage multiple broker accounts, execute complex trading
              strategies, and monitor positions through a single, intuitive interface.
            </p>
            <p>
              The platform supports multi-account execution, allowing orders to be placed
              simultaneously across multiple trading accounts with minimal latency. Whether
              executing a single-leg trade or a complex multi-leg options strategy, PREEMPTION
              delivers fast, synchronized order routing while maintaining complete control over
              every order.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Key Features"
            title="Everything a professional trader needs"
            subtitle="Sixteen powerful features designed for multi-broker, multi-account, multi-leg trading operations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="card card-hover p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Dashboard Preview"
            title="One desktop application for your entire trading operation"
            subtitle="Monitor markets, manage positions, and track performance — all from a single, intuitive interface."
          />
          <DashboardMockup />
        </div>
      </section>

      {/* Workflow */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <SectionHeading
            eyebrow="How It Works"
            title="From login to execution in milliseconds"
            subtitle="A seamless workflow that connects brokers, validates risk, and routes orders across all accounts with minimal latency."
          />
          <div className="grid lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="card p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-700">0{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Reports */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Analytics & Reports"
            title="Deep analytics that give you the edge"
            subtitle="Comprehensive reporting and execution analytics to monitor performance and analyze execution quality."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {analyticsFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card card-hover p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Performance + Secure by Design + Scalable Architecture */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Built for Performance', desc: 'PREEMPTION has been engineered to minimize execution delays and provide a responsive trading experience. Every order request, broker acknowledgment, and execution event is logged with precise timestamps, enabling users to monitor performance and analyze execution quality.' },
              { icon: ShieldCheck, title: 'Secure by Design', desc: 'Security is a core principle of PREEMPTION. The platform supports hardware-based licensing, secure user authentication, encrypted communication, and centralized license management. Future releases will enhance security through cloud-based license verification and centralized order execution infrastructure.' },
              { icon: Layers, title: 'Scalable Architecture', desc: 'PREEMPTION is built with a modular architecture that enables seamless integration with multiple brokers and future expansion into additional global markets. The platform is designed to grow alongside evolving trading requirements while maintaining reliability, performance, and ease of use.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            eyebrow="Who Is It For?"
            title="Designed for serious trading professionals"
            subtitle="PREEMPTION combines professional-grade execution capabilities with an intuitive user experience."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {targetUsers.map((u, i) => (
              <motion.div
                key={u}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card card-hover p-5 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{u}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="section-padding bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-20" />
        <div className="relative container-custom">
          <SectionHeading
            dark
            eyebrow="Screenshots"
            title="See the platform in action"
            subtitle="A look at the key screens that make up the PREEMPTION experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((ss, i) => (
              <motion.div
                key={ss.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-800 to-brand-950 p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-400/60" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-white font-semibold">{ss.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{ss.desc}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure download */}
      <section id="brochure" className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-brand-50 to-brand-50 dark:from-brand-900 dark:to-brand-800 border border-gray-200 dark:border-gray-700 p-8 lg:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Download the PREEMPTION Brochure
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get the full product overview, feature list, technical specifications, and pricing
              information in a single document.
            </p>
            <button
              onClick={() => {
                const content = `PREEMPTION\nProfessional Multi-Broker Algorithmic Trading & Order Management System\n\nDatacraftr.ai\n${COMPANY.email}\n${COMPANY.phonePreemption} (WhatsApp)\n\nKEY FEATURES:\n- Multi-broker architecture\n- Multi-account order execution\n- Advanced multi-leg order placement\n- Professional option chain with real-time strike selection\n- Market, Limit, Stop Loss (SL), and Stop Loss Market (SL-M) order support\n- Bulk order placement across multiple accounts\n- Bulk order cancellation\n- One-click position square-off\n- Real-time order book and position monitoring\n- Order modification and cancellation\n- Integrated P&L tracking\n- Smart settings with customizable defaults\n- Configurable workspace with hide/show panels\n- Comprehensive event logging with latency tracking\n- Stable, responsive desktop application optimized for active traders\n\nWHO IS IT FOR?\n- Professional traders\n- Proprietary trading firms\n- Portfolio managers\n- Algorithmic traders\n- Multi-account traders\n- Active options traders\n\nContact: ${COMPANY.email} | WhatsApp: ${COMPANY.phonePreemption}`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'PREEMPTION-brochure.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="btn-primary"
            >
              <Download className="w-4 h-4" />
              Download Brochure
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing placeholder */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Pricing"
            title="Flexible pricing for every team"
            subtitle="From individual traders to institutional desks, we have a plan that fits. Book a demo for a tailored quote."
          />
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Trader', price: '$499', period: '/mo', features: ['1 broker connection', '3 account slots', 'Single-leg orders', 'Basic analytics', 'Email support'] },
              { name: 'Pro', price: '$1,499', period: '/mo', features: ['3 broker connections', '10 account slots', 'Multi-leg orders', 'Advanced analytics', 'Bulk operations', 'Priority support'], popular: true },
              { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited brokers', 'Unlimited accounts', 'All order types', 'Custom integrations', 'Dedicated infrastructure', '24/7 support', 'SLA guarantee'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 relative ${plan.popular ? 'border-brand-500 ring-2 ring-brand-500/20' : ''}`}
              >
                {plan.popular && (
                  <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.price === 'Custom' ? (
                  <a href={PREEMPTION_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
                    Contact Sales
                  </a>
                ) : (
                  <button onClick={() => setDemoOpen(true)} className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                    Get Started
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="space-y-3">
            {softwareFAQs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA for Preemption */}
          <div className="mt-10 text-center">
            <a href={PREEMPTION_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Zap className="w-4 h-4" />
              Enquire about PREEMPTION on WhatsApp
            </a>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Dedicated support: {COMPANY.phonePreemption}
            </p>
          </div>
        </div>
      </section>

      {/* Book Demo Modal */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-gray-50/60 backdrop-blur-sm" onClick={() => setDemoOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Book a Demo</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">See PREEMPTION in action</p>
                  </div>
                  <button onClick={() => setDemoOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-brand-800 text-gray-600 dark:text-gray-300">
                    <ChevronDown className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                {demoStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-2">Request received!</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We'll contact you within 24 hours to schedule your demo.</p>
                    <button onClick={() => { setDemoOpen(false); setDemoStatus('idle'); }} className="btn-primary mt-6">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitDemo} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input required placeholder="Full name" value={demoForm.name} onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })} className="input-field" />
                      <input required type="email" placeholder="Email" value={demoForm.email} onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })} className="input-field" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input placeholder="Company" value={demoForm.company} onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })} className="input-field" />
                      <input placeholder="Phone" value={demoForm.phone} onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })} className="input-field" />
                    </div>
                    <select value={demoForm.team_size} onChange={(e) => setDemoForm({ ...demoForm, team_size: e.target.value })} className="input-field">
                      <option value="">Team size</option>
                      <option>1-5</option>
                      <option>6-20</option>
                      <option>21-50</option>
                      <option>50+</option>
                    </select>
                    <textarea placeholder="Tell us about your needs..." value={demoForm.message} onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })} rows={3} className="input-field resize-none" />
                    {demoStatus === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={demoStatus === 'loading'} className="btn-primary w-full">
                      {demoStatus === 'loading' ? 'Submitting...' : 'Request Demo'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative max-w-5xl mx-auto"
    >
      <div className="absolute -inset-6 bg-gradient-to-r from-brand-500/10 to-brand-500/10 blur-3xl rounded-3xl" />
      <div className="relative glass rounded-2xl shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-400" />
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">PREEMPTION — Desktop OMS</div>
        </div>

        {/* Body */}
        <div className="p-5 bg-gray-50/50 dark:bg-gray-900/50">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Portfolio Value', value: '₹1.24Cr', chg: '+24.7%', color: 'text-gray-600 dark:text-gray-400' },
              { label: 'Active Accounts', value: '7', chg: 'Connected', color: 'text-gray-600 dark:text-gray-300' },
              { label: 'Open Positions', value: '42', chg: 'Live', color: 'text-gray-600 dark:text-gray-400' },
              { label: 'Latency', value: '12ms', chg: 'Optimal', color: 'text-brand-600 dark:text-brand-400' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <div className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{kpi.label}</div>
                <div className="font-display font-bold text-gray-900 dark:text-white text-lg">{kpi.value}</div>
                <div className={`text-[10px] font-semibold ${kpi.color}`}>{kpi.chg}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Portfolio Performance</span>
                <div className="flex gap-1.5">
                  {['1D', '1W', '1M', '1Y'].map((t, i) => (
                    <span key={t} className={`px-2 py-0.5 rounded text-[10px] font-medium ${i === 2 ? 'bg-gray-100 dark:bg-brand-500/20 text-gray-700 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>{t}</span>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 400 120" className="w-full h-28">
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  d="M0,90 L40,75 L80,80 L120,55 L160,60 L200,35 L240,45 L280,20 L320,30 L360,10 L400,15"
                  fill="none" stroke="#16a34a" strokeWidth="2.5"
                />
                <path d="M0,90 L40,75 L80,80 L120,55 L160,60 L200,35 L240,45 L280,20 L320,30 L360,10 L400,15 L400,120 L0,120 Z" fill="url(#dashGrad)" />
              </svg>
            </div>

            {/* Account list */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-3">Broker Accounts</div>
              <div className="space-y-2">
                {[
                  { name: 'Zerodha — Acct 1', ret: '+₹2.4L', status: 'green' },
                  { name: 'Angel One — Acct 2', ret: '+₹1.8L', status: 'green' },
                  { name: 'Upstox — Acct 3', ret: '+₹0.9L', status: 'green' },
                  { name: 'ICICI — Acct 4', ret: '-₹0.2L', status: 'red' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'green' ? 'bg-brand-500' : 'bg-red-400'}`} />
                      <span className="text-gray-700 dark:text-gray-200">{s.name}</span>
                    </div>
                    <span className={`font-semibold ${s.status === 'green' ? 'text-gray-600 dark:text-gray-400' : 'text-red-500'}`}>{s.ret}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order book */}
          <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Live Order Book</span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">● Real-time</span>
            </div>
            <div className="space-y-1.5">
              {[
                { sym: 'NIFTY 24500 CE', type: 'Multi-Leg', qty: '100', status: 'Executed', color: 'green' },
                { sym: 'BANKNIFTY 53000 PE', type: 'SL-M', qty: '75', status: 'Pending', color: 'amber' },
                { sym: 'RELIANCE', type: 'Limit', qty: '500', status: 'Executed', color: 'green' },
              ].map((o, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <span className="font-mono font-semibold text-gray-800 dark:text-gray-100">{o.sym}</span>
                  <span className="text-gray-500 dark:text-gray-400">{o.type} · {o.qty}</span>
                  <span className={`font-semibold ${o.color === 'green' ? 'text-gray-600 dark:text-gray-400' : 'text-amber-500'}`}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
