# FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a dark-themed workout companion I built from the supplied Fit Log Figma/Penpot design. It's responsive, fast, and lets you browse twelve workouts, check out full training instructions for each one, and plan out your day's session.

## What it does

- **Workout library:** Pulls all twelve exercises live from the FitLog API — muscle groups, equipment, duration, calories, rating, all of it.
- **Detail pages:** Every workout gets its own page with a two-column media layout, seven key specs, and step-by-step instructions.
- **Today's Plan:** Add up to five unfinished lifts at a time. Finish one, and a new slot opens up.
- **Saved workouts:** Bookmark exercises for later, look them over, and add them to your plan whenever you're ready.
- **Live metrics:** Exercise count, total minutes, and total calories update automatically as your plan changes.
- **Sorting:** Sort by duration (shortest first), calories (highest first), or rating (highest first) — independently on whichever tab you're viewing.
- **Progress that sticks:** Your plan, saved items, and completed workouts are saved in localStorage, so a refresh won't wipe them out.
- **Polish where it matters:** Toasts, loading skeletons, retry states for failed requests, empty states, keyboard navigation, and a custom 404 page.
- **Fully responsive:** Three columns on desktop, two on tablet, one on mobile.

## Built with

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Radix UI / shadcn components, Lucide icons, Sonner for toasts, and browser localStorage for persistence. The bundled Sites deployment setup uses Vinext and Cloudflare Workers to serve the Next.js source, but that's just one option — see below.

## Running it locally

You'll need Node.js 22.13+ and pnpm.

```bash
pnpm install
pnpm dev
```

## Building for production

```bash
pnpm build
pnpm start
```

Want a standard Vercel deployment instead? Just pick the Next.js framework preset and set the build command to `pnpm exec next build`. It's a normal Next.js App Router project underneath, so there's no client-only route rewriting to worry about. Deploying to Netlify works the same way — just use their Next.js runtime. The default build scripts in this repo are aimed at Sites / Cloudflare Workers, but they're not the only way to ship it.

## Routes

| Path | Page |
| --- | --- |
| `/` | Hero + workout library |
| `/workouts/[id]` | Workout details |
| `/my-plan` | Today's Plan |
| `/my-plan?tab=saved` | Saved workouts |
| Anything else | Custom 404 |

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

Everything's fetched live — no backend or account needed. Loading skeletons and retry states handle it gracefully if the API's ever slow or unavailable. Plan and saved data live entirely in your browser. Workout images come straight from the API's URLs; the logo and banner match the original design files. Typography is Oswald for headings and Inter for body text, both from Google Fonts.

## How the plan works

You can't add the same exercise twice. The five-lift cap only counts unfinished exercises, so completed ones stay visible without blocking new additions. Metrics count everything currently in the plan, completed or not. Removing an exercise updates the metrics and the navbar counter right away. Saved workouts are completely separate from the daily plan — one doesn't affect the other.

## Links

- **Live:** https://fit-log-m8i9.vercel.app
- **GitHub:** https://github.com/iamminhaz31/FitLog
