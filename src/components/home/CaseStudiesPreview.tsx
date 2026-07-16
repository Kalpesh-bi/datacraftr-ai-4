import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { caseStudies } from '../../lib/data';

export default function CaseStudiesPreview() {
  const items = caseStudies.slice(0, 2);
  return (
    <section className="section-padding bg-navy-50 dark:bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-navy-100 rounded-full blur-3xl opacity-50" />
      <div className="relative container-custom">
        <SectionHeading
          eyebrow="Case Studies"
          title="Real results for real businesses"
          subtitle="See how we've helped companies overcome challenges and achieve measurable growth."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {items.map((cs, i) => (
            <motion.article
              key={cs.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group card card-hover overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="badge bg-navy-500 text-white mb-2">{cs.industry}</span>
                  <h3 className="font-display font-bold text-white text-lg leading-tight">{cs.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-navy-600 leading-relaxed mb-4">{cs.summary}</p>
                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                  {cs.results.slice(0, 4).map((r) => (
                    <div key={r.label} className="rounded-xl bg-navy-50 p-3 text-center">
                      <div className="font-display font-bold text-navy-600 text-lg">{r.value}</div>
                      <div className="text-xs text-navy-500">{r.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-navy-600 transition-colors group/link"
                >
                  Read case study
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/case-studies" className="btn-outline">
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
