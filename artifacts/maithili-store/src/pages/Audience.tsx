import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { audiences } from "@/data/audiences";
import { getToolsByAudience } from "@/data/tools";
import { withBase } from "@/lib/utils";

interface Props {
  slug: string;
}

export function AudiencePage({ slug }: Props) {
  const aud = audiences.find((a) => a.slug === slug);
  if (!aud) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
        <h1 className="font-serif text-4xl font-bold">Yeh page nahi mila.</h1>
        <Link href={withBase("/")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Home par jao
          </Link>
      </section>
    );
  }

  const audTools = getToolsByAudience(aud.slug);
  const Icon = aud.icon;

  return (
    <>
      <PageMeta title={aud.longLabel} description={aud.subhead} />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <Link href={withBase("/")} className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/60 px-3 py-1 text-xs font-medium">
              <Icon className="h-3.5 w-3.5" /> {aud.longLabel}
            </p>
            <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
              {aud.headline}
              {aud.emoji && <span className="ml-2">{aud.emoji}</span>}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              {aud.subhead}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Tumhare liye chuni hui
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            {audTools.length} tools, sab kuch yahan
          </h2>
        </div>
        {audTools.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Iss section ke liye tools jaldi aa rahe hain.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audTools.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        )}
        <div className="mt-12 rounded-3xl border border-border bg-secondary/40 p-8 text-center md:p-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Aur dekhna hai?
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
            Saare tools dekho
          </h3>
          <Link href={withBase("/tools")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:-translate-y-0.5 transition-transform">
              All tools
              <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
      </section>
    </>
  );
}
