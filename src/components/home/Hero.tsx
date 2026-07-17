import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react';
import { consultationLink, COMPANY_STATS } from '../../lib/constants';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-500/8 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-brand-400/6 blur-[140px] rounded-full" />

      <div className="relative container-custom px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Software & Data Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight text-balance"
            >
              Software that{' '}
              <span className="gradient-text">solves real business problems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              We design and build custom software, AI automation, and data analytics
              solutions that help your business operate smarter, scale faster, and make
              better decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/contact?consultation=true" className="btn-primary">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={consultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-800 font-semibold hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5 transition-all"
              >
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { value: COMPANY_STATS.projectsDelivered, suffix: '+', label: 'Projects Delivered' },
                { value: COMPANY_STATS.teamMembers, suffix: '+', label: 'Current Team' },
                { value: COMPANY_STATS.industriesServed, suffix: '+', label: 'Industries Served' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl lg:text-3xl font-bold gradient-text-navy">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}

function DashboardPreview() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/10 to-brand-400/10 blur-3xl rounded-3xl" />

      <div className="relative glass rounded-2xl p-5 shadow-premium">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-400" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Activity className="w-3.5 h-3.5 text-brand-500" />
            datacraftr.ai/dashboard
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Revenue', value: '$2.4M', change: '+34%', icon: TrendingUp, color: 'text-brand-600' },
            { label: 'Active Users', value: '48.2K', change: '+12%', icon: Activity, color: 'text-brand-500' },
            { label: 'AI Tasks', value: '1,240', change: '+89%', icon: Zap, color: 'text-amber-500' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <kpi.icon className={`w-4 h-4 ${kpi.color} mb-2`} />
              <div className="text-lg font-bold text-gray-900">{kpi.value}</div>
              <div className="text-[10px] text-gray-500">{kpi.label}</div>
              <div className={`text-[10px] font-semibold ${kpi.color} mt-0.5`}>{kpi.change}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-700">Performance Analytics</span>
            <span className="text-[10px] text-brand-600 font-medium">Live</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-600/40 to-brand-400"
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
          <div className="text-xs font-semibold text-gray-700 mb-3">Recent Activity</div>
          <div className="space-y-2">
            {[
              { text: 'AI agent resolved 24 tickets', time: '2m ago' },
              { text: 'New order from Shopify store', time: '5m ago' },
              { text: 'Chargeback dispute filed', time: '12m ago' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
                <span className="text-gray-400">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 shadow-premium border border-brand-200"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">AI Powered</div>
            <div className="text-[10px] text-gray-500">Real-time insights</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
