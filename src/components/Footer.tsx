import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
} from 'lucide-react';

import {
  COMPANY,
  WHATSAPP_LINK,
  consultationLink,
} from '../lib/constants';

import { supabase } from '../lib/supabase';

const footerLinks = {
  Services: [
    {
      label: 'Website Development',
      path: '/services/website-development',
    },
    {
      label: 'E-commerce',
      path: '/services/ecommerce',
    },
    {
      label: 'AI Automation',
      path: '/services/ai-automation',
    },
    {
      label: 'Data Analytics & BI',
      path: '/services/data-analytics-bi',
    },
    {
      label: 'SEO & Digital Marketing',
      path: '/services/seo-digital-marketing',
    },
  ],

  Company: [
    {
      label: 'About Us',
      path: '/about',
    },
    {
      label: 'Portfolio',
      path: '/portfolio',
    },
    {
      label: 'Case Studies',
      path: '/case-studies',
    },
    {
      label: 'Pricing',
      path: '/pricing',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
  ],

  Software: [
    {
      label: 'Preemption Algo',
      path: '/software',
    },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        source: 'footer',
      });

    if (error) {
      // PostgreSQL duplicate/unique constraint error
      if (error.code === '23505') {
        setStatus('success');
      } else {
        setStatus('error');
      }

      return;
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-dark opacity-20" />

      <div
        className="
          absolute
          -top-40
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[400px]
          bg-brand-500/8
          blur-[120px]
          rounded-full
        "
      />

      <div className="relative container-custom px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* CTA Banner */}
        <div
          className="
            mb-16
            p-8
            lg:p-12
            rounded-3xl
            bg-gradient-to-r
            from-gray-800
            to-gray-900
            border
            border-gray-700
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          <div>
            <h3
              className="
                font-display
                text-2xl
                lg:text-3xl
                font-bold
                text-white
                mb-2
              "
            >
              Ready to build something great?
            </h3>

            <p className="text-gray-400">
              Get a free consultation and custom project roadmap — no strings
              attached.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">

            <Link
              to="/contact?consultation=true"
              className="btn-primary"
            >
              Book Free Consultation

              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={consultationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                border
                border-gray-600
                text-white
                font-semibold
                hover:bg-gray-800
                transition-all
              "
            >
              <MessageCircle className="w-4 h-4 text-brand-400" />

              Chat on WhatsApp
            </a>

          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">

            <Link
              to="/"
              className="flex items-center gap-2.5 mb-4"
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-gradient-to-br
                  from-brand-500
                  to-brand-700
                  flex
                  items-center
                  justify-center
                "
              >
                <Boxes className="w-5 h-5 text-white" />
              </div>

              <span className="font-display font-bold text-lg text-white">
                Datacraftr
                <span className="text-brand-400">
                  .ai
                </span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {COMPANY.description}
            </p>

            <div className="space-y-2.5 text-sm">

              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="
                  flex
                  items-center
                  gap-2
                  hover:text-brand-400
                  transition-colors
                "
              >
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />

                {COMPANY.email}
              </a>

              {/* Phone */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  hover:text-brand-400
                  transition-colors
                "
              >
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />

                {COMPANY.phone}
              </a>

              {/* Location */}
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />

                {COMPANY.location}
              </span>

              {/* Coverage */}
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400 flex-shrink-0" />

                {COMPANY.serviceCoverage}
              </span>

            </div>
          </div>

          {/* Footer Link Columns */}
          {Object.entries(footerLinks).map(
            ([heading, links]) => (

              <div key={heading}>

                <h4
                  className="
                    font-semibold
                    text-white
                    text-sm
                    uppercase
                    tracking-wider
                    mb-4
                  "
                >
                  {heading}
                </h4>

                <ul className="space-y-2.5">

                  {links.map((link) => (

                    <li key={link.label}>

                      <Link
                        to={link.path}
                        className="
                          text-sm
                          text-gray-400
                          hover:text-brand-400
                          transition-colors
                        "
                      >
                        {link.label}
                      </Link>

                    </li>

                  ))}

                </ul>

              </div>

            )
          )}

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">

            <h4
              className="
                font-semibold
                text-white
                text-sm
                uppercase
                tracking-wider
                mb-4
              "
            >
              Newsletter
            </h4>

            <p className="text-sm text-gray-400 mb-4">
              Get insights on AI, data, and growth — monthly.
            </p>

            <form
              onSubmit={subscribe}
              className="space-y-2"
            >

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="your@email.com"
                required
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  bg-gray-800
                  border
                  border-gray-700
                  text-white
                  text-sm
                  placeholder-gray-500
                  focus:outline-none
                  focus:border-brand-500/50
                  focus:ring-1
                  focus:ring-brand-500/30
                "
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  bg-brand-600
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-brand-700
                  transition-colors
                  disabled:opacity-50
                "
              >
                {status === 'loading'
                  ? 'Subscribing...'
                  : status === 'success'
                  ? 'Subscribed!'
                  : 'Subscribe'}
              </button>

              {status === 'error' && (
                <p className="text-xs text-red-400">
                  Something went wrong. Try again.
                </p>
              )}

            </form>

          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-16
            pt-8
            border-t
            border-gray-800
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Datacraftr.ai. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <Link
              to="/privacy"
              className="
                text-gray-500
                hover:text-brand-400
                transition-colors
              "
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="
                text-gray-500
                hover:text-brand-400
                transition-colors
              "
            >
              Terms &amp; Conditions
            </Link>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-1.5
                text-gray-500
                hover:text-brand-400
                transition-colors
              "
            >
              <MessageCircle className="w-4 h-4" />

              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}