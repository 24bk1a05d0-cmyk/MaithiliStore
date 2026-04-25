import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const TEMPLATES = [
  "When ___ hits different.",
  "POV: you finally ___",
  "Soft launch: ___",
  "___ but make it aesthetic.",
  "Bata, kaisi lagi? ___",
  "This is your sign to ___",
  "Day ___ of ___",
  "Manifesting more of ___",
  "Currently obsessed with ___",
  "You can't sit with us if you don't ___",
  "Plot twist: ___",
  "Main character energy: ___",
  "Less talk, more ___",
  "Reminder: ___ is allowed.",
  "Behind the scenes of ___",
  "Catch me ___ on a Sunday.",
  "Ek aur reason to ___",
  "Bina filter — ___",
];

function fill(template: string, topic: string) {
  if (!topic) return template;
  return template.replaceAll("___", topic);
}

export function CaptionIdeas() {
  const [topic, setTopic] = useState("");
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  function shuffle() {
    setSeed((s) => s + 1);
  }

  const start = (seed * 6) % TEMPLATES.length;
  const list = Array.from({ length: 6 }, (_, i) => TEMPLATES[(start + i) % TEMPLATES.length]);

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1200);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Topic / theme (optional)
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="coffee dates, late night drives..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            data-testid="input-caption-topic"
          />
        </div>
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Naye dikhao
        </button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((tpl, i) => {
          const filled = fill(tpl, topic.trim());
          return (
            <li
              key={i + seed * 100}
              className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <p className="font-serif text-base leading-relaxed">{filled}</p>
              <button
                type="button"
                onClick={() => copy(filled, i)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground hover:bg-secondary/70"
                aria-label="Copy"
              >
                {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
