import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { pricingPlans } from '../lib/data';

const faqs = [
  { q: 'What\'s included in the free consultation?', a: 'A 30-minute call where we discuss your project, goals, and challenges. You\'ll get a high-level roadmap and recommendations — no commitment required.' },
  { q: 'Do you offer payment plans?', a: 'Yes. For larger projects we offer milestone-based payments. Enterprise clients can negotiate custom payment terms.' },
  { q: 'What happens after launch?', a: 'Every plan includes a support period. After that, you can continue with our Support & Maintenance service for ongoing updates and monitoring.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can start with any plan and upgrade as your needs grow. We\'ll prorate any remaining balance.' },
];

export default function Pricing() {
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
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose the plan that fits your stage. All plans include a free consultation and custom project roadmap.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card p-8 relative ${plan.popular ? 'border-brand-500 ring-2 ring-brand-500/20 lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gray-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/contact?consultation=true'}
                  className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <SectionHeading eyebrow="Pricing FAQ" title="Common questions about pricing" />
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="card p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
