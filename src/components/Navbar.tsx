import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarCheck, Boxes, Shield } from 'lucide-react';
import { COMPANY } from '../lib/constants';

type NavLink = {
  label: string;
  path: string;
  external?: boolean;
  disabled?: boolean;
};

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Algo Software', path: '/software' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Pricing', path: '/pricing' },

  // Development URL
{
  label: '🚀 AI Studio',
  path: '',
  disabled: true,
},

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
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-sm'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Boxes className="w-5 h-5 text-white" />
              </div>

              <span className="font-display font-bold text-lg text-gray-900">
                Datacraftr
                <span className="text-brand-600">.ai</span>
              </span>
            </Link>

            {/* Desktop Navigation */}

<div className="hidden lg:flex items-center gap-1">
  {navLinks.map((link) =>
    link.disabled ? (
      <div
        key={link.label}
        className="relative flex flex-col items-center px-3 py-2 cursor-not-allowed"
      >
        <span className="absolute -top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
          Coming Soon
        </span>

        <span className="text-gray-500 font-medium">
          {link.label}
        </span>
      </div>
    ) : link.external ? (
      <a
        key={link.label}
        href={link.path}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link px-3 py-2"
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.label}
        to={link.path}
        className="nav-link px-3 py-2"
      >
        {link.label}
      </Link>
    )
  )}
</div>

            {/* Right Side */}

            <div className="hidden lg:flex items-center gap-2">

              <button
                onClick={() =>
                  navigate('/contact?consultation=true')
                }
                className="btn-primary text-sm py-2.5"
              >
                <CalendarCheck className="w-4 h-4" />
                Get Free Consultation
              </button>

            </div>

            {/* Mobile Menu Button */}

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 28,
              }}
            >

<div className="p-6 pt-20">

  <div className="flex flex-col gap-1">
    {navLinks.map((link) => {
      if (link.disabled) {
        return (
          <div
            key={link.label}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
          >
            <span className="text-gray-500 font-medium">{link.label}</span>
            <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
              Coming Soon
            </span>
          </div>
        );
      }

      if (link.external) {
        return (
          <a
            key={link.label}
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {link.label}
          </a>
        );
      }

      return (
        <Link
          key={link.label}
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
      );
    })}
  </div>

  <div className="mt-6">
    <Link to="/contact?consultation=true" className="btn-primary w-full">
      <CalendarCheck className="w-4 h-4" />
      Get Free Consultation
    </Link>
  </div>

  <p className="mt-6 text-center text-sm text-gray-400">
    {COMPANY.email}
  </p>

</div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}