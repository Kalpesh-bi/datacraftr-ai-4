import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react';
import { consultationLink } from '../../lib/constants';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden bg-navy-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-navy-500/20 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-accent-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-navy-700/30 blur-[100px] rounded-full" />

      <div className="relative container-custom px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-500/10 border border-navy-500/20 text-navy-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Software & Data Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance"
            >
              We build{' '}
              <span className="gradient-text">intelligent software</span>{' '}
              that grows your business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg lg:text-xl text-navy-200 leading-relaxed max-w-xl"
            >
              From AI automation to data analytics, e-commerce, and custom software —
              Datacraftr.ai turns your ideas into scalable, revenue-driving products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/contact?consultation=true" className="btn-primary">
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={consultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-navy-400" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { value: 150, suffix: '+', label: 'Projects Delivered' },
                { value: 98, suffix: '%', label: 'Client Satisfaction' },
                { value: 12, suffix: '+', label: 'Industries Served' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs lg:text-sm text-navy-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard preview */}
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function DashboardPreview() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-navy-500/20 to-accent-500/20 blur-3xl rounded-3xl" />

      {/* Dashboard card */}
      <div className="relative glass-dark rounded-2xl p-5 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-navy-400/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-navy-300">
            <Activity className="w-3.5 h-3.5 text-navy-400" />
            datacraftr.ai/dashboard
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Revenue', value: '$2.4M', change: '+34%', icon: TrendingUp, color: 'text-navy-400' },
            { label: 'Active Users', value: '48.2K', change: '+12%', icon: Activity, color: 'text-accent-400' },
            { label: 'AI Tasks', value: '1,240', change: '+89%', icon: Zap, color: 'text-amber-400' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
              <kpi.icon className={`w-4 h-4 ${kpi.color} mb-2`} />
              <div className="text-lg font-bold text-white">{kpi.value}</div>
              <div className="text-[10px] text-navy-400">{kpi.label}</div>
              <div className={`text-[10px] font-semibold ${kpi.color} mt-0.5`}>{kpi.change}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-navy-200">Performance Analytics</span>
            <span className="text-[10px] text-navy-400 font-medium">Live</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                className="flex-1 rounded-t bg-gradient-to-t from-navy-600/40 to-navy-400"
              />
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs font-semibold text-navy-200 mb-3">Recent Activity</div>
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
                  <span className="w-1.5 h-1.5 rounded-full bg-navy-400" />
                  <span className="text-navy-200">{item.text}</span>
                </div>
                <span className="text-navy-500">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 glass-dark rounded-xl px-3 py-2 shadow-xl border border-navy-500/20"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-navy-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-navy-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">AI Powered</div>
            <div className="text-[10px] text-navy-400">Real-time insights</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
