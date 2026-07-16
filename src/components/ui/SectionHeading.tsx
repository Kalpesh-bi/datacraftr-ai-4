import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
}: Props) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-12 lg:mb-16`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
            dark
              ? 'bg-navy-500/10 text-navy-400 border border-navy-500/20'
              : 'bg-navy-50 text-navy-700 border border-navy-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-navy-500 animate-pulse" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-lg leading-relaxed ${dark ? 'text-navy-200' : 'text-navy-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
