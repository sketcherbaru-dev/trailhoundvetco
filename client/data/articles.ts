export interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: 1,
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
    readTime: "5 min read",
    author: "Dr. Moe Baum, DVM",
  },
  {
    id: 2,
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
    readTime: "4 min read",
    author: "Elena C., Professional Trainer",
  },
  {
    id: 3,
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
    readTime: "8 min read",
    author: "Dr. Moe Baum, DVM",
  },
  {
    id: 4,
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
    readTime: "6 min read",
    author: "Dr. Moe Baum, DVM",
  },
];
