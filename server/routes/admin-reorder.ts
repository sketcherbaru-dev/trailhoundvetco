import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase.js';

const ALLOWED_TABLES = [
  'products',
  'articles',
  'courses',
  'podcasts',
  'pack_testimonials',
  'pack_field_reports',
  'pack_gallery',
  'hero_images',
] as const;

type AllowedTable = (typeof ALLOWED_TABLES)[number];

export const reorderItem: RequestHandler = async (req, res) => {
  const { table, id, direction } = req.body as {
    table: string;
    id: string;
    direction: 'up' | 'down';
  };

  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    res.status(400).json({ error: 'Invalid table' });
    return;
  }

  if (direction !== 'up' && direction !== 'down') {
    res.status(400).json({ error: 'direction must be up or down' });
    return;
  }

  try {
    // Get all items ordered by sort_order for this table
    const { data: items, error: fetchErr } = await supabaseServiceClient
      .from(table)
      .select('id, sort_order')
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (fetchErr || !items) {
      res.status(500).json({ error: fetchErr?.message || 'Failed to fetch items' });
      return;
    }

    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) {
      res.status(400).json({ error: 'Already at boundary' });
      return;
    }

    const current = items[idx];
    const swap = items[swapIdx];

    // Swap sort_order values
    const { error: err1 } = await supabaseServiceClient
      .from(table)
      .update({ sort_order: swap.sort_order })
      .eq('id', current.id);

    const { error: err2 } = await supabaseServiceClient
      .from(table)
      .update({ sort_order: current.sort_order })
      .eq('id', swap.id);

    if (err1 || err2) {
      res.status(500).json({ error: 'Failed to reorder' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
};
