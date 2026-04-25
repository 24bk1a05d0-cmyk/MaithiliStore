import { PageMeta } from "@/components/PageMeta";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, getCategoryToolCount } from "@/data/categories";

export function CategoriesPage() {
  return (
    <>
      <PageMeta
        title="Categories"
        description="Apna section dhundho. Developers, designers, students, professionals — sab ke liye alag shelf."
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Apna section dhundho
          </p>
          <h1 className="mb-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Har kaam ke liye, ek shelf.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Designer, developer, student — har ek alag bhasha bolta hai. Yahan
            har kisi ki bhasha samjhi jaati hai.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={getCategoryToolCount(cat.slug)}
              index={i}
            />
          ))}
        </div>
      </section>
    </>
  );
}
