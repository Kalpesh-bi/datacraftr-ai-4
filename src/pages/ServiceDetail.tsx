import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, MessageCircle, Star } from 'lucide-react';
import { services } from '../lib/data';
import { consultationLink } from '../lib/constants';
import SectionHeading from '../components/ui/SectionHeading';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const isPreemption = service.slug === 'preemption-algo-software';
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className={`absolute -top-20 right-0 w-[500px] h-[400px] bg-gradient-to-br ${service.color} opacity-10 blur-[120px] rounded-full`} />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="flex items-start gap-5">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-xl flex-shrink-0`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              {service.badge && (
                <span className={`badge mb-3 ${service.badge === 'NEW' ? 'bg-brand-500 text-white' : 'bg-brand-700 text-white'}`}>
                  {service.badge}
                </span>
              )}
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl">{service.short}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{service.description}</p>

                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50">
                      <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.technologies.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* CTA card */}
                <div className="card p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-2">Interested in this service?</h3>
                  <p className="text-sm text-gray-600 mb-4">Get a free consultation and custom quote.</p>
                  <Link to="/contact?consultation=true" className="btn-primary w-full mb-2">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={consultationLink(service.title, isPreemption ? 'preemption' : 'general')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full"
                  >
                    <MessageCircle className="w-4 h-4 text-gray-600" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Rating card */}
                <div className="card p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Rated 4.9/5 by clients for this service category.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading title="Related services" />
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((s) => {
              const RIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="card card-hover p-5 group"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white mb-3`}>
                    <RIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600">{s.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
