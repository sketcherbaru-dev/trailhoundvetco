import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const createPodcast: RequestHandler = async (req, res) => {
  try {
    const { title, description, audio_url, episode_number, published_date, transcript, image } = req.body;

    const { data: existingEp } = await supabaseAnonClient
      .from('podcasts').select('id').eq('episode_number', episode_number).maybeSingle();
    if (existingEp) {
      res.status(409).json({ error: `Episode number ${episode_number} already exists.` });
      return;
    }

    const { data: existingTitle } = await supabaseAnonClient
      .from('podcasts').select('id').ilike('title', title).maybeSingle();
    if (existingTitle) {
      res.status(409).json({ error: `A podcast titled "${title}" already exists.` });
      return;
    }

    const { data, error } = await supabaseAnonClient
      .from('podcasts')
      .insert([{
        title,
        description,
        audio_url,
        episode_number,
        published_date,
        transcript,
        image,
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create podcast' });
  }
};

export const updatePodcast: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, audio_url, episode_number, published_date, transcript, image } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('podcasts')
      .update({
        title,
        description,
        audio_url,
        episode_number,
        published_date,
        transcript,
        image,
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update podcast' });
  }
};

export const deletePodcast: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAnonClient
      .from('podcasts')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete podcast' });
  }
};
