import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL / POSTGRES_URL");
  process.exit(1);
}
const sql = neon(connectionString);

async function main() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL DEFAULT 'PHYSIOLOGY',
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      thumbnail TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL DEFAULT '',
      read_time TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price_cents INTEGER NOT NULL DEFAULT 0,
      badge TEXT NOT NULL DEFAULT 'NEW',
      category TEXT NOT NULL DEFAULT 'gear',
      image TEXT NOT NULL DEFAULT '',
      -- 'stripe' = pay on-site, 'external' = link out, 'internal' = link to a site page
      purchase_type TEXT NOT NULL DEFAULT 'internal',
      external_url TEXT NOT NULL DEFAULT '',
      internal_href TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT 'Beginner',
      format TEXT NOT NULL DEFAULT 'In-Person',
      thumbnail TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'pet-owner',
      price_cents INTEGER NOT NULL DEFAULT 0,
      -- when true, buyers can register & pay via Stripe; otherwise shows "Coming Soon"/Learn More
      registration_open BOOLEAN NOT NULL DEFAULT FALSE,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      audio_url TEXT NOT NULL DEFAULT '',
      external_url TEXT NOT NULL DEFAULT '',
      episode_number INTEGER,
      duration TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id TEXT UNIQUE,
      customer_email TEXT NOT NULL DEFAULT '',
      customer_name TEXT NOT NULL DEFAULT '',
      item_type TEXT NOT NULL DEFAULT 'product',
      item_id INTEGER,
      item_name TEXT NOT NULL DEFAULT '',
      amount_cents INTEGER NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'usd',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Seeding content (only if tables are empty)...");

  const [{ count: articleCount }] = await sql`SELECT COUNT(*)::int AS count FROM articles`;
  if (articleCount === 0) {
    const articles = [
      {
        category: "PHYSIOLOGY",
        title: "Hard-Packed vs. Loose Scree: A Paw Study",
        excerpt:
          "New research on how different mountain terrains impact joint wear in high-activity breeds.",
        content:
          "When traversing high-altitude environments, the terrain directly dictates the mechanical stress placed on a dog's joints and paw pads. High-activity breeds like Border Collies, Siberian Huskies, and Australian Shepherds possess natural adaptations, but hard-packed trails versus loose scree present vastly different challenges.\n\nOur recent study monitored 50 active canine trail companions over a three-month mountain trekking period. Results showed that loose scree shifts underfoot, causing micro-slips that increase work on stabilizing tendons, while hard-packed dirt causes high-impact forces directly transferred up the leg column. Protecting your companion requires a mixture of natural paw waxes, appropriate rest intervals, and supportive booties on rough granite scree fields.",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=192",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/e31a3a82b31fe48292562faebd2a7855b840f1ff?width=1200",
        date: "Oct 12, 2026",
        read_time: "5 min read",
        author: "Dr. Moe Baum, DVM",
      },
      {
        category: "BEHAVIOR",
        title: "Recall in High-Prey Environments",
        excerpt:
          "Training protocols for maintaining focus when wildlife enters the frame.",
        content:
          "A reliable recall is the single most important safety skill an adventure pet can learn. In high-prey environments—where deer, squirrels, or marmots may dart across the trail—a dog's predatory chase drive can easily override standard commands.\n\nTo build a bulletproof recall, we utilize a tiered reward system and simulated distraction protocols. Never use recall to end fun activities; instead, recall your dog, reward them with high-value treats like freeze-dried beef liver, and immediately release them back to play. This establishes that coming back to you leads to better outcomes, keeping them safe when wildlife is near.",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/5d21bb830868bedc9ed342721e99656d4f3f05c3?width=192",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/324577372dab7b1eedb53d86d271a785340f874c?width=1200",
        date: "Sep 28, 2026",
        read_time: "4 min read",
        author: "Elena C., Professional Trainer",
      },
      {
        category: "PHYSIOLOGY",
        title: "The Winter Expedition Manual",
        excerpt:
          "How to protect paws from ice, managing core temperatures, and identifying early-stage hypothermia.",
        content:
          "Winter expeditions with pets are highly rewarding but require rigorous preparation. Paw pads are susceptible to frostbite and abrasion from ice crusts, while salt and chemical de-icers can cause chemical burns.\n\nAlways apply a thick layer of petroleum-free paw barrier wax before setting out. Keep treks shorter on packed ice, and watch for early signs of hypothermia including shivering, lethargy, and seeking shelter. A premium insulated jacket is highly recommended for short-haired or low-fat breeds.",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=192",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=1200",
        date: "Jan 15, 2026",
        read_time: "8 min read",
        author: "Dr. Moe Baum, DVM",
      },
      {
        category: "NUTRITION",
        title: "Nutrition for Performance",
        excerpt:
          "Fueling for the 20-mile day. Caloric density, hydration electrolytes, and recovery supplements.",
        content:
          "High-output trail days demand a scientific approach to canine nutrition. Just as human athletes carb-load, active breeds require highly digestible proteins and fats to prevent muscle breakdown and maintain endurance over long distances.\n\nDuring extreme exercise, transition to high-fat treats and ensure proper hydration with pet-safe electrolyte additives. Monitor caloric intake and supplement with joint-stabilizing compounds like glucosamine and chondroitin.",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=192",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=1200",
        date: "Nov 02, 2026",
        read_time: "6 min read",
        author: "Dr. Moe Baum, DVM",
      },
    ];
    let order = 0;
    for (const a of articles) {
      await sql`
        INSERT INTO articles (category, title, excerpt, content, thumbnail, image, date, read_time, author, sort_order)
        VALUES (${a.category}, ${a.title}, ${a.excerpt}, ${a.content}, ${a.thumbnail}, ${a.image}, ${a.date}, ${a.read_time}, ${a.author}, ${order++})
      `;
    }
    console.log(`Seeded ${articles.length} articles`);
  }

  const [{ count: productCount }] = await sql`SELECT COUNT(*)::int AS count FROM products`;
  if (productCount === 0) {
    const products = [
      {
        name: "Trailhound Field Guide: First Aid for Pets",
        description:
          "The definitive wilderness first aid manual for adventurous pet owners. Written by Dr. Moe Baum, DVM.",
        price_cents: 3499,
        badge: "PRE-ORDER",
        category: "books",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/a184a6ce26a14b7a9a50b8053da8588fee029508?width=600",
        purchase_type: "internal",
        internal_href: "/field-guide",
      },
      {
        name: "The Winter Expedition Manual",
        description:
          "Cold-weather survival and first aid for dogs and cats in sub-zero environments.",
        price_cents: 2499,
        badge: "BEST SELLER",
        category: "books",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/e8c4f1d9ecb8b25906a4b4cffceef6f307c475a9?width=600",
        purchase_type: "stripe",
      },
      {
        name: "K9 Trail First Aid Kit",
        description:
          "Compact, trail-ready first aid kit curated for outdoor dogs. Fits any pack.",
        price_cents: 5999,
        badge: "BEST SELLER",
        category: "kits",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=600",
        purchase_type: "external",
        external_url: "https://www.ruffwear.com/",
      },
      {
        name: "Feline Adventure First Aid Pouch",
        description:
          "Lightweight and purpose-built for cats on the move. Includes cat-specific wound care.",
        price_cents: 4499,
        badge: "NEW",
        category: "kits",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=600",
        purchase_type: "external",
        external_url: "https://www.ruffwear.com/",
      },
      {
        name: "Basecamp: Level 1 Course",
        description:
          "In-person veterinary first aid training for the trail, the road, and everywhere in between.",
        price_cents: 14900,
        badge: "COMING SOON",
        category: "courses",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600",
        purchase_type: "internal",
        internal_href: "/basecamp-courses",
      },
      {
        name: "Emergency Signal & Whistle Kit",
        description:
          "High-visibility gear for search and rescue. For you and your trail companion.",
        price_cents: 2899,
        badge: "EXTERNAL",
        category: "gear",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/38398c6854188508193d665e6b1695a39ac29f21?width=600",
        purchase_type: "external",
        external_url: "https://www.ruffwear.com/",
      },
      {
        name: "Trailhound Paw Care Bundle",
        description:
          "Wax, booties, and blister care — everything you need to protect paws from scree, ice, and heat.",
        price_cents: 3999,
        badge: "NEW",
        category: "gear",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/324577372dab7b1eedb53d86d271a785340f874c?width=600",
        purchase_type: "external",
        external_url: "https://www.ruffwear.com/",
      },
      {
        name: "The Ascent: Working Dog Course",
        description:
          "Field-ready veterinary first aid for working dog handlers and SAR teams.",
        price_cents: 19900,
        badge: "COMING SOON",
        category: "courses",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/5d21bb830868bedc9ed342721e99656d4f3f05c3?width=600",
        purchase_type: "internal",
        internal_href: "/basecamp-courses",
      },
    ];
    let order = 0;
    for (const p of products) {
      await sql`
        INSERT INTO products (name, description, price_cents, badge, category, image, purchase_type, external_url, internal_href, sort_order)
        VALUES (${p.name}, ${p.description}, ${p.price_cents}, ${p.badge}, ${p.category}, ${p.image}, ${p.purchase_type}, ${p.external_url || ""}, ${p.internal_href || ""}, ${order++})
      `;
    }
    console.log(`Seeded ${products.length} products`);
  }

  const [{ count: courseCount }] = await sql`SELECT COUNT(*)::int AS count FROM courses`;
  if (courseCount === 0) {
    const courses = [
      {
        title: "Basecamp: Level 1",
        description: "First aid for the trail, the road, and everywhere in between.",
        level: "Beginner",
        format: "In-Person",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/fea16b77b798c81635011b745a38928cc949a733?width=400",
        category: "pet-owner",
        price_cents: 14900,
        registration_open: true,
      },
      {
        title: "Basecamp: Level 2",
        description: "First aid for the trail, the road, and everywhere in between.",
        level: "Beginner",
        format: "In-Person",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/5d21bb830868bedc9ed342721e99656d4f3f05c3?width=400",
        category: "pet-owner",
        price_cents: 14900,
        registration_open: true,
      },
      {
        title: "The Ascent: Working Professionals & Outdoor Enthusiasts",
        description:
          "Field-ready veterinary first aid for the environments where your dog works.",
        level: "Intermediate",
        format: "In-Person",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=400",
        category: "sar",
        price_cents: 19900,
        registration_open: false,
      },
      {
        title: "The Summit: Medical Professionals in the Field",
        description: "Your medical training, applied to the animals in your care.",
        level: "Advanced",
        format: "In-Person",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/cbbcf45d0ff6f0df97e204e9e1c5330818dd8b4a?width=400",
        category: "first-responders",
        price_cents: 24900,
        registration_open: false,
      },
      {
        title: "The Practice: Veterinary CE",
        description: "Practical, real-world emergency care beyond the clinic walls.",
        level: "Professional",
        format: "In-Person",
        thumbnail:
          "https://api.builder.io/api/v1/image/assets/TEMP/324577372dab7b1eedb53d86d271a785340f874c?width=400",
        category: "vet",
        price_cents: 29900,
        registration_open: false,
      },
    ];
    let order = 0;
    for (const c of courses) {
      await sql`
        INSERT INTO courses (title, description, level, format, thumbnail, category, price_cents, registration_open, sort_order)
        VALUES (${c.title}, ${c.description}, ${c.level}, ${c.format}, ${c.thumbnail}, ${c.category}, ${c.price_cents}, ${c.registration_open}, ${order++})
      `;
    }
    console.log(`Seeded ${courses.length} courses`);
  }

  const [{ count: podcastCount }] = await sql`SELECT COUNT(*)::int AS count FROM podcasts`;
  if (podcastCount === 0) {
    const podcasts = [
      {
        title: "Trailhead Sessions: Wilderness First Aid Basics",
        description:
          "Dr. Moe Baum walks through the essentials every adventure pet owner should know before hitting the trail.",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d77d51663f18e7d00750c7efd4cfbbd05694fa51?width=600",
        external_url: "https://open.spotify.com/",
        episode_number: 1,
        duration: "42 min",
      },
      {
        title: "Paws on the Pass: Conditioning the Trail Dog",
        description:
          "How to build endurance, protect joints, and fuel your dog for long days in the backcountry.",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/324577372dab7b1eedb53d86d271a785340f874c?width=600",
        external_url: "https://open.spotify.com/",
        episode_number: 2,
        duration: "38 min",
      },
    ];
    let order = 0;
    for (const p of podcasts) {
      await sql`
        INSERT INTO podcasts (title, description, image, external_url, episode_number, duration, sort_order)
        VALUES (${p.title}, ${p.description}, ${p.image}, ${p.external_url}, ${p.episode_number}, ${p.duration}, ${order++})
      `;
    }
    console.log(`Seeded ${podcasts.length} podcasts`);
  }

  console.log("Database setup complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
