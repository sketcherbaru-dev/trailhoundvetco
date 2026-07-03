import { createClient } from "@supabase/supabase-js";

// Public anon key — safe to expose in the browser (same key used server-side).
// Uses VITE_ env vars when provided, otherwise falls back to the project defaults.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://trotdspbkfvjbjcymxjp.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb3Rkc3Bia2Z2amJqY3lteGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzM4ODIsImV4cCI6MjA5NjEwOTg4Mn0.ZQezFdLMI7-1MZz7DgwPkqNwFfJKc-bBJurSKr2s7OQ";

export const supabaseBrowser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
