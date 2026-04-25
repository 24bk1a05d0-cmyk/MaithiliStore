import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { getNewArrivals } from "@/data/tools";

export function NewArrivalsPage() {
  const tools = getNewArrivals(50);
  return (
    <>
      <PageMeta
        title="Naye tools"
        description="Maithili Store mein recently added tools — sabse pehle yahaan."
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Pehli baar yahaan
          </p>
          <h1 className="mb-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Naye aaye hain
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Recent additions — fresh arrivals jo abhi store mein aaye hain.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
