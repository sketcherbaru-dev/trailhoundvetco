import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const createArticle: RequestHandler = async (req, res) => {
  try {
    const { title, excerpt, content, category, author, thumbnail, image, date, read_time, featured, home_featured } = req.body;

    const { data: existing } = await supabaseAnonClient
      .from('articles').select('id').ilike('title', title).maybeSingle();
    if (existing) {
      res.status(409).json({ error: `An article titled "${title}" already exists.` });
      return;
    }

    const { data, error } = await supabaseAnonClient
      .from('articles')
      .insert([{
        title,
        excerpt,
        content,
        category,
        author,
        thumbnail,
        image,
        date: date || new Date().toISOString(),
        read_time,
        featured: featured || false,
        home_featured: home_featured || false,
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ ...data, readTime: data.read_time });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create article' });
  }
};

export const updateArticle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, author, thumbnail, image, date, read_time, featured, home_featured } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('articles')
      .update({
        title,
        excerpt,
        content,
        category,
        author,
        thumbnail,
        image,
        date: date || new Date().toISOString(),
        read_time,
        featured: featured || false,
        home_featured: home_featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ ...data, readTime: data.read_time });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update article' });
  }
};

export const deleteArticle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAnonClient
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete article' });
  }
};
