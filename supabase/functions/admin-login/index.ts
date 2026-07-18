import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(
  data: Record<string, unknown>,
  status = 200
) {
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

  // Only allow POST
  if (req.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed",
      },
      405
    );
  }

  try {
    // Read environment variables
    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Missing Supabase environment variables"
      );

      return jsonResponse(
        {
          success: false,
          error: "Server configuration error",
        },
        500
      );
    }

    // Read request body
    let body: {
      mobile?: string;
      password?: string;
    };

    try {
      body = await req.json();
    } catch {
      return jsonResponse(
        {
          success: false,
          error: "Invalid request body",
        },
        400
      );
    }

    const mobile =
      String(body.mobile || "").trim();

    const password =
      String(body.password || "").trim();

    if (!mobile || !password) {
      return jsonResponse(
        {
          success: false,
          error:
            "Mobile number and password are required",
        },
        400
      );
    }

    console.log(
      "Admin login attempt:",
      mobile
    );

    // Service-role client runs securely
    // inside the Edge Function
    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    // Find admin
    const {
      data: admin,
      error: databaseError,
    } = await supabase
      .from("admin_users")
      .select(
        "id, mobile, name, password_hash"
      )
      .eq("mobile", mobile)
      .maybeSingle();

    if (databaseError) {
      console.error(
        "Admin database error:",
        databaseError
      );

      return jsonResponse(
        {
          success: false,
          error: "Unable to process login",
        },
        500
      );
    }

    if (!admin) {
      console.warn(
        "Admin not found:",
        mobile
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Invalid mobile number or password",
        },
        401
      );
    }

    // Current password comparison
    // Works with your existing admin_users data
    const storedPassword =
      String(admin.password_hash || "").trim();

    if (storedPassword !== password) {
      console.warn(
        "Incorrect password for:",
        mobile
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Invalid mobile number or password",
        },
        401
      );
    }

    // Generate admin session token
    const token = crypto.randomUUID();

    console.log(
      "Admin login successful:",
      mobile
    );

    return jsonResponse({
      success: true,

      token,

      admin: {
        id: admin.id,
        mobile: admin.mobile,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error(
      "Admin login unexpected error:",
      error
    );

    return jsonResponse(
      {
        success: false,
        error: "Internal server error",
      },
      500
    );
  }
});