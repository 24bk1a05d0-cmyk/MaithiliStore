import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CategoryInfo } from "@/data/categories";
import { withBase } from "@/lib/utils";

interface Props {
  category: CategoryInfo;
  count: number;
  index?: number;
}

export function CategoryCard({ category, count, index = 0 }: Props) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
    >
      <Link href={withBase(`/category/${category.slug}`)} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-card-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`card-category-${category.slug}`}>
          <div
            className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${category.accent} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
          />
          <div className="relative">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Icon className="h-7 w-7" strokeWidth={2} />
            </div>
            <h3 className="mb-2 font-serif text-2xl font-semibold leading-tight">
              {category.name}
            </h3>
            <p className="mb-1 italic text-sm text-primary">{category.tagline}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          </div>
          <div className="relative mt-6 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              {count} tools
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform group-hover:translate-x-1">
              Dekho <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
    </motion.div>
  );
}
