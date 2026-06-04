import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const getPackTestimonials: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('pack_testimonials')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) { res.status(400).json({ data: [], error: error.message }); return; }
    res.json({ data: data || [] });
  } catch {
    res.status(500).json({ data: [], error: 'Failed to fetch testimonials' });
  }
};
