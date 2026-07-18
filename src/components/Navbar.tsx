import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarCheck, Boxes, Shield } from 'lucide-react';
import { COMPANY } from '../lib/constants';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Algo-Software', path: '/Algo-Software' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-gray-900">
                Datacraftr<span className="text-brand-600">.ai</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-2.5 xl:px-3 py-2 text-[13px] whitespace-nowrap ${
                    isActive(link.path) ? 'text-brand-600 font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => navigate('/contact?consultation=true')}
                className="btn-primary text-sm py-2.5"
              >
                <CalendarCheck className="w-4 h-4" />
                Get Free Consultation
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
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
            <div className="absolute inset-0 bg-gray-50/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.label === 'Admin' && <Shield className="w-4 h-4" />}
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/contact?consultation=true" className="btn-primary w-full">
                    <CalendarCheck className="w-4 h-4" />
                    Get Free Consultation
                  </Link>
                </div>
                <p className="mt-6 text-sm text-gray-400 text-center">{COMPANY.email}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
