import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { whatsappLink, COMPANY } from '../lib/constants';

export default function FloatingWhatsApp() {
  const location = useLocation();
  const isPreemptionPage = location.pathname === '/software';
  const link = whatsappLink(
    isPreemptionPage
      ? 'Hi, I have an enquiry about Preemption Algo Software.'
      : "Hi, I'm interested in your services. Please share more details.",
    isPreemptionPage ? 'preemption' : 'general'
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowTooltip(true), 800);
      const hide = setTimeout(() => setShowTooltip(false), 6000);
      return () => { clearTimeout(timer); clearTimeout(hide); };
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="fixed bottom-5 right-5 z-50 flex items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="hidden sm:block mb-1"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3 max-w-[240px]">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-100 dark:bg-brand-700 text-gray-500 flex items-center justify-center hover:bg-gray-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {isPreemptionPage ? 'Preemption Algo Support' : 'Chat with us!'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {isPreemptionPage ? COMPANY.phonePreemption : COMPANY.phone} · WhatsApp
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 text-white shadow-glow-brand hover:bg-brand-600 hover:scale-110 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-20" />
            <MessageCircle className="w-7 h-7 relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
