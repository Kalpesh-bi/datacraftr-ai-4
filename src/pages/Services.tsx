import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { services } from '../lib/data';

export default function Services() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero header */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[120px] rounded-full" />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-5"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance"
          >
            Full-stack solutions for{' '}
            <span className="gradient-text">growing businesses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From custom websites to AI automation, data analytics, and proprietary software —
            we offer 12 specialized services to cover every aspect of your technology needs.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <SectionHeading
            title="Not sure which service you need?"
            subtitle="Book a free consultation and we'll help you figure out the right approach for your business."
          />
          <Link to="/contact?consultation=true" className="btn-primary">
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
