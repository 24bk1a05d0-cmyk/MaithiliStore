import { useState } from "react";
import { Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RandomPicker() {
  const [text, setText] = useState("Pizza\nBurger\nBiryani\nDosa\nNoodles");
  const [picked, setPicked] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function pick() {
    const items = text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length === 0) return;
    setSpinning(true);
    let n = 0;
    const total = 12;
    const id = setInterval(() => {
      setPicked(items[Math.floor(Math.random() * items.length)]);
      n++;
      if (n >= total) {
        clearInterval(id);
        setPicked(items[Math.floor(Math.random() * items.length)]);
        setSpinning(false);
      }
    }, 60);
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Options (ek line, ek option)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="w-full resize-y rounded-xl border border-border bg-card p-4 text-base outline-none focus:border-primary"
          data-testid="textarea-picker-options"
        />
        <button
          type="button"
          onClick={pick}
          disabled={spinning}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
          data-testid="button-pick"
        >
          <Shuffle className="h-4 w-4" />
          {spinning ? "Soch raha hai..." : "Ek pick karo"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Aaj ka faisla
        </p>
        <AnimatePresence mode="wait">
          {picked ? (
            <motion.p
              key={picked + (spinning ? "s" : "f")}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="font-serif text-4xl font-bold leading-tight text-primary md:text-5xl"
            >
              {picked}
            </motion.p>
          ) : (
            <p className="font-serif text-2xl text-muted-foreground">
              Click karo —<br /> ek option uthata hoon.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
