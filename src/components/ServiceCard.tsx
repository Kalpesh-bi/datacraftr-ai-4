import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../lib/data';

type Props = {
  service: Service;
  index?: number;
};

export default function ServiceCard({ service, index = 0 }: Props) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card card-hover group relative overflow-hidden p-6 lg:p-7"
    >
      {service.badge && (
        <span
          className={`badge absolute top-4 right-4 ${
            service.badge === 'NEW'
              ? 'bg-brand-500 text-white'
              : 'bg-gray-900 text-white'
          }`}
        >
          {service.badge}
        </span>
      )}

      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} text-white mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.short}</p>

      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-500 to-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.article>
  );
}
