import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Sun, Moon, Menu, X, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { withBase, cn } from "@/lib/utils";
import { SearchPalette } from "./SearchPalette";

const NAV = [
  { label: "Tools", href: "/tools" },
  { label: "Categories", href: "/categories" },
  { label: "New", href: "/new" },
  { label: "About", href: "/about" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTyping =
        tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMobileNav(false);
  }, [location]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
          <Link href={withBase("/")} className="group flex items-center gap-2.5" data-testid="link-home-logo">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-lg font-bold">
                म
              </span>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="font-serif text-base font-semibold tracking-tight">
                  Maithili Store
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Har kaam ka ek tool
                </span>
              </div>
            </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = location === withBase(item.href);
              return (
                <Link key={item.href} href={withBase(item.href)} className={cn( "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground", )} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                    {item.label}
                  </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary"
              aria-label="Search"
              data-testid="button-open-search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Kya dhundh rahe ho?</span>
              <kbd className="hidden rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] sm:inline">
                /
              </kbd>
            </button>
            <Link href={withBase("/saved")} className="hidden rounded-xl border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary md:inline-flex" aria-label="Saved tools" data-testid="link-saved">
                <Heart className="h-4 w-4" />
              </Link>
            <button
              type="button"
              onClick={toggle}
              className="rounded-xl border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileNav((v) => !v)}
              className="rounded-xl border border-border bg-card p-2 text-muted-foreground md:hidden"
              aria-label="Menu"
              data-testid="button-mobile-menu"
            >
              {mobileNav ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileNav && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="border-t border-border bg-background md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => (
                <Link key={item.href} href={withBase(item.href)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                    {item.label}
                  </Link>
              ))}
              <Link href={withBase("/saved")} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                  Saved
                </Link>
            </nav>
          </motion.div>
        )}
      </header>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
