import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const getShopHeroFeaturedProduct: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('products')
      .select('*')
      .eq('shop_hero_featured', true)
      .limit(1)
      .maybeSingle();

    if (error) { res.status(400).json({ data: null, error: error.message }); return; }
    res.json({ data: data || null });
  } catch {
    res.status(500).json({ data: null, error: 'Failed to fetch shop hero product' });
  }
};
