import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, image, category, badge, external_link, stripe_product_id, featured, field_guide_featured, shop_hero_featured, features } = req.body;

    const { data: existing } = await supabaseAnonClient
      .from('products').select('id').ilike('name', name).maybeSingle();
    if (existing) {
      res.status(409).json({ error: `A product named "${name}" already exists.` });
      return;
    }

    const { data, error } = await supabaseAnonClient
      .from('products')
      .insert([{
        name,
        description,
        price,
        image,
        category,
        badge,
        external_link,
        stripe_product_id,
        featured,
        field_guide_featured: field_guide_featured ?? false,
        shop_hero_featured: shop_hero_featured ?? false,
        features: features || null,
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, badge, external_link, stripe_product_id, featured, field_guide_featured, shop_hero_featured, features } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('products')
      .update({
        name,
        description,
        price,
        image,
        category,
        badge,
        external_link,
        stripe_product_id,
        featured,
        field_guide_featured: field_guide_featured ?? false,
        shop_hero_featured: shop_hero_featured ?? false,
        features: features || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update product' });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAnonClient
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete product' });
  }
};
