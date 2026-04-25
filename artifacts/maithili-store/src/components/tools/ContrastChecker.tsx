import { useMemo, useState } from "react";

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{6})$/i.exec(hex);
  if (!m) return null;
  const i = parseInt(m[1], 16);
  return { r: (i >> 16) & 255, g: (i >> 8) & 255, b: i & 255 };
}

function lum({ r, g, b }: { r: number; g: number; b: number }) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(hex1: string, hex2: string) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  if (!a || !b) return 1;
  const l1 = lum(a);
  const l2 = lum(b);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

export function ContrastChecker() {
  const [fg, setFg] = useState("#2C3E50");
  const [bg, setBg] = useState("#FAF3E0");

  const ratio = useMemo(() => contrast(fg, bg), [fg, bg]);
  const r = ratio.toFixed(2);

  const checks = [
    { name: "AA Normal text", req: 4.5, pass: ratio >= 4.5 },
    { name: "AA Large text", req: 3.0, pass: ratio >= 3.0 },
    { name: "AAA Normal text", req: 7.0, pass: ratio >= 7.0 },
    { name: "AAA Large text", req: 4.5, pass: ratio >= 4.5 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <ColorInput label="Foreground" value={fg} onChange={setFg} />
        <ColorInput label="Background" value={bg} onChange={setBg} />
      </div>

      <div
        className="rounded-2xl border border-border p-8 text-center"
        style={{ background: bg, color: fg }}
      >
        <p className="font-serif text-3xl font-bold">Yeh kaisa dikh raha hai?</p>
        <p className="mt-2 text-base">
          Normal text — kya readable hai background ke saath?
        </p>
        <p className="mt-2 text-sm">Small text. Body copy. Captions.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Contrast ratio
          </p>
          <p className="font-serif text-3xl font-bold">{r} : 1</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {checks.map((c) => (
            <li
              key={c.name}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                c.pass
                  ? "bg-green-500/10 text-green-700 dark:text-green-300"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              <span>{c.name}</span>
              <span className="font-semibold">{c.pass ? "Pass" : "Fail"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-2 rounded-xl border border-border bg-card p-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-md border border-border"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-2 font-mono text-sm outline-none"
        />
      </div>
    </div>
  );
}
