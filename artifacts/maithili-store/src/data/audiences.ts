import {
  Sparkles,
  Palette,
  Code2,
  Camera,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { Audience } from "./tools";

export interface AudienceInfo {
  slug: Audience;
  shortLabel: string;
  longLabel: string;
  headline: string;
  subhead: string;
  tone: string;
  icon: LucideIcon;
  emoji: string;
}

export const audiences: AudienceInfo[] = [
  {
    slug: "teenagers",
    shortLabel: "Teenagers",
    longLabel: "For teenagers",
    headline: "School se college tak — sab kuch yahan hai",
    subhead:
      "Pehla resume. Pehla QR code. Pehli presentation. Sab tools jo school ne nahi sikhaye.",
    tone: "casual",
    icon: Sparkles,
    emoji: "🎒",
  },
  {
    slug: "designers",
    shortLabel: "Designers",
    longLabel: "For designers",
    headline: "Design karo — bina ruke",
    subhead: "Color, contrast, ratio, compress — flow toot-ne se pehle yahan dhundh lo.",
    tone: "visual",
    icon: Palette,
    emoji: "",
  },
  {
    slug: "developers",
    shortLabel: "Developers",
    longLabel: "For developers",
    headline: "Code. Debug. Ship.",
    subhead:
      "JSON, regex, base64, UUID — woh tools jo Stack Overflow tab open karne se faster hain.",
    tone: "minimal",
    icon: Code2,
    emoji: "",
  },
  {
    slug: "creators",
    shortLabel: "Content Creators",
    longLabel: "For content creators",
    headline: "Content banao — har platform ke liye",
    subhead: "Hashtag, caption, thumbnail, ratio — post karne se pehle ki tayyari.",
    tone: "trendy",
    icon: Camera,
    emoji: "",
  },
  {
    slug: "students",
    shortLabel: "Students",
    longLabel: "For students",
    headline: "Padhai easy karo — seriously",
    subhead:
      "Flashcards. Citations. Pomodoro. Mind maps. Exam se pehle wala sab kuch.",
    tone: "friendly",
    icon: GraduationCap,
    emoji: "",
  },
  {
    slug: "professionals",
    shortLabel: "Working Professionals",
    longLabel: "For working professionals",
    headline: "Office ka kaam — jaldi khatam karo",
    subhead:
      "Invoice, timer, word count, email templates — chai ke break se pehle nipta do.",
    tone: "efficient",
    icon: Briefcase,
    emoji: "",
  },
];

export function getAudience(slug: string): AudienceInfo | undefined {
  return audiences.find((a) => a.slug === slug);
}
