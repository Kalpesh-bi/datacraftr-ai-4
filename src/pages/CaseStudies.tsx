import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../lib/data';

export default function CaseStudies() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[120px] rounded-full" />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-5"
          >
            Case Studies
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance"
          >
            Real results, real impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            See how we've helped businesses overcome challenges and achieve measurable growth.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <motion.article
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card card-hover overflow-hidden grid lg:grid-cols-5 gap-0"
              >
                <div className="lg:col-span-2 relative h-56 lg:h-auto overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent lg:bg-gradient-to-r" />
                  <span className="absolute top-3 left-3 badge bg-brand-500 text-white">{cs.industry}</span>
                </div>
                <div className="lg:col-span-3 p-6 lg:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700">{cs.client}</span>
                    <span>·</span>
                    <span>{cs.duration}</span>
                  </div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-gray-900 mb-3">{cs.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{cs.summary}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                    {cs.results.map((r) => (
                      <div key={r.label} className="rounded-xl bg-gray-50 p-2.5 text-center">
                        <div className="font-display font-bold text-gray-600 text-base">{r.value}</div>
                        <div className="text-[10px] text-gray-500">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link to={`/case-studies/${cs.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors group/link">
                    Read full case study
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
