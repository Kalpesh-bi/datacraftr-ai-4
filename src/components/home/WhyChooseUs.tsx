import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Rocket, Users, Clock, Heart, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const reasons = [
  {
    icon: Rocket,
    title: 'Fast, Reliable Delivery',
    description: 'We ship in weeks, not months. Agile sprints keep you in the loop and your product moving forward.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-Grade Quality',
    description: 'Clean, tested, scalable code built to handle real traffic and support your business as it grows.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'You work directly with a team that understands your business goals, not just your technology stack.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: '12+ projects delivered with a 98% client satisfaction rate across 12+ industries worldwide.',
  },
  {
    icon: Clock,
    title: 'Ongoing Support',
    description: 'We provide continuous monitoring, maintenance, and support — we do not disappear after launch.',
  },
  {
    icon: Heart,
    title: 'Partnership Mindset',
    description: 'We invest in your success. Your growth is our growth — that is the foundation of every partnership.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full" />

      <div className="relative container-custom">
        <SectionHeading
          eyebrow="Why Datacraftr.ai"
          title="A partner you can trust with your technology"
          subtitle="We are not just developers. We are your technology partner — invested in your growth from day one."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group card card-hover p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-100 transition-all">
                <r.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r.description}</p>
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
          <Link to="/about" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">
            Learn more about our story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
