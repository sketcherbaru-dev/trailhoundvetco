import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. API routes will not work.');
}

// Anon client for client-side queries (respects RLS)
export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for admin operations (bypasses RLS)
export const supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey);
