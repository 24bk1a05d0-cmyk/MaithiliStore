import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Heart, Lightbulb, ListChecks, Users } from "lucide-react";
import { motion } from "framer-motion";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { getRelatedTools, getToolBySlug } from "@/data/tools";
import { TOOL_COMPONENTS } from "@/components/tools";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRecents } from "@/hooks/useRecents";
import { withBase, cn } from "@/lib/utils";

interface Props {
  slug: string;
}

export function ToolPage({ slug }: Props) {
  const tool = getToolBySlug(slug);
  const { isBookmarked, toggle } = useBookmarks();
  const { push } = useRecents();

  useEffect(() => {
    if (tool) push(tool.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!tool) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
        <h1 className="font-serif text-4xl font-bold">Tool nahi mila.</h1>
        <p className="mt-3 text-muted-foreground">
          Naam thoda alag try karo, ya saare tools dekh lo.
        </p>
        <Link href={withBase("/tools")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            All tools
          </Link>
      </section>
    );
  }

  const Icon = tool.icon;
  const Component = TOOL_COMPONENTS[tool.slug];
  const related = getRelatedTools(tool, 3);
  const saved = isBookmarked(tool.slug);

  return (
    <>
      <PageMeta title={tool.name} description={tool.description} />

      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
          <Link href={withBase("/tools")} className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Sab tools
            </Link>
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
                  {tool.name}
                </h1>
                <p className="mt-1 text-base text-muted-foreground md:text-lg">
                  {tool.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-card px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle(tool.slug)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                saved
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary",
              )}
              data-testid="button-toggle-bookmark"
            >
              <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save karo"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        {Component ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Component />
          </motion.div>
        ) : (
          <ComingSoon name={tool.name} />
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tool.howTo && tool.howTo.length > 0 && (
            <Card icon={ListChecks} title="Kaise use karein">
              <ol className="space-y-2 text-sm">
                {tool.howTo.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          )}
          {tool.whoFor && (
            <Card icon={Users} title="Yeh kis ke liye hai">
              <p className="text-sm leading-relaxed text-muted-foreground">{tool.whoFor}</p>
            </Card>
          )}
          {tool.tip && (
            <Card icon={Lightbulb} title="Pro tip">
              <p className="text-sm leading-relaxed text-muted-foreground">{tool.tip}</p>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <FeedbackWidget slug={tool.slug} />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <h2 className="font-serif text-2xl font-semibold">Related tools</h2>
              <Link href={withBase("/tools")} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Sab dekho <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof ListChecks;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mb-2 font-serif text-base font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
        <Lightbulb className="h-6 w-6 text-primary" />
      </div>
      <h2 className="font-serif text-2xl font-semibold">Yeh tool jaldi aayega</h2>
      <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
        <em>{name}</em> abhi tayyari mein hai. Tab tak doosre tools try karo —
        kaafi sab kuch ready hai.
      </p>
      <Link href={withBase("/tools")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Doosre tools dekho
          <ArrowRight className="h-4 w-4" />
        </Link>
    </div>
  );
}
