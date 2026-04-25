import { useMemo, useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

const SAMPLE = `{"name":"Maithili","tools":["json","regex","palette"],"free":true}`;

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true, output: "", error: "" };
    try {
      const parsed = JSON.parse(input);
      return { ok: true, output: JSON.stringify(parsed, null, indent), error: "" };
    } catch (e) {
      return { ok: false, output: "", error: (e as Error).message };
    }
  }, [input, indent]);

  function copyOut() {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Indent:</label>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm"
          data-testid="select-indent"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={0}>Minify</option>
        </select>
        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          className="ml-auto text-xs font-medium text-muted-foreground hover:text-primary"
        >
          Sample load karo
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Input (raw JSON)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
            placeholder='{"hello":"world"}'
            data-testid="textarea-json-input"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Output
            </label>
            <button
              type="button"
              onClick={copyOut}
              disabled={!result.output}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground disabled:opacity-50"
              data-testid="button-copy-json"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          {result.ok ? (
            <pre className="h-[336px] overflow-auto rounded-xl border border-border bg-secondary/30 p-4 font-mono text-sm">
              {result.output || (
                <span className="text-muted-foreground">Output yahan dikhega.</span>
              )}
            </pre>
          ) : (
            <div className="flex h-[336px] flex-col items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                <AlertCircle className="h-4 w-4" />
                JSON valid nahi hai
              </div>
              <code className="font-mono text-xs text-destructive/90">
                {result.error}
              </code>
              <p className="mt-1 text-xs text-muted-foreground">
                Tip: extra comma ya missing quote check karo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
