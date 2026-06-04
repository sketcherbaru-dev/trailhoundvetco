import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';
import { ProductSchema } from '@shared/schemas';
import { ZodError } from 'zod';

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const validated = ProductSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('products')
      .insert([validated])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create product' });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validated = ProductSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('products')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update product' });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseServiceClient
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
