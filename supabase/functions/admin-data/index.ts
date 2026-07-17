import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "overview";
    const startDate = url.searchParams.get("start");
    const endDate = url.searchParams.get("end");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let dateFilter = "";
    const params: string[] = [];
    if (startDate && endDate) {
      dateFilter = `created_at >= '${startDate}' AND created_at <= '${endDate}'`;
    }

    if (action === "overview") {
      // Get all analytics data in parallel
      const [
        sessionsRes,
        activeSessionsRes,
        pageViewsRes,
        contactsRes,
        consultationsRes,
        demosRes,
        newsletterRes,
      ] = await Promise.all([
        supabase.from("visitor_sessions").select("id, is_returning, is_active, device_type, browser, os, country, city, session_start, duration_seconds"),
        supabase.from("visitor_sessions").select("id, session_id, entry_page, session_start, country, city, browser, os, device_type, screen_resolution, referrer_source, utm_source, utm_medium, utm_campaign").eq("is_active", true).order("session_start", { ascending: false }).limit(50),
        supabase.from("page_views").select("id, session_id, page_path, page_title, duration_seconds, scroll_depth, viewed_at"),
        supabase.from("contact_submissions").select("*"),
        supabase.from("consultation_requests").select("*"),
        supabase.from("demo_requests").select("*"),
        supabase.from("newsletter_subscribers").select("*"),
      ]);

      const sessions = sessionsRes.data || [];
      const activeSessions = activeSessionsRes.data || [];
      const pageViews = pageViewsRes.data || [];
      const contacts = contactsRes.data || [];
      const consultations = consultationsRes.data || [];
      const demos = demosRes.data || [];
      const newsletter = newsletterRes.data || [];

      // Calculate stats
      const totalVisitors = sessions.length;
      const activeVisitors = activeSessions.length;
      const totalPageViews = pageViews.length;
      const returningVisitors = sessions.filter(s => s.is_returning).length;
      const newVisitors = totalVisitors - returningVisitors;

      // Average session duration
      const durations = sessions.filter(s => s.duration_seconds).map(s => s.duration_seconds);
      const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

      // Bounce rate (sessions with only 1 page viewed)
      const bounced = sessions.filter(s => s.pages_viewed === 1).length;
      const bounceRate = totalVisitors > 0 ? Math.round((bounced / totalVisitors) * 100) : 0;

      // Device breakdown
      const deviceBreakdown = {
        desktop: sessions.filter(s => s.device_type === "desktop").length,
        mobile: sessions.filter(s => s.device_type === "mobile").length,
        tablet: sessions.filter(s => s.device_type === "tablet").length,
      };

      // Browser breakdown
      const browserMap: Record<string, number> = {};
      sessions.forEach(s => { if (s.browser) browserMap[s.browser] = (browserMap[s.browser] || 0) + 1; });

      // OS breakdown
      const osMap: Record<string, number> = {};
      sessions.forEach(s => { if (s.os) osMap[s.os] = (osMap[s.os] || 0) + 1; });

      // Country breakdown
      const countryMap: Record<string, number> = {};
      sessions.forEach(s => { if (s.country) countryMap[s.country] = (countryMap[s.country] || 0) + 1; });

      // City breakdown
      const cityMap: Record<string, number> = {};
      sessions.forEach(s => { if (s.city) cityMap[s.city] = (cityMap[s.city] || 0) + 1; });

      // Top pages
      const pageMap: Record<string, number> = {};
      pageViews.forEach(pv => { if (pv.page_path) pageMap[pv.page_path] = (pageMap[pv.page_path] || 0) + 1; });
      const topPages = Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

      // Daily visitors (last 30 days)
      const dailyMap: Record<string, number> = {};
      sessions.forEach(s => {
        const day = new Date(s.session_start).toISOString().split("T")[0];
        dailyMap[day] = (dailyMap[day] || 0) + 1;
      });
      const dailyVisitors = Object.entries(dailyMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-30);

      // Traffic sources
      const sourceMap: Record<string, number> = {};
      sessions.forEach(s => {
        const src = s.referrer_source || "direct";
        sourceMap[src] = (sourceMap[src] || 0) + 1;
      });

      return new Response(
        JSON.stringify({
          stats: {
            totalVisitors,
            activeVisitors,
            totalSessions: totalVisitors,
            totalPageViews,
            avgSessionDuration: avgDuration,
            bounceRate,
            returningVisitors,
            newVisitors,
            totalContacts: contacts.length,
            totalConsultations: consultations.length,
            totalDemos: demos.length,
            totalNewsletter: newsletter.length,
            whatsappClicks: 0,
          },
          deviceBreakdown,
          browserBreakdown: Object.entries(browserMap).sort((a, b) => b[1] - a[1]),
          osBreakdown: Object.entries(osMap).sort((a, b) => b[1] - a[1]),
          countryBreakdown: Object.entries(countryMap).sort((a, b) => b[1] - a[1]),
          cityBreakdown: Object.entries(cityMap).sort((a, b) => b[1] - a[1]),
          topPages,
          dailyVisitors,
          trafficSources: Object.entries(sourceMap).sort((a, b) => b[1] - a[1]),
          liveVisitors: activeSessions,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "leads") {
      const leadType = url.searchParams.get("type") || "all";
      let leads: any[] = [];

      if (leadType === "contacts" || leadType === "all") {
        const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
        if (data) leads = leads.concat(data.map((d: any) => ({ ...d, lead_type: "contact" })));
      }
      if (leadType === "consultations" || leadType === "all") {
        const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false });
        if (data) leads = leads.concat(data.map((d: any) => ({ ...d, lead_type: "consultation" })));
      }

      leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return new Response(
        JSON.stringify({ leads }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update-lead-status") {
      const { lead_type, lead_id, status } = await req.json();
      const table = lead_type === "contact" ? "contact_submissions" : "consultation_requests";

      const { error } = await supabase.from(table).update({ status }).eq("id", lead_id);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "visitors") {
      const { data } = await supabase.from("visitor_sessions").select("*").order("session_start", { ascending: false }).limit(100);
      return new Response(
        JSON.stringify({ visitors: data || [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
