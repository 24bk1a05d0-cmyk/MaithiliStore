import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type Mode = "work" | "short" | "long";

const DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const LABELS: Record<Mode, string> = {
  work: "Focus karo",
  short: "Chhota break",
  long: "Lamba break",
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function Pomodoro() {
  const [mode, setMode] = useState<Mode>("work");
  const [seconds, setSeconds] = useState(DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const intRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (mode === "work") setCompleted((c) => c + 1);
          try {
            new Audio(
              "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=",
            ).play().catch(() => {});
          } catch {}
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intRef.current) window.clearInterval(intRef.current);
    };
  }, [running, mode]);

  function pickMode(m: Mode) {
    setMode(m);
    setSeconds(DURATIONS[m]);
    setRunning(false);
  }

  function reset() {
    setSeconds(DURATIONS[mode]);
    setRunning(false);
  }

  const pct = (1 - seconds / DURATIONS[mode]) * 100;

  return (
    <div className="space-y-5">
      <div className="flex justify-center gap-2 rounded-xl border border-border bg-card p-1">
        {(["work", "short", "long"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => pickMode(m)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
            data-testid={`button-mode-${m}`}
          >
            {LABELS[m]}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {LABELS[mode]} — {DURATIONS[mode] / 60} min
        </p>
        <p className="font-mono text-7xl font-bold leading-none md:text-8xl" data-testid="text-timer">
          {fmt(seconds)}
        </p>
        <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform"
            data-testid="button-start-pause"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" /> Ruko
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Shuru karo
              </>
            )}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Aaj complete: <span className="font-semibold text-foreground">{completed}</span>{" "}
          pomodoros
        </p>
      </div>
    </div>
  );
}
