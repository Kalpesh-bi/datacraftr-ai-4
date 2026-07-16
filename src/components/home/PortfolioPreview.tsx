import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { portfolioItems } from '../../lib/data';

export default function PortfolioPreview() {
  const items = portfolioItems.slice(0, 3);
  return (
    <section className="section-padding bg-white dark:bg-navy-950">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Portfolio"
          title="Recent work we're proud of"
          subtitle="A glimpse of the products and platforms we've built for clients across industries."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group card card-hover overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                <span className="absolute top-3 left-3 badge bg-white/90 text-navy-800">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-navy-50 text-navy-600 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/portfolio" className="btn-outline">
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
