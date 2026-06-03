import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';

export const createArticle: RequestHandler = async (req, res) => {
  try {
    const { title, excerpt, content, category, author, thumbnail, image, date, read_time, featured } = req.body;

    const { data, error } = await supabaseServiceClient
      .from('articles')
      .insert([{
        title,
        excerpt,
        content,
        category,
        author,
        thumbnail,
        image,
        date,
        read_time,
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create article' });
  }
};

export const updateArticle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, author, thumbnail, image, date, read_time, featured } = req.body;

    const { data, error } = await supabaseServiceClient
      .from('articles')
      .update({
        title,
        excerpt,
        content,
        category,
        author,
        thumbnail,
        image,
        date,
        read_time,
        featured,
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update article' });
  }
};

export const deleteArticle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseServiceClient
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
