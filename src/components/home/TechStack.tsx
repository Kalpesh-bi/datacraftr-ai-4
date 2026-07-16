import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { techStack } from '../../lib/data';

const categories = ['Frontend', 'Backend', 'Cloud', 'AI', 'Payments'];

export default function TechStack() {
  return (
    <section className="section-padding bg-navy-50 dark:bg-navy-900 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Technology Stack"
          title="Built with modern, battle-tested technology"
          subtitle="We use the best tools for the job — not the trendiest. Every choice is made for performance, scalability, and maintainability."
        />

        <div className="space-y-8">
          {categories.map((category, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-display font-bold text-navy-900 text-lg">{category}</h3>
                <div className="flex-1 h-px bg-navy-200" />
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack
                  .filter((t) => t.category === category)
                  .map((tech, i) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="px-4 py-2.5 rounded-xl bg-white border border-navy-100 text-navy-700 font-medium text-sm shadow-sm hover:border-navy-300 hover:text-navy-600 hover:shadow-md transition-all"
                    >
                      {tech.name}
                    </motion.span>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
