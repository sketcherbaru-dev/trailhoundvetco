-- Run once in Supabase → SQL Editor.
-- Adds an image_fit column to products so the admin can choose, per product,
-- whether the image is shown in full ("contain") or cropped to fill ("cover").

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_fit TEXT DEFAULT 'cover';

-- Default existing book/field-guide products to show their full cover
UPDATE products SET image_fit = 'contain' WHERE category = 'books' AND (image_fit IS NULL OR image_fit = 'cover');

-- Everything else defaults to 'cover'
UPDATE products SET image_fit = 'cover' WHERE image_fit IS NULL;
