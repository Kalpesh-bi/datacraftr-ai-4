import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { consultationLink } from '../../lib/constants';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-white dark:bg-navy-950 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-8 lg:p-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-dark opacity-20" />
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-navy-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent-500/15 blur-[100px] rounded-full" />

          <div className="relative">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-500/10 border border-navy-500/20 text-navy-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Let's build something great together
            </motion.span>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight text-balance max-w-3xl mx-auto">
              Ready to transform your business with AI-powered software?
            </h2>

            <p className="mt-4 text-lg text-navy-200 max-w-2xl mx-auto">
              Get a free consultation today. We'll map out your project, recommend the right
              technology, and give you a clear roadmap — no commitment required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact?consultation=true" className="btn-primary">
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={consultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-navy-400" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
