import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder-service-key';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('⚠️  Supabase environment variables not set. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env to use API routes.');
}

// Anon client for client-side queries (respects RLS)
export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    transport: ws as any
  }
});

// Service role client for admin operations (bypasses RLS)
export const supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey, {
  realtime: {
    transport: ws as any
  }
});
