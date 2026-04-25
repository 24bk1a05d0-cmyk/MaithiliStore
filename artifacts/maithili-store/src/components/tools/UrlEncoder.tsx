import { useState } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";

export function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://maithili.store/?q=hello world&page=1");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function compute(): string {
    setError("");
    try {
      return mode === "encode"
        ? encodeURIComponent(input)
        : decodeURIComponent(input);
    } catch {
      setError("Invalid URL string.");
      return "";
    }
  }

  const output = compute();
  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => setMode("encode")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
            mode === "encode" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Encode
        </button>
        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
            mode === "decode" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Decode
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
        data-testid="textarea-url-input"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Output
          </label>
          <button
            type="button"
            onClick={copy}
            disabled={!output}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground disabled:opacity-50"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="min-h-[100px] overflow-auto rounded-xl border border-border bg-secondary/30 p-4 font-mono text-sm break-all">
          {output || (
            <span className="text-muted-foreground">Output yahan dikhega.</span>
          )}
        </pre>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
