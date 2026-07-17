import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { caseStudies } from '../lib/data';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[120px] rounded-full" />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            All Case Studies
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-5">
            {cs.industry}
          </span>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight max-w-3xl text-balance">
            {cs.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{cs.client}</span>
            <span>·</span>
            <span>{cs.duration}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={cs.image}
            alt={cs.title}
            className="w-full rounded-2xl shadow-card mb-12 max-h-96 object-cover"
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-gray-600" />
                  <h2 className="font-display text-xl font-bold text-gray-900">The Challenge</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-gray-600" />
                  <h2 className="font-display text-xl font-bold text-gray-900">Our Solution</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <h2 className="font-display text-xl font-bold text-gray-900">Services Used</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cs.services.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Results sidebar */}
            <div>
              <div className="sticky top-24">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Results</h2>
                <div className="space-y-3">
                  {cs.results.map((r) => (
                    <div key={r.label} className="card p-4">
                      <div className="font-display text-2xl font-bold gradient-text">{r.value}</div>
                      <div className="text-sm text-gray-600">{r.label}</div>
                    </div>
                  ))}
                </div>
                <Link to="/contact?consultation=true" className="btn-primary w-full mt-6">
                  Get Similar Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
