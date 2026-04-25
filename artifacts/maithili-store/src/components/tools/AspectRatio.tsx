import { useState } from "react";

export function AspectRatio() {
  const [ratioW, setRatioW] = useState(16);
  const [ratioH, setRatioH] = useState(9);
  const [width, setWidth] = useState(1920);
  const [mode, setMode] = useState<"fromW" | "fromH">("fromW");
  const [height, setHeight] = useState(1080);

  function setW(v: number) {
    setWidth(v);
    setHeight(Math.round((v * ratioH) / ratioW));
    setMode("fromW");
  }
  function setH(v: number) {
    setHeight(v);
    setWidth(Math.round((v * ratioW) / ratioH));
    setMode("fromH");
  }
  function setRatio(rw: number, rh: number) {
    setRatioW(rw);
    setRatioH(rh);
    if (mode === "fromW") {
      setHeight(Math.round((width * rh) / rw));
    } else {
      setWidth(Math.round((height * rw) / rh));
    }
  }

  const presets = [
    { w: 16, h: 9, label: "16:9 — YouTube" },
    { w: 9, h: 16, label: "9:16 — Reels" },
    { w: 1, h: 1, label: "1:1 — Insta post" },
    { w: 4, h: 5, label: "4:5 — Insta portrait" },
    { w: 4, h: 3, label: "4:3 — Classic" },
    { w: 21, h: 9, label: "21:9 — Cinema" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Aspect ratio
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={ratioW}
              onChange={(e) => setRatio(Math.max(1, Number(e.target.value)), ratioH)}
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-base"
            />
            <span className="text-lg text-muted-foreground">:</span>
            <input
              type="number"
              min={1}
              value={ratioH}
              onChange={(e) => setRatio(ratioW, Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-base"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setRatio(p.w, p.h)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  ratioW === p.w && ratioH === p.h
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Dimensions
          </p>
          <label className="block text-xs text-muted-foreground">Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setW(Math.max(1, Number(e.target.value)))}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-base"
            data-testid="input-width"
          />
          <label className="mt-3 block text-xs text-muted-foreground">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setH(Math.max(1, Number(e.target.value)))}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-base"
            data-testid="input-height"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Final size
        </p>
        <p className="mt-2 font-serif text-3xl font-bold">
          {width} <span className="text-muted-foreground">×</span> {height}
        </p>
        <div
          className="mx-auto mt-4 max-h-48 w-full max-w-md rounded-lg border border-dashed border-border bg-secondary/40"
          style={{ aspectRatio: `${ratioW} / ${ratioH}` }}
        />
      </div>
    </div>
  );
}
