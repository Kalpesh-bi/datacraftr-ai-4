import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Globe, Zap } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const values = [
  { icon: Target, title: 'Outcome-Driven', desc: 'We measure success by your results, not our hours. Every decision is made with your business goals in mind.' },
  { icon: Zap, title: 'Speed & Quality', desc: 'We move fast without cutting corners. Clean, tested, production-ready code delivered on schedule.' },
  { icon: Heart, title: 'Partnership', desc: 'We\'re not vendors — we\'re partners. Your growth is our growth, and we invest in your long-term success.' },
  { icon: Globe, title: 'Remote-First', desc: 'We work with clients worldwide. Our distributed team means we can assemble the best talent for your project.' },
];

const team = [
  { name: 'Engineering', count: 2, desc: 'Full-stack engineers, data scientists, and AI specialists.' },
  { name: 'Design', count: 1, desc: 'UI/UX designers and motion graphics artists.' },
  { name: 'Data & Analytics', count: 1, desc: 'Data engineers, analysts, and BI experts.' },
  { name: 'Project Management', count: 1, desc: 'Dedicated project managers and scrum masters.' },
];

export default function About() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[120px] rounded-full" />
        <div className="relative container-custom px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-5"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance max-w-3xl mx-auto"
          >
            We turn data into <span className="gradient-text">growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Datacraftr.ai is a remote-first AI software company helping businesses build intelligent
            products, automate operations, and make data-driven decisions.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 12, suffix: '+', label: 'Projects Delivered' },
              { value: 5, suffix: '+', label: 'Current Team' },
              { value: 12, suffix: '+', label: 'Industries Served' },
              { value: 98, suffix: '%', label: 'Client Satisfaction' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl lg:text-5xl font-bold gradient-text-navy">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-900">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to AI and data technology — helping businesses of all sizes
                leverage intelligent software to compete, grow, and win in their markets.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                A world where every business — not just tech giants — can harness AI, data, and
                automation to build better products and deliver better experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Values"
            title="What we believe in"
            subtitle="The principles that guide every decision we make and every line of code we write."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card card-hover p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1.5">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Team"
            title="5+ specialists, one mission"
            subtitle="A dedicated team of engineers, designers, data scientists, and strategists — all focused on your success."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card card-hover p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-gray-600" />
                </div>
                <div className="font-display text-3xl font-bold text-gray-900 mb-1">{t.count}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/8 blur-[120px] rounded-full" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Want to work with us?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Let's talk about how we can help your business grow with AI-powered software.
            </p>
            <Link to="/contact?consultation=true" className="btn-primary">
              Get Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
