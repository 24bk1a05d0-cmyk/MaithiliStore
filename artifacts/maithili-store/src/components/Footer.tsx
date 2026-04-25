import { Link } from "wouter";
import { Github, Twitter, Instagram } from "lucide-react";
import { withBase } from "@/lib/utils";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={withBase("/")} className="inline-flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-lg font-bold">
                  म
                </span>
                <span className="font-serif text-lg font-semibold tracking-tight">
                  Maithili Store
                </span>
              </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Ek aisi jagah jahan har kaam ka tool mile. Free. Bina login ke. Bina
              shor ke. Bas — aa, dekh, kaam kar, ja.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-foreground">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link href={withBase(`/category/${cat.slug}`)} className="text-muted-foreground hover:text-foreground">
                      {cat.name}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={withBase("/tools")} className="text-muted-foreground hover:text-foreground">All Tools</Link>
              </li>
              <li>
                <Link href={withBase("/new")} className="text-muted-foreground hover:text-foreground">New Arrivals</Link>
              </li>
              <li>
                <Link href={withBase("/saved")} className="text-muted-foreground hover:text-foreground">Saved</Link>
              </li>
              <li>
                <Link href={withBase("/about")} className="text-muted-foreground hover:text-foreground">About</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>Made with <span className="text-primary">♥</span> in Maithili spirit.</p>
          <p className="font-mono">
            © {new Date().getFullYear()} Maithili Store. Sab kuch free.
          </p>
        </div>
      </div>
    </footer>
  );
}
