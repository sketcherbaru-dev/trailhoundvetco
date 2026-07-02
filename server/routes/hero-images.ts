import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const getHeroImages: RequestHandler = async (req, res) => {
  try {
    const page = (req.query.page as string) || 'home';
    const { data, error } = await supabaseAnonClient
      .from('hero_images')
      .select('*')
      .eq('active', true)
      .eq('page', page)
      .order('sort_order', { ascending: true, nullsFirst: false })
      .limit(6);

    if (error) { res.status(400).json({ data: [], error: error.message }); return; }
    res.json({ data: data || [] });
  } catch {
    res.status(500).json({ data: [], error: 'Failed to fetch hero images' });
  }
};
