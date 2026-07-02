import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';
import { ProductsResponse, Product } from '@shared/api';

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabaseAnonClient.from('products').select('*');

    if (category && typeof category === 'string') {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('sort_order', { ascending: true, nullsFirst: false });

    if (error) {
      res.status(400).json({ data: [], error: error.message } as ProductsResponse);
      return;
    }

    res.json({ data: data as Product[] } as ProductsResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch products',
    } as ProductsResponse);
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAnonClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ data: [], error: 'Product not found' } as ProductsResponse);
      return;
    }

    res.json({ data: [data] as Product[] } as ProductsResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch product',
    } as ProductsResponse);
  }
};

export const getFeaturedProducts: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('sort_order', { ascending: true, nullsFirst: false })
      .limit(6);

    if (error) {
      res.status(400).json({ data: [], error: error.message } as ProductsResponse);
      return;
    }

    res.json({ data: data as Product[] } as ProductsResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch featured products',
    } as ProductsResponse);
  }
};
