import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

const ALLOWED_TABLES = [
  'field_reports', 'pack_testimonials', 'pack_gallery',
  'hero_images', 'subscribers', 'pack_field_reports',
];

// Field used to detect duplicates per table
const DUPLICATE_FIELD: Record<string, string> = {
  pack_testimonials: 'quote',
  pack_field_reports: 'title',
  field_reports: 'title',
  hero_images: 'image_url',
  pack_gallery: 'image_url',
};

export const genericCreate: RequestHandler = async (req, res) => {
  const { table } = req.params;
  if (!ALLOWED_TABLES.includes(table)) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }
  try {
    const dupField = DUPLICATE_FIELD[table];
    if (dupField && req.body[dupField]) {
      const { data: existing } = await supabaseAnonClient
        .from(table).select('id').ilike(dupField, req.body[dupField]).maybeSingle();
      if (existing) {
        res.status(409).json({ error: `A duplicate entry already exists (${dupField}: "${req.body[dupField]}").` });
        return;
      }
    }

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
