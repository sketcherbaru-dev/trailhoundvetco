import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';
import { ArticlesResponse, ArticleResponse, Article } from '@shared/api';

const mapArticle = (a: any): Article => ({
  ...a,
  readTime: a.read_time || '5 min read',
  date: a.date ? new Date(a.date).toISOString().split('T')[0] : '',
});

export const getArticles: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      res.status(400).json({ data: [], error: error.message } as ArticlesResponse);
      return;
    }

    res.json({ data: (data || []).map(mapArticle) } as ArticlesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch articles',
    } as ArticlesResponse);
  }
};

export const getArticleById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAnonClient
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ data: null, error: 'Article not found' } as ArticleResponse);
      return;
    }

    res.json({ data: mapArticle(data) } as ArticleResponse);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch article',
    } as ArticleResponse);
  }
};

export const getFeaturedArticles: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('articles')
      .select('*')
      .eq('featured', true)
      .order('date', { ascending: false })
      .limit(5);

    if (error) {
      res.status(400).json({ data: [], error: error.message } as ArticlesResponse);
      return;
    }

    res.json({ data: (data || []).map(mapArticle) } as ArticlesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch featured articles',
    } as ArticlesResponse);
  }
};
