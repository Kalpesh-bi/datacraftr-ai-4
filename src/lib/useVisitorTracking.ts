import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SESSION_ID_KEY = 'datacraftr_session_id';
const TRACKING_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visitor`;

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera')) return 'Opera';
  return 'Other';
}

function detectOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || /iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'Other';
}

function detectDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobile|Android|iPhone/.test(ua)) return 'mobile';
  if (/iPad|Tablet/.test(ua)) return 'tablet';
  return 'desktop';
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || null,
    utmMedium: params.get('utm_medium') || null,
    utmCampaign: params.get('utm_campaign') || null,
  };
}

function getReferrerSource(): string {
  const referrer = document.referrer;
  if (!referrer) return 'direct';
  try {
    const host = new URL(referrer).hostname;
    if (host.includes('google')) return 'Google';
    if (host.includes('facebook')) return 'Facebook';
    if (host.includes('twitter') || host.includes('x.com')) return 'Twitter/X';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('instagram')) return 'Instagram';
    return host;
  } catch {
    return 'direct';
  }
}

async function track(action: string, extra: Record<string, any> = {}) {
  try {
    await fetch(TRACKING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ action, ...extra }),
    });
  } catch {
    // Silent fail — tracking should never break the site
  }
}

export function useVisitorTracking() {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const maxScrollRef = useRef(0);
  const sessionIdRef = useRef(getSessionId());

  // Start session on mount
  useEffect(() => {
    const sessionId = sessionIdRef.current;
    const sessionData = {
      browser: detectBrowser(),
      os: detectOS(),
      deviceType: detectDeviceType(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      referrerSource: getReferrerSource(),
      referrerUrl: document.referrer || null,
      ...getUtmParams(),
    };

    track('start', {
      sessionId,
      pagePath: window.location.pathname,
      pageTitle: document.title,
      sessionData,
    });

    startTimeRef.current = Date.now();

    // Track scroll depth
    const onScroll = () => {
      const scrolled = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrolled > maxScrollRef.current) {
        maxScrollRef.current = Math.min(scrolled, 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // End session on page unload
    const onBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      track('end', {
        sessionId,
        durationSeconds: duration,
        scrollDepth: maxScrollRef.current,
      });
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    // Periodic updates (every 30 seconds)
    const interval = setInterval(() => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      track('update', {
        sessionId,
        durationSeconds: duration,
        scrollDepth: maxScrollRef.current,
      });
    }, 30000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onBeforeUnload);
      clearInterval(interval);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    const sessionId = sessionIdRef.current;
    track('pageview', {
      sessionId,
      pagePath: location.pathname,
      pageTitle: document.title,
    });
  }, [location.pathname]);
}
