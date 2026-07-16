import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioItems } from '../lib/data';

const categories = ['All', ...Array.from(new Set(portfolioItems.map((p) => p.category)))];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter((p) => p.category === active);

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-navy-500/10 blur-[120px] rounded-full" />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-500/10 border border-navy-500/20 text-navy-400 text-sm font-semibold mb-5"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-white tracking-tight text-balance"
          >
            Our work speaks for itself
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-navy-200 max-w-2xl mx-auto"
          >
            Explore a selection of products and platforms we've built for clients across industries.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-navy-600 text-white shadow-glow-navy'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.article
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group card card-hover overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute top-3 left-3 badge bg-white/90 text-navy-800">{item.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">{item.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed mb-4">{item.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="text-center rounded-lg bg-navy-50 py-2">
                        <div className="font-bold text-navy-600 text-sm">{m.value}</div>
                        <div className="text-[10px] text-navy-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-navy-50 text-navy-600 text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact?consultation=true" className="btn-primary">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
