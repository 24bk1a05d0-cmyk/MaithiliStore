# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Maithili Store (`artifacts/maithili-store`)

Frontend-only React + Vite + Tailwind tools storefront with Hinglish copy. 38 tools listed across categories (Dev, Design, Productivity, Social Media, Student, Professional), with 20 fully-implemented interactive tool pages and the remainder showing a "Yeh tool jaldi aayega" coming-soon state.

- **Routing**: wouter v3 with `<WouterRouter base={BASE_URL}>`. Routes: `/`, `/tools`, `/categories`, `/category/:slug`, `/tool/:slug`, `/for/:slug`, `/about`, `/saved`, `/new`, plus a 404. Use `withBase()` from `src/lib/utils.ts` for hrefs.
- **Link pattern**: pass `className`/`onClick` directly on `<Link>` — never wrap children in `<a>` (causes nested anchor hydration errors in wouter v3).
- **Brand colors** (in `src/index.css`): Maithili Red `#C0392B`, Ivory `#FAF3E0`, Turmeric Gold `#F39C12`, Charcoal `#2C3E50`. Fonts: Fraunces (serif headlines), Inter (sans body), JetBrains Mono (tool/UI mono). All three loaded via `@fontsource*` packages.
- **Data**: static modules in `src/data/` (`tools.ts`, `categories.ts`, `audiences.ts`) with helper selectors (`getToolBySlug`, `getToolsByCategory`, `getToolsByAudience`, `getRelatedTools`, `getNewArrivals`, `getPopularTools`, `getCategory`, `getCategoryToolCount`).
- **Tool registry**: `src/components/tools/index.ts` maps tool slug → React component. Add the slug to the registry to "implement" a tool; otherwise the tool detail page renders the coming-soon block.
- **Hooks** (`src/hooks/`): `useTheme` (toggles `dark` class on `<html>`), `useBookmarks` (localStorage saved tools), `useRecents` (localStorage, max 8, push on tool view), `useFeedback` (per-slug up/down votes).
- **Search**: Cmd-K / `/` opens the SearchPalette (cmdk + fuse.js).
- **Emoji policy**: emojis are intentionally avoided everywhere except the Teenagers audience page (🎒) and the footer's heart icon. UI uses lucide-react icons.
