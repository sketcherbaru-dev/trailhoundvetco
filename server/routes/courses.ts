import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';
import { CoursesResponse, Course } from '@shared/api';

export const getCourses: RequestHandler = async (req, res) => {
  try {
    const { category, level, format } = req.query;

    let query = supabaseAnonClient.from('courses').select('*');

    if (category && typeof category === 'string') {
      query = query.eq('category', category);
    }
    if (level && typeof level === 'string') {
      query = query.eq('level', level);
    }
    if (format && typeof format === 'string') {
      query = query.eq('format', format);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      res.status(400).json({ data: [], error: error.message } as CoursesResponse);
      return;
    }

    res.json({ data: data as Course[] } as CoursesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch courses',
    } as CoursesResponse);
  }
};

export const getCourseById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAnonClient
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ data: [], error: 'Course not found' } as CoursesResponse);
      return;
    }

    res.json({ data: [data] as Course[] } as CoursesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch course',
    } as CoursesResponse);
  }
};

export const getFeaturedCourses: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('courses')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      res.status(400).json({ data: [], error: error.message } as CoursesResponse);
      return;
    }

    res.json({ data: data as Course[] } as CoursesResponse);
  } catch (error) {
    res.status(500).json({
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch featured courses',
    } as CoursesResponse);
  }
};
