import { useState } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, Maithili!");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function compute(): string {
    setError("");
    try {
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)));
      }
      return decodeURIComponent(escape(atob(input.trim())));
    } catch (e) {
      setError("Decode nahi ho paaya — input check karo.");
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
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            mode === "encode"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
          data-testid="button-mode-encode"
        >
          Encode
        </button>
        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            mode === "decode"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
          data-testid="button-mode-decode"
        >
          Decode
        </button>
      </div>

      <div>
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {mode === "encode" ? "Plain text" : "Base64 string"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
          data-testid="textarea-base64-input"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {mode === "encode" ? "Base64 output" : "Decoded text"}
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
        <pre className="min-h-[120px] overflow-auto rounded-xl border border-border bg-secondary/30 p-4 font-mono text-sm break-all">
          {output || (
            <span className="text-muted-foreground">Output yahan dikhega.</span>
          )}
        </pre>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
