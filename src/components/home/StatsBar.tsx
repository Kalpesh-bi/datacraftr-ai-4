import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', sublabel: 'Across 12+ industries' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', sublabel: 'Based on post-launch surveys' },
  { value: 5, suffix: 'M+', label: 'Data Points Processed', sublabel: 'Daily across all platforms' },
  { value: 40, suffix: '+', label: 'Team Members', sublabel: 'Engineers, designers, analysts' },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-white dark:bg-navy-950 border-y border-navy-100 dark:border-navy-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold gradient-text-navy">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 font-semibold text-navy-900">{stat.label}</div>
              <div className="text-sm text-navy-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
