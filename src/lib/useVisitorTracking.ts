import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SESSION_ID_KEY = 'datacraftr_session_id';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const TRACKING_URL =
  `${SUPABASE_URL}/functions/v1/track-visitor`;

const LOCATION_URL =
  `${SUPABASE_URL}/functions/v1/visitor-location`;

/* =========================================================
   SESSION ID
========================================================= */

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_ID_KEY);

  if (!id) {
    id = `s_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 11)}`;

    sessionStorage.setItem(
      SESSION_ID_KEY,
      id
    );
  }

  return id;
}

/* =========================================================
   BROWSER DETECTION
========================================================= */

function detectBrowser(): string {
  const ua = navigator.userAgent;

  if (ua.includes('Edg')) {
    return 'Edge';
  }

  if (ua.includes('Chrome')) {
    return 'Chrome';
  }

  if (ua.includes('Firefox')) {
    return 'Firefox';
  }

  if (ua.includes('Safari')) {
    return 'Safari';
  }

  if (ua.includes('Opera')) {
    return 'Opera';
  }

  return 'Other';
}

/* =========================================================
   OPERATING SYSTEM
========================================================= */

function detectOS(): string {
  const ua = navigator.userAgent;

  if (ua.includes('Win')) {
    return 'Windows';
  }

  if (ua.includes('Mac')) {
    return 'macOS';
  }

  if (ua.includes('Android')) {
    return 'Android';
  }

  if (
    ua.includes('iOS') ||
    /iPhone|iPad|iPod/.test(ua)
  ) {
    return 'iOS';
  }

  if (ua.includes('Linux')) {
    return 'Linux';
  }

  return 'Other';
}

/* =========================================================
   DEVICE TYPE
========================================================= */

function detectDeviceType(): string {
  const ua = navigator.userAgent;

  if (
    /Mobile|Android|iPhone/.test(ua)
  ) {
    return 'mobile';
  }

  if (
    /iPad|Tablet/.test(ua)
  ) {
    return 'tablet';
  }

  return 'desktop';
}

/* =========================================================
   UTM PARAMETERS
========================================================= */

function getUtmParams() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  return {
    utmSource:
      params.get('utm_source') || null,

    utmMedium:
      params.get('utm_medium') || null,

    utmCampaign:
      params.get('utm_campaign') || null,
  };
}

/* =========================================================
   REFERRER SOURCE
========================================================= */

function getReferrerSource(): string {
  const referrer =
    document.referrer;

  if (!referrer) {
    return 'direct';
  }

  try {
    const host =
      new URL(referrer).hostname;

    if (host.includes('google')) {
      return 'Google';
    }

    if (host.includes('facebook')) {
      return 'Facebook';
    }

    if (
      host.includes('twitter') ||
      host.includes('x.com')
    ) {
      return 'Twitter/X';
    }

    if (host.includes('linkedin')) {
      return 'LinkedIn';
    }

    if (host.includes('instagram')) {
      return 'Instagram';
    }

    return host;
  } catch {
    return 'direct';
  }
}

/* =========================================================
   GENERAL ANALYTICS TRACKING
========================================================= */

