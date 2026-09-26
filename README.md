# FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a responsive, dark-themed gym companion built from the supplied Fit Log Figma/Penpot design. Explore twelve workouts, inspect the complete training instructions, and organize a daily session.

## Features

- **Live workout library:** fetches the twelve exercises from the FitLog API, including muscle groups, equipment, duration, calories and rating.
- **Dedicated detail pages:** two-column media layout, seven key specifications and ordered instructions for every exercise.
- **Today's Plan:** add exercises with a limit of five unfinished lifts. Completing a lift frees an active slot.
- **Saved workouts:** keep exercises for later, view their details and add them to the plan.
- **Live metrics:** exercise count, total minutes and total calories update when planned items change.
- **Sort controls:** duration (ascending), calories (descending) and rating (descending), independently applied to the visible tab.
- **Persistent progress:** plan, saved items and completed status survive refresh through localStorage.
- **Accessible feedback:** toasts, loading skeletons, retry states, empty states, keyboard controls and a custom 404 page.
- **Responsive layout:** three-column desktop grid, two-column tablet grid and single-column mobile layout.

## Technologies

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Radix UI / shadcn components, Lucide icons, Sonner and browser localStorage. The included Sites deployment uses Vinext and Cloudflare Workers to run the Next.js App Router source.

## Run locally

Requires Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
pnpm start
```

For a standard Next.js deployment on Vercel, select the Next.js framework preset and set the build command to `pnpm exec next build`. The source uses the Next.js App Router; there is no client-only route rewrite requirement. On Netlify, use its Next.js runtime. The included default build scripts target Sites / Cloudflare Workers.

## Routes

| Path | Page |
| --- | --- |
| `/` | Hero and workout library |
| `/workouts/[id]` | Workout details |
| `/my-plan` | Today's Plan |
| `/my-plan?tab=saved` | Saved workouts |
| Unknown path or workout | Custom 404 view |

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

Data is fetched from the live API. Loading and retry states handle unavailable responses. Plan and saved data remain on the current browser; no account or backend database is required. Locally bundled workout images come from the API's image URLs; the supplied logo and banner match the design assets. Font families are Oswald and Inter (Google Fonts).

## Plan behavior

Duplicate additions are prevented. The cap applies to five unfinished lifts, so completed exercises remain visible while allowing additional lifts. Metrics include all workouts still in Today's Plan, including completed ones. Removing an exercise updates metrics and its navbar counter. Saved items are independent of the daily plan.

## Submission links

- Live link: available in the project delivery message after publishing.
- GitHub repository: connect/push this source to your own GitHub repository before submission. The source includes meaningful Git commits; the Sites source remote is separate from GitHub.
