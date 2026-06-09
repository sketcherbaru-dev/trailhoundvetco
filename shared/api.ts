/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Database Models (Supabase Tables)

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  thumbnail: string;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  home_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
  category: string;
  badge?: string;
  external_link?: string;
  stripe_product_id?: string;
  features?: string;
  featured: boolean;
  field_guide_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  format: string;
  thumbnail: string;
  category: string;
  curriculum?: string;
  stripe_product_id?: string;
  featured: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface HeroImage {
  id: string;
  page: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FieldReport {
  id: string;
  badge: string;
  badge_color: string;
  image_url: string;
  quote: string;
  attribution: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PackTestimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  date?: string;
  avatar_initial: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PackGalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  episode_number: number;
  published_date: string;
  transcript?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketingContent {
  id: string;
  type: string;
  page: string;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// API Response Types

export interface ArticlesResponse {
  data: Article[];
  error?: string;
}

export interface ArticleResponse {
  data: Article | null;
  error?: string;
}

export interface ProductsResponse {
  data: Product[];
  error?: string;
}

export interface CoursesResponse {
  data: Course[];
  error?: string;
}

export interface PodcastsResponse {
  data: Podcast[];
  error?: string;
}
