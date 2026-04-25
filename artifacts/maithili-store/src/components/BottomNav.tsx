import { Link, useLocation } from "wouter";
import { Home, Wrench, Search, Heart, Grid3x3 } from "lucide-react";
import { useState } from "react";
import { withBase, cn } from "@/lib/utils";
import { SearchPalette } from "./SearchPalette";

export function BottomNav() {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "Search", href: null, icon: Search, action: () => setSearchOpen(true) },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "More", href: "/categories", icon: Grid3x3 },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/90 backdrop-blur-lg md:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-around px-2 py-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.href != null && location === withBase(item.href);
            const cls = cn(
              "flex min-w-[60px] flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            );
            if (item.href) {
              return (
                <Link key={item.label} href={withBase(item.href)} className={cls} data-testid={`bottom-nav-${item.label.toLowerCase()}`}>
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </Link>
              );
            }
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={cls}
                data-testid={`bottom-nav-${item.label.toLowerCase()}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
