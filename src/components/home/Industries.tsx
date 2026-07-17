import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { industries } from '../../lib/data';

export default function Industries() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Industries"
          title="Trusted across industries"
          subtitle="From fintech to healthcare, we bring deep domain expertise to every project."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group card card-hover p-5 text-center cursor-default"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {industry.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{industry.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
