import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

const ALLOWED_TABLES = [
  'field_reports', 'pack_testimonials', 'pack_gallery',
  'hero_images', 'subscribers',
];

export const genericCreate: RequestHandler = async (req, res) => {
  const { table } = req.params;
  if (!ALLOWED_TABLES.includes(table)) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }
  try {
    const { data, error } = await supabaseAnonClient
      .from(table)
      .insert([req.body])
      .select()
      .single();
    if (error) { res.status(400).json({ error: error.message }); return; }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
};

export const genericUpdate: RequestHandler = async (req, res) => {
  const { table, id } = req.params;
  if (!ALLOWED_TABLES.includes(table)) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }
  try {
    const body = { ...req.body, updated_at: new Date().toISOString() };
    const { data, error } = await supabaseAnonClient
      .from(table)
      .update(body)
      .eq('id', id)
      .select()
      .single();
    if (error) { res.status(400).json({ error: error.message }); return; }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
};

export const genericDelete: RequestHandler = async (req, res) => {
  const { table, id } = req.params;
  if (!ALLOWED_TABLES.includes(table)) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }
  try {
    const { error } = await supabaseAnonClient.from(table).delete().eq('id', id);
    if (error) { res.status(400).json({ error: error.message }); return; }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
};
