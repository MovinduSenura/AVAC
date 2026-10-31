// Lets an admin create, remove and reset the password of staff accounts
// from the admin dashboard. Creating Auth users needs the service role key,
// which must never be in the browser, so this runs as an Edge Function.
//
// Body: { action: "create", email, password, full_name, role }
//       { action: "delete", user_id }
//       { action: "reset_password", user_id, password }

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return json({ error: "Please sign in again." }, 401);

  const { data: caller } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (caller?.role !== "admin") {
    return json({ error: "Only admins can manage staff." }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  if (body.action === "create") {
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const fullName = String(body.full_name ?? "").trim();
    const role = body.role === "admin" ? "admin" : "staff";

    if (!EMAIL_PATTERN.test(email)) return json({ error: "Enter a valid email address." }, 400);
    if (password.length < 8) return json({ error: "Password must be at least 8 characters." }, 400);
    if (!fullName) return json({ error: "Enter the staff member's name." }, 400);

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error || !data.user) return json({ error: error?.message ?? "Could not create user." }, 400);

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, email, full_name: fullName, role });
    if (profileError) {
      await supabase.auth.admin.deleteUser(data.user.id);
      return json({ error: profileError.message }, 500);
    }

    return json({ ok: true });
  }

  const userId = String(body.user_id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json({ error: "Invalid user id" }, 400);

  if (body.action === "delete") {
    if (userId === user.id) return json({ error: "You can't remove your own account." }, 400);
    // Deleting the Auth user also deletes the profile (on delete cascade).
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  if (body.action === "reset_password") {
    const password = String(body.password ?? "");
    if (password.length < 8) return json({ error: "Password must be at least 8 characters." }, 400);
    const { error } = await supabase.auth.admin.updateUserById(userId, { password });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});
