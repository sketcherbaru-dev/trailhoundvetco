# CMS Backend Setup Guide

This guide walks you through setting up the Supabase backend for your Trailhound Vet website.

## Phase 1: Database & API Setup ✅

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (or log in)
2. Create a new project:
   - Click "New Project"
   - Choose a name (e.g., "trailhound-vet")
   - Choose a strong database password
   - Select your region closest to your users
   - Click "Create new project"

3. Wait for the project to initialize (2-3 minutes)

### Step 2: Create Database Tables

Once your Supabase project is ready, go to the **SQL Editor** and create these tables:

#### Table 1: articles

```sql
create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  author text not null,
  thumbnail text not null,
  image text not null,
  date text not null,
  read_time text not null,
  featured boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS (Row Level Security)
alter table articles enable row level security;

-- Public read access
create policy "Articles are viewable by everyone" on articles
  for select using (true);
```

#### Table 2: products

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric not null,
  image text not null,
  category text not null,
  badge text,
  external_link text,
  stripe_product_id text,
  featured boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table products enable row level security;

create policy "Products are viewable by everyone" on products
  for select using (true);
```

#### Table 3: courses

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  level text not null,
  format text not null,
  thumbnail text not null,
  category text not null,
  curriculum text,
  stripe_product_id text,
  featured boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table courses enable row level security;

create policy "Courses are viewable by everyone" on courses
  for select using (true);
```

#### Table 4: podcasts (for future use)

```sql
create table podcasts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  audio_url text not null,
  episode_number integer not null,
  published_date text not null,
  transcript text,
  image text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table podcasts enable row level security;

create policy "Podcasts are viewable by everyone" on podcasts
  for select using (true);
```

#### Table 5: marketing_content

```sql
create table marketing_content (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  page text not null,
  content jsonb not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table marketing_content enable row level security;

create policy "Marketing content is viewable by everyone" on marketing_content
  for select using (true);
```

### Step 3: Get Your Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (under `SUPABASE_URL`)
   - **anon public** key (under `SUPABASE_ANON_KEY`)
   - **service_role** key (under `SUPABASE_SERVICE_KEY`) - keep this secret!

### Step 4: Set Environment Variables

1. Create a `.env.local` file in your project root (or use the existing `.env`)
2. Add your Supabase credentials:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyXXXX...
SUPABASE_SERVICE_KEY=eyXXXX...
```

### Step 5: Test the API

Start your dev server:

```bash
pnpm dev
```

Test the API endpoints:

- `http://localhost:8080/api/articles` - Get all articles
- `http://localhost:8080/api/articles/featured` - Get featured articles
- `http://localhost:8080/api/products` - Get all products
- `http://localhost:8080/api/courses` - Get all courses
- `http://localhost:8080/api/podcasts` - Get all podcasts

You should get empty arrays `{"data": []}` since the database is empty yet.

### Step 6: Add Sample Data (Optional)

In Supabase, go to **Table Editor** and manually add some sample data to test:

#### Sample Article

```
title: "Winter Paw Care Guide"
excerpt: "Keep your dog's paws healthy in cold weather"
content: "[Full article content here]"
category: "PHYSIOLOGY"
author: "Dr. Moe Baum, DVM"
thumbnail: "[image url]"
image: "[image url]"
date: "Jan 15, 2026"
readTime: "5 min read"
featured: true
```

#### Sample Product

```
name: "Trailhound Field Guide"
description: "Complete first aid guide for pets"
price: 34.99
image: "[image url]"
category: "books"
badge: "PRE-ORDER"
external_link: null
featured: true
```

#### Sample Course

```
title: "Basecamp: Level 1"
description: "First aid for the trail"
level: "Beginner"
format: "In-Person"
thumbnail: "[image url]"
category: "pet-owner"
featured: true
```

---

## Next Steps

After Phase 1 is complete:

- **Phase 2**: Modify pages to fetch from the API instead of hardcoded data
- **Phase 3**: Add admin dashboard to manage content
- **Phase 4**: Integrate Stripe for payments
- **Phase 5**: Prepare podcast integration

---

## Quick Troubleshooting

### API returns error "Supabase environment variables not set"

- Check that your `.env.local` file has `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Restart your dev server after adding environment variables

### "Could not connect to database"

- Verify your Supabase project is active
- Check that your credentials are correct
- Ensure Row Level Security (RLS) is enabled on tables

### "No tables found"

- Make sure you ran the SQL scripts in Supabase's **SQL Editor**
- Refresh the page and check the **Table Editor**

---

## File Structure

Created files for this phase:

```
server/
├── lib/
│   └── supabase.ts          # Supabase client setup
├── routes/
│   ├── articles.ts          # Article endpoints
│   ├── products.ts          # Product endpoints
│   ├── courses.ts           # Course endpoints
│   └── podcasts.ts          # Podcast endpoints (ready)

shared/
└── api.ts                   # Updated with database types

.env.example                 # Environment variables template
```

---

## Security Notes

- **SUPABASE_ANON_KEY**: Public key, safe to expose in frontend
- **SUPABASE_SERVICE_KEY**: Secret key, keep it in `.env` only (never commit!)
- Row Level Security (RLS) ensures unauthenticated users can only read public data
- Authenticated admins can write data (will add in Phase 3)
