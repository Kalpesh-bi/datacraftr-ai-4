import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { Service } from '../lib/data';
import { consultationLink } from '../lib/constants';

type Props = {
  service: Service;
  index?: number;
};

export default function ServiceCard({ service, index = 0 }: Props) {
  const Icon = service.icon;
  const isPreemption = service.slug === 'preemption-algo-software';
  const whatsappHref = consultationLink(service.title, isPreemption ? 'preemption' : 'general');

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
              ? 'bg-navy-500 text-white'
              : 'bg-navy-900 dark:bg-navy-700 text-white'
          }`}
        >
          {service.badge}
        </span>
      )}

      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-navy-600 dark:group-hover:text-navy-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-navy-600 dark:text-navy-300 text-sm leading-relaxed mb-4">{service.short}</p>

      <ul className="space-y-1.5 mb-4">
        {service.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-navy-600 dark:text-navy-300">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-navy-500 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.technologies.slice(0, 4).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300 text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 dark:text-white hover:text-navy-600 dark:hover:text-navy-400 transition-colors group/link"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
        <span className="text-navy-200 dark:text-navy-600">·</span>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-300 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-navy-500 to-accent-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.article>
  );
}
