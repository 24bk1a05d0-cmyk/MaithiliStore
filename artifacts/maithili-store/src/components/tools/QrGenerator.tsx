import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";

export function QrGenerator() {
  const [text, setText] = useState("https://maithili.store");
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState("#2C3E50");
  const [bg, setBg] = useState("#FAF3E0");
  const wrapperRef = useRef<HTMLDivElement>(null);

  function downloadPng() {
    const svg = wrapperRef.current?.querySelector("svg");
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "maithili-qr.png";
      link.click();
    };
    img.src = url;
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_auto]">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            URL ya text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-xl border border-border bg-card p-4 font-mono text-sm outline-none focus:border-primary"
            data-testid="textarea-qr-text"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Size
            </label>
            <input
              type="range"
              min={128}
              max={512}
              step={16}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <p className="mt-1 font-mono text-xs text-muted-foreground">{size}px</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Color
              </label>
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Background
              </label>
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={downloadPng}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
          data-testid="button-download-qr"
        >
          <Download className="h-4 w-4" /> PNG download karo
        </button>
      </div>
      <div
        ref={wrapperRef}
        className="flex h-fit items-center justify-center rounded-2xl border border-border p-6"
        style={{ background: bg }}
      >
        <QRCodeSVG value={text || " "} size={size} fgColor={fg} bgColor={bg} level="M" />
      </div>
    </div>
  );
}
