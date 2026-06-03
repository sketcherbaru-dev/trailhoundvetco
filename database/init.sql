-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  thumbnail TEXT,
  image TEXT,
  date TIMESTAMP DEFAULT NOW(),
  readTime TEXT DEFAULT '5 min read',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT,
  external_link TEXT,
  stripe_product_id TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  format TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  category TEXT NOT NULL,
  curriculum TEXT,
  stripe_product_id TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  episode_number INTEGER NOT NULL,
  published_date TIMESTAMP NOT NULL,
  transcript TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create marketing_content table
CREATE TABLE IF NOT EXISTS marketing_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  page TEXT NOT NULL,
  content JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);
CREATE INDEX IF NOT EXISTS idx_marketing_page ON marketing_content(page);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to all content
CREATE POLICY "Allow public read access to articles" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to podcasts" ON podcasts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to marketing content" ON marketing_content
  FOR SELECT USING (true);

-- Insert sample data for articles
INSERT INTO articles (title, excerpt, content, category, author, thumbnail, image, date, readTime, featured)
VALUES 
  (
    'Understanding K9 Physiology on the Trail',
    'Learn how your dog''s body adapts to high-altitude hiking and extreme weather conditions.',
    'This comprehensive guide covers the physiological changes dogs experience during strenuous outdoor activities...',
    'PHYSIOLOGY',
    'Dr. Moe Baum',
    'https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=400',
    'https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=600',
    NOW(),
    '8 min read',
    true
  ),
  (
    'Recognizing Signs of Exhaustion in Outdoor Cats',
    'How to spot when your feline companion needs rest during wilderness adventures.',
    'Cats have different fatigue patterns than dogs. Learn to recognize the subtle signs...',
    'BEHAVIOR',
    'Dr. Moe Baum',
    'https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=400',
    'https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=600',
    NOW() - INTERVAL '5 days',
    '6 min read',
    false
  ),
  (
    'Optimal Nutrition for Trail Dogs',
    'What foods and supplements keep your dog energized and healthy during outdoor expeditions.',
    'Proper nutrition is crucial for maintaining your dog''s energy levels and recovery...',
    'NUTRITION',
    'Dr. Moe Baum',
    'https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=400',
    'https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=600',
    NOW() - INTERVAL '10 days',
    '7 min read',
    false
  );

-- Insert sample data for products
INSERT INTO products (name, description, price, image, category, badge, featured)
VALUES 
  (
    'Trailhound Field Guide: First Aid for Pets',
    'The definitive wilderness first aid manual for adventurous pet owners. Written by Dr. Moe Baum, DVM.',
    34.99,
    'https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=600',
    'books',
    'PRE-ORDER',
    true
  ),
  (
    'The Winter Expedition Manual',
    'Cold-weather survival and first aid for dogs and cats in sub-zero environments.',
    24.99,
    'https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=600',
    'books',
    'BEST SELLER',
    true
  ),
  (
    'K9 Trail First Aid Kit',
    'Compact, trail-ready first aid kit curated for outdoor dogs. Fits any pack.',
    59.99,
    'https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=600',
    'kits',
    'BEST SELLER',
    false
  );

-- Insert sample data for courses
INSERT INTO courses (title, description, level, format, thumbnail, category, featured)
VALUES 
  (
    'Basecamp: Level 1',
    'First aid for the trail, the road, and everywhere in between.',
    'Beginner',
    'In-Person',
    'https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=400',
    'pet-owner',
    true
  ),
  (
    'The Ascent: Working Professionals & Outdoor Enthusiasts',
    'Field-ready veterinary first aid for the environments where your dog works.',
    'Intermediate',
    'In-Person',
    'https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=400',
    'sar',
    false
  ),
  (
    'The Practice: Veterinary CE',
    'Practical, real-world emergency care beyond the clinic walls.',
    'Professional',
    'In-Person',
    'https://api.builder.io/api/v1/image/assets/TEMP/324577372dab7b1eedb53d86d271a785340f874c?width=400',
    'vet',
    false
  );
