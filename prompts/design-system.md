# Implement the Vertex Design System

## Goal

Turn `design/vertex-designsystem.png` into reusable Tailwind tokens and primitive
React components so every later page (catalog, course, lesson, instructor, My
Learning) is built from the same foundation instead of ad hoc styles. This task
covers foundations and primitives only — no product pages, no Sanity/Clerk/PostHog
wiring.

## Skills read

- AGENTS.md (full file) — sections 2 (workflow), 3 (UI work), 5 (app structure),
  6 (tech stack), 13 (checks).
- No Sanity/Context skills apply — this is pure Next.js/Tailwind UI work, per
  AGENTS.md section 6 ("For Tailwind... follow the package docs and existing
  patterns").

## Code inspected

- `package.json` — Next.js 16.3.2, React 19.2.8, Tailwind v4 (`@tailwindcss/postcss`),
  TypeScript, ESLint. No component or icon library installed yet.
- `app/globals.css` — default `create-next-app` scaffold: `@import "tailwindcss"`,
  a minimal `@theme inline` block mapping `--color-background` / `--color-foreground`
  to Geist fonts, dark-mode media query.
- `app/layout.tsx` — loads Geist Sans/Mono via `next/font/google`, generic
  "Create Next App" metadata.
- `app/page.tsx` — default scaffold homepage (Next.js starter content), not real
  product content yet.
- `tsconfig.json` — `@/*` path alias resolves to the project root.
- No `components/` directory exists yet. No `prompts/` directory existed (created
  it for this file). Project is currently a single Next.js app at the repo root —
  AGENTS.md section 5's Studio/web workspace split has not happened yet and is out
  of scope for this task.

## Reference

`design/vertex-designsystem.png` — a 14-section token/component sheet:
01 Colors, 02 Typography, 03 Type scale, 04 Spacing, 05 Radius & shadows,
06 Icons, 07 Buttons, 08 Inputs, 09 Badges/Tags, 10 Status indicators,
11 Progress bar, 12 Cards (Course/Lesson-video/Lesson/Resource), 13 Navigation
(top nav, breadcrumbs, pagination), 14 Principles.

## Decisions and assumptions

- **Spacing**: Tailwind v4's default spacing scale (`0.25rem` = 4px per step) already
  produces 4/8/12/16/24/32/40/48/64px at `1/2/3/4/6/8/10/12/16`. No custom spacing
  tokens needed — I'll use the default scale and note the mapping in a comment,
  not reinvent it.
- **Icons**: the sheet shows matching outline + filled rows for the same 9 icons
  (bell, search, play, file, bookmark, bar-chart, clock, user, chevron-right) on a
  24×24 grid — that's exactly the shape of the Heroicons 24/outline + 24/solid
  sets, so I'll use `@heroicons/react` rather than an outline-only library like
  lucide. I'll override stroke width to 2px on outline icons via `strokeWidth={2}`
  to match spec.
- **Fonts**: replace Geist with Playfair Display (display headings) and Inter
  (body/UI) via `next/font/google`, exposed as `--font-display` / `--font-sans`.
- **Where components live**: `components/ui/` for primitives (Button, Input,
  Select, Badge, StatusIndicator, ProgressBar), `components/cards/` for the four
  card types, `components/navigation/` for Navbar/Breadcrumbs/Pagination. Flat
  `components/` at repo root since there's no `web/` workspace yet (section 5's
  split is a separate, not-yet-requested task).
- **Showcase route**: add `app/design-system/page.tsx`, a living style guide that
  mirrors the 14 sections of the reference image, so the result can be diffed
  against the source PNG in a browser instead of only trusting code review. This
  is scaffolding for verification, not a product page — it can be deleted later
  without affecting the app.
- **"N" course thumbnail mark** in the Course Card (section 12) is a generic
  placeholder avatar (dark square + initial), not a real logo asset — implemented
  as a small inline `CourseIcon`/initial-badge, not hardcoded to "N".
- Card/nav components are presentational only: they accept props/children and
  render markup+styles. No data fetching, no Sanity types, no links to real
  routes yet (`href`/`onClick` passed through as props) — wiring to real data is
  a later task once the content model exists.

## Files expected to touch

- `package.json` — add `@heroicons/react`.
- `app/globals.css` — `@theme` block with color tokens (primary 100–500, neutral
  50–900, white), font tokens, radius tokens (4/8/12/16/24/full), shadow tokens
  (sm/md/lg/xl).
- `app/layout.tsx` — swap fonts to Playfair Display + Inter, update metadata.
- `app/design-system/page.tsx` — new showcase route.
- `components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Badge.tsx`,
  `StatusIndicator.tsx`, `ProgressBar.tsx` — new.
- `components/cards/CourseCard.tsx`, `LessonCard.tsx`, `ResourceCard.tsx` — new
  (`LessonCard` supports a `variant="video" | "lesson"` prop per the two lesson
  card examples in the sheet).
- `components/navigation/Navbar.tsx`, `Breadcrumbs.tsx`, `Pagination.tsx` — new.

## Requirements

- Match the sheet's literal values: hex colors, font families/sizes/line-heights/
  weights, radius px values, shadow offsets/blur/color, button height (44px) and
  padding/radius/font, input height (44px)/radius(12px)/border(#E2E8F0)/focus
  color (#FB923C).
- Buttons: Primary, Secondary, Tertiary, Text variants × Default/Hover/Disabled
  states, exactly as laid out in section 07.
- Inputs: search-with-icon-and-kbd-hint style and a select, per section 08 specs.
- Badges (Video/Lesson/Popular), status indicators (In Progress/Completed/Now
  Playing/Locked), and the progress bar (section 09–11).
- Responsive: this task has no page layout to make responsive (it's a token/
  component library), but the showcase page itself should not break on mobile
  widths — reflow its grid, don't fix desktop-only widths.
- Reuse these components in all later page work instead of one-off styles
  (AGENTS.md section 3).

## Security considerations

None — purely presentational, no data fetching, no secrets, no user input
persisted anywhere in this task.

## Acceptance criteria

- Visiting `/design-system` renders all 14 sections and visually matches
  `design/vertex-designsystem.png` (colors, type scale, spacing swatches, radius/
  shadow samples, icons, button states, input specs, badges, status indicators,
  progress bar, all four card types, nav/breadcrumbs/pagination).
- Every component is exported from its file with typed props (variant/state
  enums where the sheet shows variants), usable outside the showcase page.
- No hardcoded one-off colors/spacing in the new components — everything reads
  from the Tailwind theme tokens defined in `globals.css`.

## Checks to run (AGENTS.md section 13)

- `npm run lint`
- `npx tsc --noEmit` (type check)
- `npm run build` (routes and config changed)
- `npm run dev` and visually verify `/design-system` in a browser against the
  reference PNG.

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/design-system`.
2. Compare side by side with `design/vertex-designsystem.png`: colors, type
   scale, spacing scale, radius/shadow samples.
3. Confirm icons render at 24×24 in both outline and filled styles.
4. Hover and disable-state-check each button variant (Primary/Secondary/
   Tertiary/Text) — visually confirm hover and disabled styling matches.
5. Check the search input's focus ring turns the spec orange (#FB923C) and the
   select renders with the same field specs.
6. Confirm badges (Video/Lesson/Popular), the four status indicators, and the
   progress bar at 35% render as shown.
7. Confirm all four cards (Course/Lesson-video/Lesson/Resource) render with
   correct content and icon placement.
8. Resize the browser to a mobile width and confirm the showcase page reflows
   without horizontal scroll or overlap.
9. Run lint, type check, and build; confirm all three pass with no errors.
