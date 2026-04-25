import {
  Code2,
  Palette,
  Briefcase,
  GraduationCap,
  Camera,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { tools, type ToolCategory } from "./tools";

export interface CategoryInfo {
  slug: ToolCategory;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const categories: CategoryInfo[] = [
  {
    slug: "developer",
    name: "Developers",
    tagline: "Code. Debug. Ship.",
    description: "JSON, regex, encoders, generators — har woh tool jo terminal se thoda fast hai.",
    icon: Code2,
    accent: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
  },
  {
    slug: "designer",
    name: "Designers",
    tagline: "Design karo — bina ruke",
    description: "Color palettes, contrast checkers, image tools — visual kaam ka workshop.",
    icon: Palette,
    accent: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]",
  },
  {
    slug: "professional",
    name: "Working Professionals",
    tagline: "Office ka kaam — jaldi khatam karo",
    description: "Invoice, timer, word counter — daily kaam ke liye saaf, fast tools.",
    icon: Briefcase,
    accent: "from-[hsl(var(--primary))] to-[hsl(var(--foreground))]",
  },
  {
    slug: "student",
    name: "Students",
    tagline: "Padhai easy karo — seriously",
    description: "Flashcards, citations, mind maps — exam ke pehle aur baad mein bhi.",
    icon: GraduationCap,
    accent: "from-[hsl(var(--accent))] to-[hsl(var(--foreground))]",
  },
  {
    slug: "creator",
    name: "Content Creators",
    tagline: "Content banao — har platform ke liye",
    description: "Hashtags, captions, thumbnails — har post ke pehle ki tayyari.",
    icon: Camera,
    accent: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
  },
  {
    slug: "teenager",
    name: "Teenagers",
    tagline: "School se college tak — sab kuch yahan hai",
    description: "Resume, QR, picker, posts — life ke chhote-bade kaam, ek hi jagah.",
    icon: Sparkles,
    accent: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]",
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryToolCount(slug: ToolCategory): number {
  return tools.filter((t) => t.category === slug).length;
}
