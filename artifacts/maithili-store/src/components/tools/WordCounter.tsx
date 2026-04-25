import { useMemo, useState } from "react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || 1
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter(Boolean).length
      : 0;
    const readingMin = Math.max(0, Math.ceil(words / 200));
    return { words, chars, charsNoSpace, sentences, paragraphs, readingMin };
  }, [text]);

  const items = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "Without spaces", value: stats.charsNoSpace },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: `${stats.readingMin} min` },
  ];

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Yahan likho ya paste karo..."
        className="w-full resize-y rounded-xl border border-border bg-card p-4 text-base outline-none focus:border-primary"
        data-testid="textarea-word-counter"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {it.label}
            </p>
            <p className="mt-1 font-serif text-2xl font-bold">{it.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
