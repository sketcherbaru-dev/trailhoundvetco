import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';
import { ArticlesResponse, ArticleResponse, Article } from '@shared/api';

export const getArticles: RequestHandler = async (req, res) => {
  try {
    console.log('[v0] Fetching articles from Supabase...');
    const { data, error } = await supabaseAnonClient
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('[v0] Supabase error:', error);
      res.status(400).json({ data: null, error: error.message } as ArticleResponse);
      return;
    }

    console.log('[v0] Articles fetched:', data?.length);
    res.json({ data: data as Article[] } as ArticlesResponse);
  } catch (error) {
    console.error('[v0] Error fetching articles:', error);
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

    res.json({ data: data as Article } as ArticleResponse);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch article',
    } as ArticleResponse);
  }
};

export const getFeaturedArticles: RequestHandler = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    let query = supabaseAnonClient
      .from('articles')
      .select('*')
      .eq('featured', true)
      .order('date', { ascending: false });

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      res.status(400).json({ data: null, error: error.message } as ArticleResponse);
      return;
    }

    res.json({ data: data as Article[] } as ArticlesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch featured articles',
    } as ArticlesResponse);
  }
};
