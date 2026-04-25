import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useFeedback } from "@/hooks/useFeedback";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
}

export function FeedbackWidget({ slug }: Props) {
  const { value, vote } = useFeedback(slug);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-card-border bg-card px-4 py-3">
      <span className="text-sm text-muted-foreground">Yeh tool helpful tha?</span>
      <button
        type="button"
        onClick={() => vote("up")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
          value === "up"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground hover:bg-secondary",
        )}
        aria-label="Useful"
        data-testid={`button-feedback-up-${slug}`}
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => vote("down")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
          value === "down"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground hover:bg-secondary",
        )}
        aria-label="Not useful"
        data-testid={`button-feedback-down-${slug}`}
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
      {value && (
        <span className="ml-1 text-xs text-muted-foreground">Shukriya!</span>
      )}
    </div>
  );
}
