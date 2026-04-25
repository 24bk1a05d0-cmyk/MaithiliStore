import { useState } from "react";
import { Plus, Trash2, RotateCw, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Card {
  id: string;
  front: string;
  back: string;
}

const SAMPLE: Card[] = [
  { id: "1", front: "What does HTML stand for?", back: "HyperText Markup Language" },
  { id: "2", front: "Capital of Bihar?", back: "Patna" },
  { id: "3", front: "1 + 1 in binary?", back: "10" },
];

export function Flashcards() {
  const [cards, setCards] = useLocalStorage<Card[]>("maithili:flashcards", SAMPLE);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  function add() {
    if (!front.trim() || !back.trim()) return;
    setCards((c) => [...c, { id: Date.now().toString(), front: front.trim(), back: back.trim() }]);
    setFront("");
    setBack("");
  }
  function remove(id: string) {
    setCards((c) => c.filter((card) => card.id !== id));
    setIdx(0);
    setFlipped(false);
  }
  function next() {
    setFlipped(false);
    setIdx((i) => (cards.length ? (i + 1) % cards.length : 0));
  }
  function prev() {
    setFlipped(false);
    setIdx((i) => (cards.length ? (i - 1 + cards.length) % cards.length : 0));
  }
  function shuffle() {
    setCards((c) => [...c].sort(() => Math.random() - 0.5));
    setIdx(0);
    setFlipped(false);
  }

  const card = cards[idx];

  return (
    <div className="space-y-5">
      {card ? (
        <>
          <div
            onClick={() => setFlipped((f) => !f)}
            className="relative mx-auto flex aspect-[3/2] max-w-md cursor-pointer items-center justify-center rounded-3xl border border-border bg-card p-8 text-center transition-transform hover:-translate-y-1"
            data-testid="flashcard"
          >
            <div className="absolute right-4 top-4 font-mono text-xs text-muted-foreground">
              {idx + 1} / {cards.length}
            </div>
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              {flipped ? card.back : card.front}
            </p>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <RotateCw className="h-3 w-3" />
              {flipped ? "Back — click for front" : "Click to flip"}
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              <Shuffle className="h-3.5 w-3.5" /> Shuffle
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Abhi koi card nahi hai. Neeche se add karo.
        </p>
      )}

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Naya card add karo
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Question / front"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            data-testid="input-card-front"
          />
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Answer / back"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            data-testid="input-card-back"
          />
        </div>
        <button
          type="button"
          onClick={add}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          data-testid="button-add-card"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>

      {cards.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Saare cards
          </p>
          <ul className="space-y-2">
            {cards.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2 text-sm"
              >
                <span className="truncate">
                  <strong>{i + 1}.</strong> {c.front}
                </span>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
