import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const getHeroImages: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('hero_images')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .limit(6);

    if (error) { res.status(400).json({ data: [], error: error.message }); return; }
    res.json({ data: data || [] });
  } catch {
    res.status(500).json({ data: [], error: 'Failed to fetch hero images' });
  }
};
