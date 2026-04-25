import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { getCategory } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { withBase } from "@/lib/utils";

interface Props {
  slug: string;
}

export function CategoryPage({ slug }: Props) {
  const cat = getCategory(slug);
  if (!cat) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
        <h1 className="font-serif text-4xl font-bold">Yeh shelf nahi mili.</h1>
        <p className="mt-3 text-muted-foreground">
          Naam thoda alag try karo, ya sab categories dekh lo.
        </p>
        <Link href={withBase("/categories")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Sab categories
          </Link>
      </section>
    );
  }

  const tools = getToolsByCategory(cat.slug);
  const Icon = cat.icon;

  return (
    <>
      <PageMeta title={cat.name} description={cat.description} />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <Link href={withBase("/categories")} className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Sab categories
            </Link>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                {cat.name}
              </h1>
              <p className="mt-2 italic text-primary">{cat.tagline}</p>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                {cat.description}
              </p>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              {tools.length} tools
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {tools.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Iss section mein abhi tools tayyar ho rahe hain. Jaldi aate hain.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
