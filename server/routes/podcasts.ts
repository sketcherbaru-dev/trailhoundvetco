import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';
import { PodcastsResponse, Podcast } from '@shared/api';

export const getPodcasts: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('podcasts')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false });

    if (error) {
      res.status(400).json({ data: [], error: error.message } as PodcastsResponse);
      return;
    }

    res.json({ data: data as Podcast[] } as PodcastsResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch podcasts',
    } as PodcastsResponse);
  }
};

export const getPodcastById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAnonClient
      .from('podcasts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ data: [], error: 'Podcast not found' } as PodcastsResponse);
      return;
    }

    res.json({ data: [data] as Podcast[] } as PodcastsResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch podcast',
    } as PodcastsResponse);
  }
};
