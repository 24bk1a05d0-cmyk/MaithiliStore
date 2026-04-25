import { useCallback, useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

function uuidv4() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => uuidv4()),
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regen = useCallback(() => {
    setList(Array.from({ length: count }, () => uuidv4()));
  }, [count]);

  function copy(value: string, idx: number) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    });
  }

  function copyAll() {
    navigator.clipboard.writeText(list.join("\n")).then(() => {
      setCopiedIdx(-1);
      setTimeout(() => setCopiedIdx(null), 1200);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <label className="text-sm font-medium">Kitne chahiye?</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-24 rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
          data-testid="input-uuid-count"
        />
        <button
          type="button"
          onClick={regen}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
          data-testid="button-uuid-generate"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
        </button>
        <button
          type="button"
          onClick={copyAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          {copiedIdx === -1 ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedIdx === -1 ? "Copied" : "Copy all"}
        </button>
      </div>
      <ul className="space-y-2">
        {list.map((id, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
          >
            <code className="font-mono text-sm">{id}</code>
            <button
              type="button"
              onClick={() => copy(id, i)}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1 text-xs font-medium hover:bg-secondary/70"
              data-testid={`button-copy-uuid-${i}`}
            >
              {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedIdx === i ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
