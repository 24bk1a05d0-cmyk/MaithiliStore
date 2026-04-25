import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Style = "APA" | "MLA" | "Chicago";

export function CitationGenerator() {
  const [authors, setAuthors] = useState("Sharma, A.");
  const [year, setYear] = useState("2026");
  const [title, setTitle] = useState("The Future of Indian UX Design");
  const [source, setSource] = useState("Maithili Journal");
  const [url, setUrl] = useState("https://maithili.store/article/123");
  const [style, setStyle] = useState<Style>("APA");
  const [copied, setCopied] = useState(false);

  function build(): string {
    const a = authors.trim() || "Anonymous";
    const y = year.trim();
    const t = title.trim();
    const s = source.trim();
    const u = url.trim();
    if (style === "APA") {
      return `${a} (${y}). ${t}. ${s}. ${u}`.trim();
    }
    if (style === "MLA") {
      return `${a}. "${t}." ${s}, ${y}, ${u}.`.trim();
    }
    return `${a}. "${t}." ${s} (${y}). ${u}.`.trim();
  }

  const out = build();
  function copy() {
    navigator.clipboard.writeText(out).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 rounded-xl border border-border bg-card p-1">
        {(["APA", "MLA", "Chicago"] as Style[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStyle(s)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              style === s ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            data-testid={`button-style-${s}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-3 rounded-2xl border border-border bg-card p-5 md:grid-cols-2">
        <Field label="Author(s)" value={authors} onChange={setAuthors} placeholder="Sharma, A." />
        <Field label="Year" value={year} onChange={setYear} placeholder="2026" />
        <Field label="Title" value={title} onChange={setTitle} placeholder="Article title" />
        <Field label="Source / Journal" value={source} onChange={setSource} placeholder="Journal name" />
        <Field label="URL" value={url} onChange={setUrl} placeholder="https://..." className="md:col-span-2" />
      </div>

      <div className="rounded-2xl border border-border bg-secondary/30 p-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {style} citation
          </p>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="font-serif text-base leading-relaxed">{out}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
