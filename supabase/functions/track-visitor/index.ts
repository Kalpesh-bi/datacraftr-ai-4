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
    const body = await req.json();
    const { action, sessionId, pagePath, pageTitle, scrollDepth, durationSeconds, sessionData } = body;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "start") {
      // Check if session already exists
      const { data: existing } = await supabase
        .from("visitor_sessions")
        .select("id, session_id, is_returning")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (existing) {
        // Returning visitor — update session
        await supabase
          .from("visitor_sessions")
          .update({
            is_active: true,
            is_returning: true,
            session_end: null,
            entry_page: pagePath,
            exit_page: pagePath,
            pages_viewed: (await supabase.from("page_views").select("id", { count: "exact", head: true }).eq("session_id", sessionId)).count || 1,
          })
          .eq("session_id", sessionId);
      } else {
        // New visitor — insert session
        await supabase.from("visitor_sessions").insert({
          session_id: sessionId,
          ip_address: sessionData?.ipAddress || null,
          country: sessionData?.country || null,
          region: sessionData?.region || null,
          city: sessionData?.city || null,
          browser: sessionData?.browser || null,
          os: sessionData?.os || null,
          device_type: sessionData?.deviceType || null,
          screen_resolution: sessionData?.screenResolution || null,
          language: sessionData?.language || null,
          referrer_source: sessionData?.referrerSource || null,
          referrer_url: sessionData?.referrerUrl || null,
          utm_source: sessionData?.utmSource || null,
          utm_medium: sessionData?.utmMedium || null,
          utm_campaign: sessionData?.utmCampaign || null,
          entry_page: pagePath,
          exit_page: pagePath,
          is_active: true,
          is_returning: false,
        });
      }

      // Insert page view
      await supabase.from("page_views").insert({
        session_id: sessionId,
        page_path: pagePath,
        page_title: pageTitle,
      });

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "pageview") {
      // Update exit page and increment page count
      await supabase
        .from("visitor_sessions")
        .update({ exit_page: pagePath })
        .eq("session_id", sessionId);

      await supabase.from("page_views").insert({
        session_id: sessionId,
        page_path: pagePath,
        page_title: pageTitle,
      });

      // Update pages_viewed count
      const { count } = await supabase
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .eq("session_id", sessionId);

      await supabase
        .from("visitor_sessions")
        .update({ pages_viewed: count || 1 })
        .eq("session_id", sessionId);

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update") {
      const updateData: any = {};
      if (scrollDepth !== undefined) updateData.scroll_depth = scrollDepth;
      if (durationSeconds !== undefined) updateData.duration_seconds = durationSeconds;

      if (Object.keys(updateData).length > 0) {
        await supabase
          .from("visitor_sessions")
          .update(updateData)
          .eq("session_id", sessionId);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "end") {
      const duration = durationSeconds || 0;
      await supabase
        .from("visitor_sessions")
        .update({
          is_active: false,
          session_end: new Date().toISOString(),
          duration_seconds: duration,
          scroll_depth: scrollDepth || 0,
        })
        .eq("session_id", sessionId);

      return new Response(
        JSON.stringify({ success: true }),
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
