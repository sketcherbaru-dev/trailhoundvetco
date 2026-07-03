-- Run this once in Supabase → SQL Editor
-- Adds sort_order column to all content tables and initializes order from created_at
-- NOTE: the field reports table is named "field_reports" (NOT "pack_field_reports")

ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE podcasts ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE pack_testimonials ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE field_reports ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE pack_gallery ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE hero_images ADD COLUMN IF NOT EXISTS sort_order INTEGER;

-- Initialize sort_order based on existing created_at order (only where still NULL)
UPDATE products SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM products) sub WHERE products.id = sub.id AND products.sort_order IS NULL;
UPDATE articles SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM articles) sub WHERE articles.id = sub.id AND articles.sort_order IS NULL;
UPDATE courses SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM courses) sub WHERE courses.id = sub.id AND courses.sort_order IS NULL;
UPDATE podcasts SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM podcasts) sub WHERE podcasts.id = sub.id AND podcasts.sort_order IS NULL;
UPDATE pack_testimonials SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM pack_testimonials) sub WHERE pack_testimonials.id = sub.id AND pack_testimonials.sort_order IS NULL;
UPDATE field_reports SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM field_reports) sub WHERE field_reports.id = sub.id AND field_reports.sort_order IS NULL;
UPDATE pack_gallery SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM pack_gallery) sub WHERE pack_gallery.id = sub.id AND pack_gallery.sort_order IS NULL;
UPDATE hero_images SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM hero_images) sub WHERE hero_images.id = sub.id AND hero_images.sort_order IS NULL;