async function track(
  action: string,
  extra: Record<string, unknown> = {}
) {
  try {
    await fetch(
      TRACKING_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${SUPABASE_ANON_KEY}`,

          apikey:
            SUPABASE_ANON_KEY,
        },

        body: JSON.stringify({
          action,
          ...extra,
        }),
      }
    );
  } catch (error) {
    console.warn(
      'Analytics tracking failed:',
      error
    );
  }
}

/* =========================================================
   VISITOR LOCATION

   Priority:

   1. Browser GPS/location
   2. IP location fallback

   Exact browser location requires
   visitor permission.
========================================================= */

async function trackVisitorLocation(
  sessionId: string
) {
  const LOCATION_TRACKED_KEY =
    `datacraftr_location_${sessionId}`;

  /*
   * Avoid repeatedly asking for
   * location during same session.
   */

  if (
    sessionStorage.getItem(
      LOCATION_TRACKED_KEY
    )
  ) {
    return;
  }

  /*
   * Send coordinates or request
   * IP fallback from Edge Function.
   */

  const sendLocation =
    async (
      latitude?: number,
      longitude?: number,
      accuracy?: number
    ) => {
      try {
        const hasCoordinates =
          typeof latitude === 'number' &&
          typeof longitude === 'number';

        const response =
          await fetch(
            LOCATION_URL,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                visitorId:
                  sessionId,

                sessionId,

                latitude:
                  hasCoordinates
                    ? latitude
                    : null,

                longitude:
                  hasCoordinates
                    ? longitude
                    : null,

                accuracy:
                  typeof accuracy ===
                  'number'
                    ? accuracy
                    : null,

                locationSource:
                  hasCoordinates
                    ? 'gps'
                    : 'ip',
              }),
            }
          );

        if (!response.ok) {
          console.warn(
            'Visitor location request failed:',
            response.status
          );

          return;
        }

        const result =
          await response.json();

        if (result.success) {
          sessionStorage.setItem(
            LOCATION_TRACKED_KEY,
            'true'
          );

          console.log(
            'Visitor location captured:',
            result
          );
        }
      } catch (error) {
        console.warn(
          'Visitor location tracking failed:',
          error
        );
      }
    };

  /*
   * Browser does not support
   * geolocation -> IP fallback
   */

  if (!navigator.geolocation) {
    await sendLocation();

    return;
  }

  /*
   * Request browser location.
   */

  navigator.geolocation
    .getCurrentPosition(
      /*
       * LOCATION ALLOWED
       */

      async (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        console.log(
          'Browser location received:',
          {
            latitude,
            longitude,
            accuracy,
          }
        );

        await sendLocation(
          latitude,
          longitude,
          accuracy
        );
      },

      /*
       * LOCATION DENIED,
       * TIMEOUT OR UNAVAILABLE
       *
       * Use IP fallback.
       */

      async (error) => {
        console.warn(
          'Browser location unavailable:',
          error.message
        );

        await sendLocation();
      },

      /*
       * GPS OPTIONS
       */

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 300000,
      }
    );
}

/* =========================================================
   MAIN VISITOR TRACKING HOOK
========================================================= */

export function useVisitorTracking() {
  const location =
    useLocation();

  const startTimeRef =
    useRef(Date.now());

  const maxScrollRef =
    useRef(0);

  const sessionIdRef =
    useRef(
      getSessionId()
    );

  /* =======================================================
     START SESSION
  ======================================================= */

  useEffect(() => {
    const sessionId =
      sessionIdRef.current;

    const sessionData = {
      browser:
        detectBrowser(),

      os:
        detectOS(),

      deviceType:
        detectDeviceType(),

      screenResolution:
        `${window.screen.width}x${window.screen.height}`,

      language:
        navigator.language,

      referrerSource:
        getReferrerSource(),

      referrerUrl:
        document.referrer || null,

      ...getUtmParams(),
    };

    /*
     * Start analytics session.
     */

    track(
      'start',
      {
        sessionId,

        pagePath:
          window.location.pathname,

        pageTitle:
          document.title,

        sessionData,
      }
    );

    /*
     * Capture visitor location.
     *
     * Browser location first.
     * IP fallback if unavailable.
     */

    trackVisitorLocation(
      sessionId
    );

    startTimeRef.current =
      Date.now();

    /* =====================================================
       SCROLL TRACKING
    ===================================================== */

    const onScroll = () => {
      const availableScroll =
        document
          .documentElement
          .scrollHeight -
        window.innerHeight;

      if (
        availableScroll <= 0
      ) {
        return;
      }

      const scrolled =
        Math.round(
          (
            window.scrollY /
            availableScroll
          ) *
            100
        );

      if (
        scrolled >
        maxScrollRef.current
      ) {
        maxScrollRef.current =
          Math.min(
            scrolled,
            100
          );
      }
    };

    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true,
      }
    );

    /* =====================================================
       END SESSION
    ===================================================== */

    const onBeforeUnload =
      () => {
        const duration =
          Math.round(
            (
              Date.now() -
              startTimeRef.current
            ) /
              1000
          );

        track(
          'end',
          {
            sessionId,

            durationSeconds:
              duration,

            scrollDepth:
              maxScrollRef.current,
          }
        );
      };

    window.addEventListener(
      'beforeunload',
      onBeforeUnload
    );

    /* =====================================================
       ACTIVE SESSION UPDATE

       Every 30 seconds
    ===================================================== */

    const interval =
      window.setInterval(
        () => {
          const duration =
            Math.round(
              (
                Date.now() -
                startTimeRef.current
              ) /
                1000
            );

          track(
            'update',
            {
              sessionId,

              durationSeconds:
                duration,

              scrollDepth:
                maxScrollRef.current,
            }
          );
        },

        30000
      );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );

      window.removeEventListener(
        'beforeunload',
        onBeforeUnload
      );

      window.clearInterval(
        interval
      );
    };
  }, []);

  /* =======================================================
     PAGE VIEW TRACKING
  ======================================================= */

  useEffect(() => {
    const sessionId =
      sessionIdRef.current;

    track(
      'pageview',
      {
        sessionId,

        pagePath:
          location.pathname,

        pageTitle:
          document.title,
      }
    );
  }, [location.pathname]);
}