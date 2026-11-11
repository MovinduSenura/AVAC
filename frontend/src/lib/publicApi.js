import { requireSupabase, supabase, uploadImage } from "./supabase";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

function emptyToNull(value) {
  const text = (value ?? "").toString().trim();
  return text ? text : null;
}

export async function submitApplication(fields, sourcePage) {
  const client = requireSupabase();
  // The id is generated here because visitors can insert but not read rows.
  const id = crypto.randomUUID();
  const { error } = await client.from("applications").insert({
    id,
    full_name: fields.fullName.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
    address: emptyToNull(fields.address),
    message: emptyToNull(fields.message),
    passport_number: emptyToNull(fields.passportNumber),
    passport_expiry: emptyToNull(fields.passportExpiry),
    source_page: sourcePage,
  });
  if (error) throw error;

  // The application is already saved; a failed email shouldn't fail the form.
  client.functions
    .invoke("send-application-email", { body: { id } })
    .catch(() => {});
}

export async function subscribe({ email, countries = [], source }) {
  const { error } = await requireSupabase().rpc("subscribe", {
    p_email: email.trim(),
    p_countries: countries,
    p_source: source,
  });
  if (error) throw error;
}

export async function submitTestimonial({ name, role, story, photoFile }) {
  const client = requireSupabase();
  const photoUrl = photoFile
    ? await uploadImage("testimonial-photos", "submissions", photoFile)
    : null;
  const { error } = await client.from("testimonials").insert({
    name,
    role,
    story,
    photo_url: photoUrl,
  });
  if (error) throw error;
}

// The fetch helpers return null when Supabase isn't configured or the
// request fails, so components can keep showing their sample content.

export async function fetchApprovedTestimonials() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("approved_testimonials")
    .select("id, name, role, story, photo_url")
    .order("created_at", { ascending: false });
  return error ? null : data;
}

export async function fetchPublishedPosts() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("published_posts")
    .select("*")
    .order("published_at", { ascending: false });
  return error ? null : data;
}

export async function fetchApprovedComments(postIds) {
  if (!supabase || postIds.length === 0) return [];
  const { data, error } = await supabase
    .from("approved_comments")
    .select("id, post_id, name, comment, created_at")
    .in("post_id", postIds)
    .order("created_at", { ascending: true });
  return error ? [] : data;
}

export async function submitComment({ postId, name, email, comment }) {
  const { error } = await requireSupabase().from("blog_comments").insert({
    post_id: postId,
    name,
    email,
    comment,
  });
  if (error) throw error;
}

export function formatPostDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
