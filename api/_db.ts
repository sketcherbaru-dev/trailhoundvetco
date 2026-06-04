import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://trotdspbkfvjbjcymxjp.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb3Rkc3Bia2Z2amJqY3lteGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzM4ODIsImV4cCI6MjA5NjEwOTg4Mn0.ZQezFdLMI7-1MZz7DgwPkqNwFfJKc-bBJurSKr2s7OQ";

export const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
