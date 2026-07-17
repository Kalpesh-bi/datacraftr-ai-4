import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { timelineSteps } from '../../lib/data';

export default function GrowthTimeline() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60" />
      <div className="relative container-custom">
        <SectionHeading
          eyebrow="Our Process"
          title="From idea to impact in 5 steps"
          subtitle="A proven framework that delivers results — and keeps your business growing long after launch."
        />

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-brand-300 to-gray-200" />

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 flex lg:justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-2xl shadow-card group-hover:border-brand-500 transition-colors">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <div className="lg:text-center">
                  <h3 className="font-display font-bold text-gray-900 mb-2 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
