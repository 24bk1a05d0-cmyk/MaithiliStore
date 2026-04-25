import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const KEY = "maithili-store:bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(KEY, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks],
  );

  const toggle = useCallback(
    (slug: string) => {
      setBookmarks((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
      );
    },
    [setBookmarks],
  );

  return { bookmarks, isBookmarked, toggle };
}
