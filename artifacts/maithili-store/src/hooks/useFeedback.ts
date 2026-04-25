import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const KEY = "maithili-store:feedback";

type FeedbackMap = Record<string, "up" | "down" | undefined>;

export function useFeedback(slug: string) {
  const [map, setMap] = useLocalStorage<FeedbackMap>(KEY, {});
  const value = map[slug];

  const vote = useCallback(
    (v: "up" | "down") => {
      setMap((prev) => ({ ...prev, [slug]: prev[slug] === v ? undefined : v }));
    },
    [slug, setMap],
  );

  return { value, vote };
}
