import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const getPackFieldReports: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('field_reports')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (error) { res.status(400).json({ data: [], error: error.message }); return; }
    res.json({ data: data || [] });
  } catch {
    res.status(500).json({ data: [], error: 'Failed to fetch field reports' });
  }
};
