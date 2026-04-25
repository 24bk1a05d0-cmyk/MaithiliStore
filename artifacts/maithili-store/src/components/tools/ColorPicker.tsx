import { useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{6})$/i.exec(hex);
  if (!m) return null;
  const i = parseInt(m[1], 16);
  return { r: (i >> 16) & 255, g: (i >> 8) & 255, b: i & 255 };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function ColorPicker() {
  const [hex, setHex] = useState("#C0392B");
  const [copied, setCopied] = useState("");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const formats = rgb && hsl
    ? [
        { label: "HEX", value: hex.toUpperCase() },
        { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: "Tailwind HSL", value: `${hsl.h} ${hsl.s}% ${hsl.l}%` },
      ]
    : [];

  function copy(label: string, value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 1200);
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-[260px_1fr]">
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-border p-8"
          style={{ background: hex }}
        >
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-32 w-32 cursor-pointer rounded-xl border-4 border-white shadow-lg"
            data-testid="input-color-picker"
          />
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              HEX
            </label>
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 font-mono text-base outline-none focus:border-primary"
              data-testid="input-hex"
            />
          </div>
          <div className="space-y-2">
            {formats.map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">
                    {f.label}
                  </p>
                  <code className="font-mono text-sm">{f.value}</code>
                </div>
                <button
                  type="button"
                  onClick={() => copy(f.label, f.value)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/70"
                >
                  {copied === f.label ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === f.label ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
