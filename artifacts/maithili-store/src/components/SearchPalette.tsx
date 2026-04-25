import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Search, X, ArrowRight, Hash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { searchTools } from "@/lib/search";
import { tools } from "@/data/tools";
import { withBase } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = query
    ? searchTools(query, 12)
    : tools.filter((t) => t.tags.includes("popular")).slice(0, 6);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={onClose}
          data-testid="search-palette-backdrop"
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-card-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-card-border px-5 py-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kya dhundh rahe ho?"
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                data-testid="input-search-palette"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"
                aria-label="Band karo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!query && (
                <p className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Popular tools
                </p>
              )}
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    Kuch nahi mila — naam thoda alag try karo.
                  </p>
                </div>
              ) : (
                <ul>
                  {results.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <li key={tool.slug}>
                        <Link href={withBase(`/tool/${tool.slug}`)} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary" data-testid={`search-result-${tool.slug}`}>
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium">{tool.name}</p>
                              <p className="truncate text-xs text-muted-foreground">
                                {tool.description}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-card-border bg-secondary/40 px-5 py-2.5 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                {tools.length} tools available
              </span>
              <span>
                Press{" "}
                <kbd className="rounded bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
