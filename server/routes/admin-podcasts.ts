import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';
import { PodcastSchema } from '@shared/schemas';
import { ZodError } from 'zod';

export const createPodcast: RequestHandler = async (req, res) => {
  try {
    const validated = PodcastSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('podcasts')
      .insert([validated])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create podcast' });
  }
};

export const updatePodcast: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validated = PodcastSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('podcasts')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update podcast' });
  }
};

export const deletePodcast: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseServiceClient
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
