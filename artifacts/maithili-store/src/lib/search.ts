import Fuse from "fuse.js";
import { tools, type Tool } from "@/data/tools";

const fuse = new Fuse(tools, {
  keys: [
    { name: "name", weight: 0.45 },
    { name: "description", weight: 0.15 },
    { name: "synonyms", weight: 0.25 },
    { name: "tags", weight: 0.05 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 1,
});

export function searchTools(query: string, limit = 30): Tool[] {
  const q = query.trim();
  if (!q) return [];
  return fuse.search(q, { limit }).map((r) => r.item);
}
