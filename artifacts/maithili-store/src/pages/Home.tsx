import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, getCategoryToolCount } from "@/data/categories";
import { audiences } from "@/data/audiences";
import {
  getNewArrivals,
  getPopularTools,
  getToolBySlug,
  tools,
} from "@/data/tools";
import { useRecents } from "@/hooks/useRecents";
import { withBase } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "JSON formatter use kiya — ek hi page, kuch nahi maanga. Ab daily kholti hoon.",
    name: "Anya",
    role: "Frontend Developer, Bengaluru",
  },
  {
    quote:
      "Pomodoro timer ke saath thesis likhi. Kuch ads nahi, kuch popups nahi. Bas kaam.",
    name: "Rohit",
    role: "PhD Student, Pune",
  },
  {
    quote: "Invoice generator ne client ko 5 minute mein bill bhej diya. PDF ready.",
    name: "Sara",
    role: "Freelance Designer, Mumbai",
  },
  {
    quote: "First resume yahaan banaya. Print kiya, internship mil gayi. Sach mein.",
    name: "Aryan",
    role: "Class 12, Lucknow",
  },
];

export function HomePage() {
  const popular = getPopularTools(6);
  const newArrivals = getNewArrivals(8);
  const { recents } = useRecents();
  const recentTools = recents
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 4);

  return (
    <>
      <PageMeta
        title="Maithili Store"
        description="Maithili Store — Ek jagah. Sab kuch. Teenagers se professionals tak — har kaam ka tool yahan hai. Free, no login, no shor."
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background" />
        <FloatingTools />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 md:px-6 md:pb-24 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {tools.length} tools, ek hi store
            </span>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
              Ek jagah.
              <br />
              <span className="italic text-primary">Sab kuch.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Teenagers se professionals tak — har kaam ka tool yahan hai. Free.
              Bina login. Bina shor. Bas — aa, dekh, kaam kar, ja.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={withBase("/tools")} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5" data-testid="button-hero-cta">
                  Tools Dekho
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              <Link href={withBase("/categories")} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                  Categories Browse Karo
                </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK ACCESS — audience pills */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Tum kaun ho?
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {audiences.map((aud, i) => {
              const Icon = aud.icon;
              return (
                <motion.div
                  key={aud.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link href={withBase(`/for/${aud.slug}`)} className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary hover:text-primary-foreground" data-testid={`pill-audience-${aud.slug}`}>
                      <Icon className="h-4 w-4" />
                      {aud.shortLabel}
                    </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECENTS */}
      {recentTools.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <SectionHeader
            kicker="Aapne abhi dekha"
            title="Wahi tools, ek click door"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentTools.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* POPULAR */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          kicker="Aaj ke popular tools"
          title="Inhe sabse zyaada use kiya jaa raha hai"
          link={{ href: "/tools", label: "Sab tools dekho" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          kicker="Apna section dhundho"
          title="Har kaam ke liye ek shelf"
        />
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

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <SectionHeader
          kicker="Naye aaye hain —"
          title="Pehli baar yahaan"
          link={{ href: "/new", label: "Sab naye dekho" }}
        />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
          {newArrivals.map((t, i) => (
            <div
              key={t.slug}
              className="w-[280px] shrink-0 snap-start sm:w-[320px]"
            >
              <ToolCard tool={t} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <SectionHeader kicker="Inhe kaam aaya" title="Real users, real words" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-card-border bg-card p-6"
            >
              <blockquote className="font-serif text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-14 text-center text-background md:px-16 md:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl" />
          <div className="relative">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider opacity-70">
              Ek promise
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              Tumhe kaam karna hai —<br />
              <span className="italic text-accent">hum bas raasta saaf rakhte hain.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm opacity-80 md:text-base">
              Pehle tool, phir account. Pehle kaam, phir baat. Yeh store
              tumhare time ka respect karta hai.
            </p>
            <Link href={withBase("/tools")} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5">
                Shuru karo
                <ArrowRight className="h-4 w-4" />
              </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  kicker,
  title,
  link,
}: {
  kicker: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
          {kicker}
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={withBase(link.href)} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            {link.label} <ArrowRight className="h-4 w-4" />
          </Link>
      )}
    </div>
  );
}

function FloatingTools() {
  const positions = [
    { x: "8%", y: "22%", size: 38, delay: 0 },
    { x: "18%", y: "70%", size: 28, delay: 0.4 },
    { x: "82%", y: "30%", size: 44, delay: 0.2 },
    { x: "90%", y: "70%", size: 32, delay: 0.7 },
    { x: "70%", y: "12%", size: 26, delay: 0.9 },
    { x: "30%", y: "12%", size: 24, delay: 1.1 },
  ];
  const sample = [
    "{ }",
    "</>",
    "#",
    "@",
    "()",
    "[]",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      {positions.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 0.18, y: [0, -10, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute font-mono font-bold text-primary"
          style={{ left: p.x, top: p.y, fontSize: p.size }}
        >
          {sample[i]}
        </motion.span>
      ))}
    </div>
  );
}
