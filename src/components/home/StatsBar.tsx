import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { COMPANY_STATS } from '../../lib/constants';

const stats = [
  { value: COMPANY_STATS.projectsDelivered, suffix: '+', label: 'Projects Delivered' },
  { value: COMPANY_STATS.clientSatisfaction, suffix: '%', label: 'Client Satisfaction' },
  { value: COMPANY_STATS.teamMembers, suffix: '+', label: 'Current Team' },
  { value: COMPANY_STATS.industriesServed, suffix: '+', label: 'Industries Served' },
];

export default function StatsBar() {
  return (
    <section className="py-14 bg-gray-50 border-y border-gray-200">
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
              <div className="mt-2 font-semibold text-gray-900">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
