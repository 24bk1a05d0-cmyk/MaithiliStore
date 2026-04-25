import { useMemo, useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { searchTools } from "@/lib/search";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

type Sort = "popular" | "new" | "az";
type Filt = "all" | "free" | "paid";

export function ToolsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [filt, setFilt] = useState<Filt>("all");
  const [cat, setCat] = useState<string>("all");

  const list = useMemo(() => {
    let result = query ? searchTools(query, 100) : [...tools];
    if (cat !== "all") result = result.filter((t) => t.category === cat);
    if (filt === "free") result = result.filter((t) => t.tags.includes("free"));
    if (filt === "paid") result = result.filter((t) => !t.tags.includes("free"));

    if (!query) {
      if (sort === "popular") {
        result = result.sort((a, b) =>
          (b.tags.includes("popular") ? 1 : 0) -
          (a.tags.includes("popular") ? 1 : 0),
        );
      } else if (sort === "new") {
        result = result.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));
      } else {
        result = result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
    return result;
  }, [query, sort, filt, cat]);

  return (
    <>
      <PageMeta
        title="Sab tools"
        description="Maithili Store ke saare tools — JSON, regex, palette, invoice, pomodoro aur bahut kuch. Search karo, filter karo, kaam karo."
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Sab tools — ek hi shelf pe
          </p>
          <h1 className="mb-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Tumhe kya chahiye?
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {tools.length} tools, {tools.filter((t) => t.isImplemented).length}{" "}
            ready to use, baaki jaldi aa rahe hain. Naam type karo ya filter
            laga ke dhundho.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tool ka naam ya kaam likho — jaise resume, json, palette..."
              className="flex-1 bg-transparent text-base outline-none"
              data-testid="input-tools-search"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:px-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filters:
          </span>
          <Pill active={cat === "all"} onClick={() => setCat("all")}>
            Sab
          </Pill>
          {categories.map((c) => (
            <Pill key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
              {c.name}
            </Pill>
          ))}
          <span className="mx-2 hidden h-5 w-px bg-border md:block" />
          <Pill active={filt === "all"} onClick={() => setFilt("all")}>
            Sab
          </Pill>
          <Pill active={filt === "free"} onClick={() => setFilt("free")}>
            Free
          </Pill>
          <span className="mx-2 hidden h-5 w-px bg-border md:block" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
            aria-label="Sort tools"
            data-testid="select-sort"
          >
            <option value="popular">Popular</option>
            <option value="new">Naye pehle</option>
            <option value="az">A-Z</option>
          </select>
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {list.length} {list.length === 1 ? "tool" : "tools"}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
            <p className="font-serif text-2xl">Kuch nahi mila.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Filter hata ke try karo — ya naam thoda chhota karke search karo.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCat("all");
                setFilt("all");
              }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Sab clear karo
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
