import { Link } from "wouter";
import { Heart, ArrowRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getToolBySlug } from "@/data/tools";
import { withBase } from "@/lib/utils";

export function SavedPage() {
  const { bookmarks, clear } = useBookmarks();
  const tools = bookmarks
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <PageMeta
        title="Saved tools"
        description="Aapne jo tools bookmark kiye hain — sab ek jagah par."
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Aapke saath
          </p>
          <h1 className="mb-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Saved tools
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Jo tools aapko pasand aaye — sab ek shelf par. Browser ke andar
            store hote hain, kahin nahi jaate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {tools.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
            <Heart className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="font-serif text-2xl font-semibold">Abhi tak kuch save nahi kiya</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Jo tools daily kaam aate hain, unhe heart icon se save kar lo. Yahan
              ek hi click mein milte hain.
            </p>
            <Link href={withBase("/tools")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                Tools dekho <ArrowRight className="h-4 w-4" />
              </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-sm text-muted-foreground">
                {tools.length} saved
              </p>
              <button
                type="button"
                onClick={clear}
                className="text-xs font-medium text-muted-foreground hover:text-primary"
                data-testid="button-clear-saved"
              >
                Sab clear karo
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
