import { z } from 'zod';

// Article Schema
export const ArticleSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required').max(255),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  content: z.string().min(1, 'Content is required'),
  category: z.enum(['PHYSIOLOGY', 'INJURY', 'NUTRITION', 'TRAINING']),
  author: z.string().min(1, 'Author is required').max(100),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  date: z.string().date('Invalid date format'),
  read_time: z.string().min(1, 'Read time is required').max(50),
  featured: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ArticleInput = z.infer<typeof ArticleSchema>;

// Product Schema
export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Product name is required').max(255),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required').max(100),
  badge: z.enum(['NEW', 'POPULAR', 'SALE']).optional(),
  external_link: z.string().url('Invalid external link').optional().or(z.literal('')),
  stripe_product_id: z.string().optional(),
  featured: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;

// Course Schema
export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Course title is required').max(255),
  description: z.string().min(1, 'Description is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  format: z.enum(['ONLINE', 'WORKSHOP', 'HYBRID']),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required').max(100),
  curriculum: z.string().optional(),
  stripe_product_id: z.string().optional(),
  featured: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CourseInput = z.infer<typeof CourseSchema>;

// Podcast Schema
export const PodcastSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Podcast title is required').max(255),
  description: z.string().min(1, 'Description is required'),
  audio_url: z.string().url('Invalid audio URL'),
  episode_number: z.number().int().positive('Episode number must be positive'),
  published_date: z.string().date('Invalid date format'),
  transcript: z.string().optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type PodcastInput = z.infer<typeof PodcastSchema>;
