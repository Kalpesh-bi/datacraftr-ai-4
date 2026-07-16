import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Rocket, Users, Clock, Heart, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const reasons = [
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description: 'We ship in weeks, not months. Agile sprints keep you in the loop and your product moving.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-Grade Code',
    description: 'Clean, tested, scalable code built to handle real traffic and real growth.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'You get a dedicated team that understands your business, not just your tech stack.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: '150+ projects delivered with a 98% client satisfaction rate across 12+ industries.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Ongoing monitoring, maintenance, and support — we don\'t disappear after launch.',
  },
  {
    icon: Heart,
    title: 'Partnership Mindset',
    description: 'We invest in your success. Your growth is our growth — that\'s the deal.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-navy-500/10 blur-[120px] rounded-full" />

      <div className="relative container-custom">
        <SectionHeading
          dark
          eyebrow="Why Datacraftr.ai"
          title="Why businesses choose us"
          subtitle="We're not just developers. We're your technology partner — invested in your growth from day one."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass-dark rounded-2xl p-6 hover:border-navy-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-navy-500/10 border border-navy-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <r.icon className="w-5 h-5 text-navy-400" />
              </div>
              <h3 className="font-display font-bold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-navy-300 leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link to="/about" className="inline-flex items-center gap-2 text-navy-400 font-semibold hover:gap-3 transition-all">
            Learn more about our story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
