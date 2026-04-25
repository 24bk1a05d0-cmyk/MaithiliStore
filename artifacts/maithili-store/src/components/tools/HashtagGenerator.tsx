import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const POOLS: Record<string, string[]> = {
  travel: ["wanderlust", "travelgram", "explore", "adventure", "passportready", "globetrotter", "vacationmode", "traveldiaries", "ghoomofiro", "indiaswonders", "trekking", "mountainsarecalling", "beachlife", "roadtrip", "backpacker"],
  food: ["foodie", "foodgram", "instafood", "yummy", "homemade", "chefslife", "foodlover", "delicious", "indianfood", "streetfood", "swadanusaar", "biryanilove", "veganrecipes", "spicy", "comfortfood"],
  fitness: ["fitfam", "gymlife", "workout", "fitnessmotivation", "healthylifestyle", "yoga", "gymrat", "homeworkout", "noexcuses", "stayfit", "trainhard", "fitnessjourney", "deadlift", "running", "stronger"],
  fashion: ["ootd", "styleinspo", "fashionista", "outfitoftheday", "streetstyle", "indianfashion", "ethnicwear", "minimalist", "fashionblogger", "lookbook", "trendalert", "wardrobe", "stylegoals", "casualwear"],
  tech: ["coding", "developer", "programmer", "webdev", "javascript", "react", "techlife", "100daysofcode", "indiehacker", "buildinpublic", "softwareengineer", "techcommunity", "ai", "saas"],
  art: ["artistsoninstagram", "digitalart", "illustration", "doodle", "sketchbook", "artwork", "artist", "creativeprocess", "watercolor", "indianart", "designinspo", "handmade", "drawing", "painting"],
  music: ["musicproducer", "musiclover", "indiemusic", "newmusic", "spotify", "songwriter", "guitar", "playlist", "indianmusic", "bollywoodmusic", "livemusic", "concert", "vibes"],
  business: ["entrepreneur", "smallbusiness", "startup", "founderlife", "marketing", "growthhacking", "brandstrategy", "indianbusiness", "freelance", "remotework", "femalefounder", "hustle"],
  beauty: ["makeup", "skincare", "beautytips", "glowup", "selfcare", "indianbeauty", "lipstick", "naturalskin", "beautyblogger", "skincareroutine", "hairgoals"],
  generic: ["instagood", "love", "photooftheday", "happy", "vibes", "instadaily", "explore", "trending", "viral", "follow", "share"],
};

export function HashtagGenerator() {
  const [topic, setTopic] = useState("travel");
  const [count, setCount] = useState(15);
  const [copied, setCopied] = useState(false);

  const tags = useMemo(() => {
    const t = topic.toLowerCase().trim();
    const found = Object.keys(POOLS).find((k) => t.includes(k));
    const pool = found ? POOLS[found] : POOLS.generic;
    const extra = t
      ? [t.replace(/\s+/g, ""), `${t.replace(/\s+/g, "")}lover`, `${t.replace(/\s+/g, "")}gram`]
      : [];
    const all = [...new Set([...extra, ...pool, ...POOLS.generic])];
    return all.slice(0, count).map((s) => "#" + s);
  }, [topic, count]);

  function copyAll() {
    navigator.clipboard.writeText(tags.join(" ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="travel, food, fitness, tech, fashion..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-base outline-none focus:border-primary"
            data-testid="input-hashtag-topic"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Count
          </label>
          <input
            type="number"
            min={5}
            max={30}
            value={count}
            onChange={(e) => setCount(Math.max(5, Math.min(30, Number(e.target.value))))}
            className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-base"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {tags.length} hashtags
          </p>
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy all"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
