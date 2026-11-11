// Sends the "new application" notification to AVA Consultants and a
// "thank you" email to the applicant, through Gmail SMTP.
//
// Called by the website right after an application is saved, with { id }.
// Each application can trigger emails only once, and only within 15 minutes
// of being created, so the public endpoint can't be used to send spam.
//
// Secrets (supabase secrets set ...):
//   GMAIL_USER          the Gmail address that sends the emails
//   GMAIL_APP_PASSWORD  a Google "App Password" for that account
//   NOTIFY_EMAIL        optional; who receives notifications (comma-separated).
//                       Defaults to GMAIL_USER.

import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SEND_WINDOW_MS = 15 * 60 * 1000;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]!);
}

function oneLine(value: unknown) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function row(label: string, value: unknown) {
  const text = escapeHtml(value || "-").replace(/\n/g, "<br>");
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#727272;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#1f1f1f">${text}</td>
  </tr>`;
}

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f1f1f">
    <div style="background:#a77c2c;color:#fff;padding:18px 24px;border-radius:12px 12px 0 0">
      <strong style="font-size:18px">AVA Consultants</strong>
    </div>
    <div style="border:1px solid #eee;border-top:0;padding:24px;border-radius:0 0 12px 12px">
      <h2 style="margin:0 0 16px;color:#a77c2c;font-size:20px">${title}</h2>
      ${body}
    </div>
  </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return json({ error: "Invalid application id" }, 400);
  }

  const gmailUser = Deno.env.get("GMAIL_USER");
  const gmailPassword = Deno.env.get("GMAIL_APP_PASSWORD");
  if (!gmailUser || !gmailPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD secrets are not set");
    return json({ error: "Email is not configured" }, 500);
  }
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || gmailUser;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  // Claim the application atomically so emails are sent at most once.
  const since = new Date(Date.now() - SEND_WINDOW_MS).toISOString();
  const { data: application, error: claimError } = await supabase
    .from("applications")
    .update({ emails_sent_at: new Date().toISOString() })
    .eq("id", id)
    .is("emails_sent_at", null)
    .gte("created_at", since)
    .select()
    .maybeSingle();

  if (claimError) {
    console.error(claimError);
    return json({ error: "Could not load application" }, 500);
  }
  if (!application) return json({ ok: true, skipped: true });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPassword },
  });
  const from = `"AVA Consultants" <${gmailUser}>`;

  const details = `<table style="border-collapse:collapse;width:100%;font-size:14px">
    ${row("Name", application.full_name)}
    ${row("Email", application.email)}
    ${row("Phone", application.phone)}
    ${row("Address", application.address)}
    ${row("Passport number", application.passport_number)}
    ${row("Passport expiry", application.passport_expiry)}
    ${row("Message", application.message)}
    ${row("Submitted from", application.source_page)}
  </table>`;

  try {
    await transporter.sendMail({
      from,
      to: notifyEmail,
      replyTo: oneLine(application.email),
      subject: `New application: ${oneLine(application.full_name)}`,
      html: layout(
        "New application received",
        `${details}<p style="margin-top:20px;font-size:13px;color:#727272">
          You can manage this application in the admin dashboard.</p>`,
      ),
    });

    await transporter.sendMail({
      from,
      to: oneLine(application.email),
      replyTo: notifyEmail.split(",")[0].trim(),
      subject: "We received your application - AVA Consultants",
      html: layout(
        `Thank you, ${escapeHtml(application.full_name)}!`,
        `<p style="font-size:14px;line-height:1.7">We have received your application.
          Our team will review your details and contact you soon.</p>
          <p style="font-size:14px;line-height:1.7">Here is a copy of what you sent us:</p>
          ${details}
          <p style="margin-top:20px;font-size:14px;line-height:1.7">Best regards,<br>AVA Consultants</p>`,
      ),
    });
  } catch (error) {
    console.error("Sending email failed", error);
    await supabase.from("applications").update({ emails_sent_at: null }).eq("id", id);
    return json({ error: "Email could not be sent" }, 502);
  }

  return json({ ok: true });
});
