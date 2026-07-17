import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Check, CalendarCheck, Globe, Clock, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { COMPANY, WHATSAPP_LINK, BUSINESS_HOURS, RESPONSE_TIME } from '../lib/constants';
import { services as serviceList } from '../lib/data';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const isConsultation = searchParams.get('consultation') === 'true';

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service_interest: '',
    preferred_date: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mode, setMode] = useState<'contact' | 'consultation'>(isConsultation ? 'consultation' : 'contact');

  useEffect(() => {
    setMode(isConsultation ? 'consultation' : 'contact');
  }, [isConsultation]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const table = mode === 'consultation' ? 'consultation_requests' : 'contact_submissions';
    const payload = mode === 'consultation'
      ? { name: form.name, email: form.email, company: form.company, phone: form.phone, service_interest: form.service_interest, preferred_date: form.preferred_date || null, message: form.message }
      : { name: form.name, email: form.email, company: form.company, phone: form.phone, message: form.message, service_interest: form.service_interest };
    const { error } = await supabase.from(table).insert(payload);
    setStatus(error ? 'error' : 'success');
    if (!error) setForm({ name: '', email: '', company: '', phone: '', message: '', service_interest: '', preferred_date: '' });
  };

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
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance"
          >
            Let's build something great
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Tell us about your project and we'll get back to you {RESPONSE_TIME.toLowerCase()}. Or book a free consultation — no strings attached.
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-padding bg-white dark:bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-brand-500/10 flex items-center justify-center"><Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" /></div>
                    {COMPANY.email}
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-brand-500/10 flex items-center justify-center"><Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" /></div>
                    {COMPANY.phone}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-brand-500/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" /></div>
                    {COMPANY.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-brand-500/10 flex items-center justify-center"><Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" /></div>
                    {COMPANY.serviceCoverage}
                  </div>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline w-full mt-5">
                  <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Business hours */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-display font-bold text-gray-900 dark:text-white">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {BUSINESS_HOURS.map((bh) => (
                    <div key={bh.day} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{bh.day}</span>
                      <span className={`font-medium ${bh.hours === 'Closed' ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{bh.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">Response time: <span className="font-semibold text-gray-900 dark:text-white">{RESPONSE_TIME}</span></span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="card p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
                <h3 className="font-display font-bold mb-2">Prefer to talk now?</h3>
                <p className="text-sm text-brand-50 mb-4">Message us on WhatsApp and we'll respond right away.</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </a>
              </div>
            </div>

            {/* Form + Map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6 lg:p-8">
                {/* Mode toggle */}
                <div className="flex gap-2 mb-6 p-1 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => setMode('contact')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'contact' ? 'bg-white dark:bg-brand-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    <Mail className="w-4 h-4 inline mr-1.5" />
                    Contact
                  </button>
                  <button
                    onClick={() => setMode('consultation')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'consultation' ? 'bg-white dark:bg-brand-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    <CalendarCheck className="w-4 h-4 inline mr-1.5" />
                    Free Consultation
                  </button>
                </div>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-2">
                      {mode === 'consultation' ? 'Consultation request sent!' : 'Message sent!'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      We'll get back to you {RESPONSE_TIME.toLowerCase()}. Check your email for confirmation.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-outline">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Full Name *</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Email *</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Company</label>
                        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Phone</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Service of Interest</label>
                        <select value={form.service_interest} onChange={(e) => setForm({ ...form, service_interest: e.target.value })} className="input-field">
                          <option value="">Select a service</option>
                          {serviceList.map((s) => (
                            <option key={s.slug} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                      {mode === 'consultation' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Preferred Date</label>
                          <input type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} className="input-field" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                        {mode === 'consultation' ? 'Tell us about your project *' : 'Message *'}
                      </label>
                      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input-field resize-none" />
                    </div>
                    {status === 'error' && (
                      <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
                    )}
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                      <Send className="w-4 h-4" />
                      {status === 'loading' ? 'Sending...' : mode === 'consultation' ? 'Request Consultation' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              {/* Google Maps placeholder */}
              <div className="card overflow-hidden">
                <div className="relative h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <iframe
                    title="Datacraftr.ai Location — Jaipur, Rajasthan, India"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224907.432872!2d75.6504697!3d26.8854479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d4e54837ff%3A0x3a807d4f0f5a1e95!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{COMPANY.location}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{COMPANY.serviceCoverage} · {COMPANY.serviceCoverageSub}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
