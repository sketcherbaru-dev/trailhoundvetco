-- Run this once in Supabase → SQL Editor
-- Adds sort_order column to all content tables and initializes order from created_at

ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE podcasts ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE pack_testimonials ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE pack_field_reports ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE pack_gallery ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE hero_images ADD COLUMN IF NOT EXISTS sort_order INTEGER;

-- Initialize sort_order based on existing created_at order
UPDATE products SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM products) sub WHERE products.id = sub.id;
UPDATE articles SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM articles) sub WHERE articles.id = sub.id;
UPDATE courses SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM courses) sub WHERE courses.id = sub.id;
UPDATE podcasts SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM podcasts) sub WHERE podcasts.id = sub.id;
UPDATE pack_testimonials SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM pack_testimonials) sub WHERE pack_testimonials.id = sub.id;
UPDATE pack_field_reports SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM pack_field_reports) sub WHERE pack_field_reports.id = sub.id;
UPDATE pack_gallery SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM pack_gallery) sub WHERE pack_gallery.id = sub.id;
UPDATE hero_images SET sort_order = sub.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM hero_images) sub WHERE hero_images.id = sub.id;
