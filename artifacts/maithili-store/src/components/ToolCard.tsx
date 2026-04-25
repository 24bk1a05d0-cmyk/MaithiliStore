import { Link } from "wouter";
import { Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Tool } from "@/data/tools";
import { useBookmarks } from "@/hooks/useBookmarks";
import { withBase } from "@/lib/utils";

interface Props {
  tool: Tool;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: Props) {
  const { isBookmarked, toggle } = useBookmarks();
  const Icon = tool.icon;
  const saved = isBookmarked(tool.slug);
  const isNew = tool.tags.includes("new");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35 }}
      className="group relative h-full"
    >
      <Link href={withBase(`/tool/${tool.slug}`)} className="relative flex h-full flex-col rounded-2xl border border-card-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`card-tool-${tool.slug}`}>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <div className="flex items-center gap-2">
              {isNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  <Sparkles className="h-3 w-3" /> Naya
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(tool.slug);
                }}
                aria-label={saved ? "Bookmark hata do" : "Bookmark karo"}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                data-testid={`button-bookmark-${tool.slug}`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={saved ? "currentColor" : "none"}
                  strokeWidth={2}
                  color={saved ? "hsl(var(--primary))" : undefined}
                />
              </button>
            </div>
          </div>

          <h3 className="mb-1.5 font-serif text-lg font-semibold leading-tight text-foreground">
            {tool.name}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {tool.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.includes("free") && (
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                  Free
                </span>
              )}
              {!tool.isImplemented && (
                <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  Jaldi aayega
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Use Karo
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
    </motion.div>
  );
}
