import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";

const SAMPLE_TEXT = `Email: hello@maithili.store
Email: test@example.com
Phone: +91 98765 43210
Phone: +1 555-1234`;

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b[\\w.-]+@[\\w.-]+\\.[a-z]{2,}\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(SAMPLE_TEXT);

  const result = useMemo(() => {
    if (!pattern) return { ok: true, matches: [] as string[], error: "" };
    try {
      const re = new RegExp(pattern, flags);
      const matches: string[] = [];
      const isGlobal = flags.includes("g");
      if (isGlobal) {
        let m: RegExpExecArray | null;
        while ((m = re.exec(text)) !== null) {
          matches.push(m[0]);
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = text.match(re);
        if (m) matches.push(m[0]);
      }
      return { ok: true, matches, error: "" };
    } catch (e) {
      return { ok: false, matches: [], error: (e as Error).message };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result.ok || !pattern) return text;
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return text.replace(
        re,
        (m) => `<<MARK>>${m.replace(/<<MARK>>/g, "")}<<END>>`,
      );
    } catch {
      return text;
    }
  }, [text, pattern, flags, result.ok]);

  function toggleFlag(f: string) {
    setFlags((cur) =>
      cur.includes(f) ? cur.replace(f, "") : cur + f,
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Pattern
        </label>
        <div className="flex items-stretch gap-2">
          <span className="flex items-center font-mono text-lg text-muted-foreground">
            /
          </span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            data-testid="input-regex-pattern"
          />
          <span className="flex items-center font-mono text-lg text-muted-foreground">
            /
          </span>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
            className="w-24 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            placeholder="gi"
            data-testid="input-regex-flags"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["g", "i", "m", "s"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggleFlag(f)}
              className={`rounded-md px-2.5 py-1 font-mono text-xs ${
                flags.includes(f)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Test text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
          data-testid="textarea-regex-text"
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
          <div>
            <p className="text-sm font-semibold text-destructive">Pattern invalid</p>
            <code className="text-xs text-destructive/90">{result.error}</code>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Matches highlighted ({result.matches.length})
            </p>
            <pre
              className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: escapeHtml(highlighted)
                  .replaceAll(
                    "&lt;&lt;MARK&gt;&gt;",
                    '<mark class="bg-accent/30 text-foreground rounded px-0.5">',
                  )
                  .replaceAll("&lt;&lt;END&gt;&gt;", "</mark>"),
              }}
            />
          </div>
          {result.matches.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Matches ({result.matches.length})
              </p>
              <ul className="space-y-1">
                {result.matches.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-md bg-secondary px-3 py-1.5 font-mono text-sm"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
