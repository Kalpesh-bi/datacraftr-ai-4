import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BarChart3, Zap, Activity, Download, Play } from 'lucide-react';

const features = [
  { icon: TrendingUp, label: 'Real-time Analytics', desc: 'Live market data with sub-second latency' },
  { icon: Activity, label: 'Predictive Engine', desc: 'ML models for trend forecasting' },
  { icon: BarChart3, label: 'Backtesting', desc: '10+ years of historical data' },
  { icon: Zap, label: 'Auto Execution', desc: 'Rule-based automated trading' },
];

export default function FeaturedSoftware() {
  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-navy-500/10 blur-[120px] rounded-full" />

      <div className="relative container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-500/10 border border-navy-500/20 text-navy-400 text-sm font-semibold mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-navy-400 animate-pulse" />
              Flagship Product
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight text-balance"
            >
              Preemption Algo Software
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-navy-200 leading-relaxed"
            >
              Our proprietary algorithmic trading and analytics platform. Real-time market
              intelligence, predictive modeling, backtesting, and automated execution — all in
              one powerful dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-500/10 border border-navy-500/20 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-navy-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{f.label}</div>
                    <div className="text-xs text-navy-400">{f.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/Alo software" className="btn-primary">
                Explore the Platform
                <ArrowRight className="w-4 h-4" />
              </Link>

            </motion.div>
          </div>

          {/* Right: Mock dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-navy-500/15 to-accent-500/15 blur-3xl rounded-3xl" />
            <div className="relative glass-dark rounded-2xl p-5 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-bold text-white">Preemption Algo</div>
                  <div className="text-xs text-navy-400">Live Trading Session</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-500/10 border border-navy-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy-400 animate-pulse" />
                  <span className="text-xs text-navy-400 font-medium">Active</span>
                </div>
              </div>

              {/* Price ticker */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { sym: 'AAPL', price: '187.42', chg: '+2.3%' },
                  { sym: 'TSLA', price: '248.91', chg: '+5.1%' },
                  { sym: 'NVDA', price: '921.07', chg: '+3.8%' },
                ].map((t) => (
                  <div key={t.sym} className="rounded-lg bg-white/5 border border-white/10 p-2.5">
                    <div className="text-xs font-bold text-white">{t.sym}</div>
                    <div className="text-sm text-navy-200">${t.price}</div>
                    <div className="text-[10px] text-navy-400 font-semibold">{t.chg}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-navy-200">Portfolio Performance</span>
                  <span className="text-xs text-navy-400 font-bold">+24.7%</span>
                </div>
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    d="M0,60 L30,50 L60,55 L90,35 L120,40 L150,25 L180,30 L210,15 L240,20 L270,10 L300,5"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                    d="M0,60 L30,50 L60,55 L90,35 L120,40 L150,25 L180,30 L210,15 L240,20 L270,10 L300,5 L300,80 L0,80 Z"
                    fill="url(#grad)"
                  />
                </svg>
              </div>

              {/* Strategy status */}
              <div className="space-y-2">
                {[
                  { name: 'Momentum Scanner', status: 'Running', color: 'green' },
                  { name: 'Mean Reversion', status: 'Running', color: 'green' },
                  { name: 'Arbitrage Bot', status: 'Paused', color: 'amber' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                    <span className="text-xs text-navy-200">{s.name}</span>
                    <span className={`text-xs font-semibold ${s.color === 'green' ? 'text-navy-400' : 'text-amber-400'}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating download badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 glass-dark rounded-xl px-3 py-2 shadow-xl border border-navy-500/20"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-navy-400" />
                <span className="text-xs font-semibold text-white">Brochure Available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
