// WhatsApp numbers
export const WHATSAPP_GENERAL = '918386074548'; // +91 83860 74548 — general enquiries
export const WHATSAPP_PREEMPTION = '918386074548'; // +91 83860 74548 — Preemption Algo

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_GENERAL}`;
export const CONTACT_EMAIL = 'datacraftr.ai21@mail.com';

export const COMPANY = {
  name: 'Datacraftr.ai',
  tagline: 'AI-Powered Software & Data Solutions',
  description:
    'We build intelligent software, automate operations, and turn data into growth for ambitious businesses.',
  phone: '+91 83860 74548',
  phonePreemption: '+91 83860 74548',
  email: CONTACT_EMAIL,
  location: 'Jaipur, Rajasthan, India',
  serviceCoverage: 'Serving Clients Worldwide',
  serviceCoverageSub: 'Remote-First Digital Solutions · Available for Global Projects',
};

// Business hours
export const BUSINESS_HOURS = [
  { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM IST' },
  { day: 'Sunday', hours: 'Closed' },
];
export const RESPONSE_TIME = 'Within 24 hours';

// Company stats
export const COMPANY_STATS = {
  projectsDelivered: 12,
  teamMembers: 5,
  clientSatisfaction: 98,
  industriesServed: 12,
};

type WhatsAppContext = 'general' | 'preemption';

export function whatsappNumber(context: WhatsAppContext = 'general') {
  return context === 'preemption' ? WHATSAPP_PREEMPTION : WHATSAPP_GENERAL;
}

export function whatsappLink(message?: string, context: WhatsAppContext = 'general') {
  const num = whatsappNumber(context);
  const defaultMessage = "Hi, I'm interested in your services. Please share more details.";
  return `https://wa.me/${num}?text=${encodeURIComponent(message || defaultMessage)}`;
}

export function consultationLink(service?: string, context: WhatsAppContext = 'general') {
  const msg = service
    ? `Hi, I'm interested in your services. Please share more details about ${service}.`
    : "Hi, I'm interested in your services. Please share more details.";
  return whatsappLink(msg, context);
}
