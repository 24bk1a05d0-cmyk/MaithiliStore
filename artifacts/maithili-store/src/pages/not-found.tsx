import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { withBase } from "@/lib/utils";
import { PageMeta } from "@/components/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page nahi mila" description="Yeh page exist nahi karta — wapas home jao." />
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <p className="font-mono text-sm uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-4 font-serif text-5xl font-bold tracking-tight md:text-7xl">
          Yeh page nahi mila.
        </h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          Aap kahin galat mod le aaye. Koi baat nahi — neeche se wapas chalein.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={withBase("/")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform">
              Home par jao
              <ArrowRight className="h-4 w-4" />
            </Link>
          <Link href={withBase("/tools")} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              Sab tools
            </Link>
        </div>
      </section>
    </>
  );
}
