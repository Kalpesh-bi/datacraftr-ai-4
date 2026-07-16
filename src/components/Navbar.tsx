import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, CalendarCheck, Boxes, Sun, Moon } from 'lucide-react';
import { WHATSAPP_LINK, COMPANY } from '../lib/constants';
import { useTheme } from '../lib/useTheme';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Software', path: '/software' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-navy-900 dark:text-white">
                Datacraftr<span className="text-navy-600 dark:text-navy-400">.ai</span>
              </span>
            </Link>

            {/* Desktop nav */}
<div className="hidden lg:flex items-center gap-1">
  {navLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        isActive(link.path)
          ? 'text-navy-600 dark:text-navy-400'
          : 'text-navy-700 dark:text-navy-200 hover:text-navy-600 dark:hover:text-navy-400'
      }`}
    >
      {link.label}
    </Link>
  ))}
</div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <MessageCircle className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                WhatsApp
              </a>
              <button
                onClick={() => navigate('/contact?consultation=true')}
                className="btn-primary text-sm py-2.5"
              >
                <CalendarCheck className="w-4 h-4" />
                Free Consultation
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 text-navy-700 dark:text-navy-200 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-navy-900 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-navy-50 dark:bg-navy-500/10 text-navy-700 dark:text-navy-400'
                          : 'text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full"
                  >
                    <MessageCircle className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                    WhatsApp
                  </a>
                  <Link to="/contact?consultation=true" className="btn-primary w-full">
                    <CalendarCheck className="w-4 h-4" />
                    Get Free Consultation
                  </Link>
                </div>
                <p className="mt-6 text-sm text-navy-400 dark:text-navy-500 text-center">{COMPANY.email}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
