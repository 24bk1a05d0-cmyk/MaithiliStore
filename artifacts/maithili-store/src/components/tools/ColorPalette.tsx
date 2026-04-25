import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToHsl(hex: string) {
  const m = /^#?([a-f\d]{6})$/i.exec(hex);
  if (!m) return null;
  const i = parseInt(m[1], 16);
  let r = ((i >> 16) & 255) / 255;
  let g = ((i >> 8) & 255) / 255;
  let b = (i & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return (
    "#" +
    [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

type Mode = "complementary" | "analogous" | "triadic" | "shades";

export function ColorPalette() {
  const [base, setBase] = useState("#C0392B");
  const [mode, setMode] = useState<Mode>("analogous");
  const [copied, setCopied] = useState<string>("");

  const palette = useMemo(() => {
    const hsl = hexToHsl(base);
    if (!hsl) return [];
    const { h, s, l } = hsl;
    if (mode === "complementary") {
      return [
        hslToHex(h, s, Math.max(20, l - 20)),
        hslToHex(h, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 180) % 360, s, Math.min(80, l + 15)),
      ];
    }
    if (mode === "analogous") {
      return [-30, -15, 0, 15, 30].map((d) =>
        hslToHex((h + d + 360) % 360, s, l),
      );
    }
    if (mode === "triadic") {
      return [
        hslToHex(h, s, l),
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
      ];
    }
    // shades
    return [10, 25, 40, 55, 70, 85].map((nl) => hslToHex(h, s, nl));
  }, [base, mode]);

  function copy(c: string) {
    navigator.clipboard.writeText(c).then(() => {
      setCopied(c);
      setTimeout(() => setCopied(""), 1200);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        <input
          type="color"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="h-12 w-12 cursor-pointer rounded-lg border border-border"
          data-testid="input-palette-base"
        />
        <input
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
        />
        <div className="ml-auto flex flex-wrap gap-2">
          {(["analogous", "complementary", "triadic", "shades"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${
                mode === m
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {palette.map((c, i) => (
          <button
            key={c + i}
            type="button"
            onClick={() => copy(c)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1"
            data-testid={`button-palette-${i}`}
          >
            <div className="h-28 w-full" style={{ background: c }} />
            <div className="flex items-center justify-between px-4 py-3 text-left">
              <code className="font-mono text-sm">{c.toUpperCase()}</code>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                {copied === c ? (
                  <>
                    <Check className="h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy
                  </>
                )}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
