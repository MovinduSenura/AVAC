import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// null when the env vars are missing, so the public site still renders
// (with its sample content) during local development.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend/.env",
    );
  }
  return supabase;
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateImage(file, maxMb) {
  if (!IMAGE_TYPES.includes(file.type)) {
    return "Please choose a JPG, PNG, WEBP or GIF image.";
  }
  if (file.size > maxMb * 1024 * 1024) {
    return `Please choose an image smaller than ${maxMb} MB.`;
  }
  return "";
}

// Uploads to a public bucket and returns the public URL.
export async function uploadImage(bucket, folder, file) {
  const client = requireSupabase();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
