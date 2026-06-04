import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';
import { CourseSchema } from '@shared/schemas';
import { ZodError } from 'zod';

export const createCourse: RequestHandler = async (req, res) => {
  try {
    const validated = CourseSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('courses')
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create course' });
  }
};

export const updateCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validated = CourseSchema.parse(req.body);

    const { data, error } = await supabaseServiceClient
      .from('courses')
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update course' });
  }
};

export const deleteCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseServiceClient
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
