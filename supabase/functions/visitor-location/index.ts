import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req: Request) => {
  // Handle browser CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return response(
      {
        success: false,
        error: `Method ${req.method} not allowed`,
      },
      405
    );
  }

  try {
    /* =====================================================
       SUPABASE CONNECTION
    ===================================================== */

    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      throw new Error(
        "Supabase environment variables are missing"
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    let body: {
      sessionId?: string;
      visitorId?: string;
      latitude?: number | null;
      longitude?: number | null;
      accuracy?: number | null;
      locationSource?: string;
    } = {};

    try {
      body = await req.json();
    } catch {
      return response(
        {
          success: false,
          error: "Invalid JSON body",
        },
        400
      );
    }

    const visitorId =
      body.sessionId ||
      body.visitorId;

    if (!visitorId) {
      return response(
        {
          success: false,
          error:
            "Missing visitor/session ID",
        },
        400
      );
    }

    /* =====================================================
       GET VISITOR IP
    ===================================================== */

    const forwardedFor =
      req.headers.get(
        "x-forwarded-for"
      );

    let ip =
      forwardedFor
        ?.split(",")[0]
        ?.trim() ||
      req.headers.get(
        "cf-connecting-ip"
      ) ||
      req.headers.get(
        "x-real-ip"
      ) ||
      null;

    if (
      ip?.startsWith("::ffff:")
    ) {
      ip = ip.replace(
        "::ffff:",
        ""
      );
    }

    console.log(
      "Visitor:",
      visitorId
    );

    console.log(
      "Detected IP:",
      ip
    );

    /* =====================================================
       LOCATION OBJECT
    ===================================================== */

    let location = {
      city:
        null as string | null,

      region:
        null as string | null,

      country:
        null as string | null,

      country_code:
        null as string | null,

      latitude:
        null as number | null,

      longitude:
        null as number | null,

      accuracy:
        null as number | null,

      source:
        "ip",
    };

    /* =====================================================
       OPTION 1:
       GPS / BROWSER LOCATION

       Used when visitor clicks Allow.
    ===================================================== */

    const hasGpsCoordinates =
      typeof body.latitude ===
        "number" &&
      Number.isFinite(
        body.latitude
      ) &&
      typeof body.longitude ===
        "number" &&
      Number.isFinite(
        body.longitude
      );

    if (hasGpsCoordinates) {
      const latitude =
        body.latitude as number;

      const longitude =
        body.longitude as number;

      console.log(
        "Using browser GPS:",
        latitude,
        longitude
      );

      location.latitude =
        latitude;

      location.longitude =
        longitude;

      location.accuracy =
        typeof body.accuracy ===
        "number"
          ? body.accuracy
          : null;

      location.source =
        "gps";

      /*
       * Reverse geocode GPS coordinates
       * using OpenStreetMap Nominatim.
       */

      try {
        const reverseUrl =
          `https://nominatim.openstreetmap.org/reverse` +
          `?format=jsonv2` +
          `&lat=${encodeURIComponent(latitude)}` +
          `&lon=${encodeURIComponent(longitude)}` +
          `&zoom=10` +
          `&addressdetails=1`;

        const reverseResponse =
          await fetch(
            reverseUrl,
            {
              headers: {
                "User-Agent":
                  "Datacraftr.ai/1.0",
                "Accept-Language":
                  "en",
              },
            }
          );

        if (
          reverseResponse.ok
        ) {
          const geo =
            await reverseResponse.json();

          const address =
            geo.address || {};

          /*
           * Different countries use
           * different address fields.
           */

          location.city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            null;

          location.region =
            address.state ||
            address.region ||
            address.state_district ||
            null;

          location.country =
            address.country ||
            null;

          location.country_code =
            address.country_code
              ? String(
                  address.country_code
                ).toUpperCase()
              : null;

          console.log(
            "GPS reverse geocode:",
            location
          );
        } else {
          console.error(
            "Reverse geocoding failed:",
            reverseResponse.status
          );
        }
      } catch (
        reverseGeoError
      ) {
        console.error(
          "GPS reverse geocoding error:",
          reverseGeoError
        );
      }
    }

    /* =====================================================
       OPTION 2:
       IP LOCATION FALLBACK

       Only used when GPS coordinates
       were NOT supplied.
    ===================================================== */

    if (
      !hasGpsCoordinates &&
      ip
    ) {
      try {
        console.log(
          "Using IP location fallback"
        );

        const geoResponse =
          await fetch(
            `https://ipwho.is/${encodeURIComponent(
              ip
            )}`
          );

        if (
          geoResponse.ok
        ) {
          const geo =
            await geoResponse.json();

          if (
            geo.success !== false
          ) {
            location = {
              city:
                geo.city ||
                null,

              region:
                geo.region ||
                null,

              country:
                geo.country ||
                null,

              country_code:
                geo.country_code ||
                null,

              latitude:
                typeof geo.latitude ===
                "number"
                  ? geo.latitude
                  : null,

              longitude:
                typeof geo.longitude ===
                "number"
                  ? geo.longitude
                  : null,

              accuracy:
                null,

              source:
                "ip",
            };
          }
        }
      } catch (
        geoError
      ) {
        console.error(
          "IP geolocation failed:",
          geoError
        );
      }
    }

    /* =====================================================
       FIND EXISTING VISITOR
    ===================================================== */

    const {
      data: existing,
      error: selectError,
    } =
      await supabase
        .from(
          "visitor_locations"
        )
        .select("id")
        .eq(
          "visitor_id",
          visitorId
        )
        .maybeSingle();

    if (selectError) {
      throw selectError;
    }

    /* =====================================================
       DATABASE RECORD
    ===================================================== */

    const record = {
      ip_address:
        ip,

      city:
        location.city,

      region:
        location.region,

      country:
        location.country,

      country_code:
        location.country_code,

      latitude:
        location.latitude,

      longitude:
        location.longitude,

      last_seen:
        new Date().toISOString(),
    };

    /* =====================================================
       UPDATE OR INSERT
    ===================================================== */

    if (existing) {
      const {
        error: updateError,
      } =
        await supabase
          .from(
            "visitor_locations"
          )
          .update(record)
          .eq(
            "visitor_id",
            visitorId
          );

      if (updateError) {
        throw updateError;
      }
    } else {
      const {
        error: insertError,
      } =
        await supabase
          .from(
            "visitor_locations"
          )
          .insert({
            visitor_id:
              visitorId,

            ...record,
          });

      if (insertError) {
        throw insertError;
      }
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return response({
      success: true,

      visitorId,

      locationSource:
        location.source,

      locationAccuracy:
        location.accuracy,

      location: {
        city:
          location.city,

        region:
          location.region,

        country:
          location.country,

        countryCode:
          location.country_code,

        latitude:
          location.latitude,

        longitude:
          location.longitude,
      },
    });
  } catch (error) {
    console.error(
      "Visitor location error:",
      error
    );

    return response(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      500
    );
  }
});