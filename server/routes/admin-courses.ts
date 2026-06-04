import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const createCourse: RequestHandler = async (req, res) => {
  try {
    const { title, description, level, format, thumbnail, category, curriculum, stripe_product_id, featured } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('courses')
      .insert([{
        title,
        description,
        level,
        format,
        thumbnail,
        category,
        curriculum,
        stripe_product_id,
        featured,
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create course' });
  }
};

export const updateCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, level, format, thumbnail, category, curriculum, stripe_product_id, featured } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('courses')
      .update({
        title,
        description,
        level,
        format,
        thumbnail,
        category,
        curriculum,
        stripe_product_id,
        featured,
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update course' });
  }
};

export const deleteCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAnonClient
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete course' });
  }
};
