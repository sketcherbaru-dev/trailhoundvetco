import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const supabaseUrl = process.env.SUPABASE_URL || 'https://trotdspbkfvjbjcymxjp.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb3Rkc3Bia2Z2amJqY3lteGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzM4ODIsImV4cCI6MjA5NjEwOTg4Mn0.ZQezFdLMI7-1MZz7DgwPkqNwFfJKc-bBJurSKr2s7OQ';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;

const authOptions = {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
};

// Anon client for client-side queries (respects RLS)
export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: authOptions,
  realtime: { transport: ws as any },
});

// Service role client for admin operations (bypasses RLS)
export const supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: authOptions,
  realtime: { transport: ws as any },
});
