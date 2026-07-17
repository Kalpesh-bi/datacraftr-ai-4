import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { mobile, password } = await req.json();

    console.log("========== ADMIN LOGIN ==========");
    console.log("Entered Mobile:", mobile);
    console.log("Entered Password:", password);

    if (!mobile || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Mobile number and password are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    console.log("Database Error:", error);
    console.log("Database Record:", data);

    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!data) {
      console.log("No admin found.");

      return new Response(
        JSON.stringify({
          success: false,
          error: "Admin not found",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Stored Password:", data.password_hash);

    if (String(data.password_hash).trim() !== String(password).trim()) {
      console.log("Password mismatch");

      return new Response(
        JSON.stringify({
          success: false,
          error: "Password incorrect",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const token = crypto.randomUUID();

    console.log("Login Successful");

    return new Response(
      JSON.stringify({
        success: true,
        token,
        admin: {
          id: data.id,
          mobile: data.mobile,
          name: data.name,
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Unexpected Error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});