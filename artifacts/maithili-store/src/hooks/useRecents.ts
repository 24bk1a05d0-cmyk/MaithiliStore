import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const KEY = "maithili-store:recents";
const MAX = 8;

export function useRecents() {
  const [recents, setRecents] = useLocalStorage<string[]>(KEY, []);

  const push = useCallback(
    (slug: string) => {
      setRecents((prev) => {
        const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
        return next;
      });
    },
    [setRecents],
  );

  const clear = useCallback(() => setRecents([]), [setRecents]);

  return { recents, push, clear };
}
