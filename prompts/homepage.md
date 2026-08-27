# Implement the Vertex Homepage

## Goal

Replace the default Next.js starter at `/` with the Vertex homepage from
`design/vertex-home.png`. Match the reference exactly: layout, spacing, typography,
colors, and decorative elements. Reuse and extend the existing design-system
components where they fit.

This is a **presentational homepage only** — static demo content matching the PNG.
No Sanity data fetching, no Clerk auth wiring, no PostHog events, and no working
search backend. The search field and nav affordances are visual placeholders for
later tasks.

## Skills read

- **AGENTS.md** (full) — sections 2 (workflow), 3 (UI work), 5 (app structure:
  single root app), 6 (Tailwind/Next.js), 7 (presentational-only surfaces:
  notifications bell, My Learning link), 13 (checks).
- **No Sanity, Clerk, PostHog, or search skills** apply — UI-only task with static
  content until the content model and integrations exist.

## Code inspected

- `app/page.tsx` — default `create-next-app` starter; will be fully replaced.
- `app/layout.tsx` — Playfair Display + Inter already loaded; metadata title
  "Vertex — Learning Platform".
- `app/globals.css` — full Vertex token set (primary/neutral, type scale, radius,
  shadows). Body background is `neutral-50` (`#FAFAFC`); homepage PNG uses a
  warmer cream with a subtle diagonal texture — needs a page-level override/token.
- `components/navigation/Navbar.tsx` — logo + two nav links in a simple
  left/right flex row. **Missing:** centered nav layout, bell icon, user avatar.
- `components/cards/CourseCard.tsx` — small top-left icon badge, Inter title,
  inline metadata string. **Differs from homepage:** large centered logo area,
  Playfair title, icon-separated footer row (level / duration / modules).
- `components/ui/Button.tsx` — primary/secondary/tertiary/text variants; primary
  works for CTA but always injects play/external icons on tertiary/text only.
  CTA needs optional trailing `ArrowRightIcon`, no forced icons on primary.
- `components/ui/Input.tsx` — search icon + ⌘K shortcut hint; 44px height. Hero
  search in PNG is wider and visually more prominent — needs a `size="lg"` variant
  or className override at call site.
- `components/ui/Badge.tsx` — video/lesson/popular variants. Hero pill badge
  ("INTELLIGENT LEARNING") needs a new `feature` variant or dedicated component.
- `lib/cn.ts` — class merge helper.
- `public/` — no course logo assets yet (Next.js, Docker, TypeScript marks must
  be added as inline SVGs or small static files).
- `app/design-system/page.tsx` — living reference for tokens and primitives;
  homepage must stay consistent with established patterns.

## Reference

`design/vertex-home.png` — single-page homepage mockup with five regions:

| Region | Contents |
|--------|----------|
| **Nav bar** | Vertex logo (left), "Courses" + "My Learning" links (center-left), bell icon + circular avatar (right). White/translucent bar on textured background. |
| **Hero** | Centered pill badge "INTELLIGENT LEARNING", Playfair headline "Search your learning in plain English.", grey subtext, primary "Explore Courses →" button, large search input ("Ask anything about your learning…" + ⌘K). |
| **All Courses** | Section header: "All Courses" (Playfair, left) + "View all courses →" link (primary orange, right). Three course cards in a row. |
| **Course cards** | White card, md shadow, 12px radius. Large centered course mark (Next.js N, Docker whale, TypeScript TS). Playfair title. Two-line description. Footer divider with three icon+label pairs: level (signal bars), duration (clock), modules (document). |
| **Bottom** | Centered callout with star icon: "New courses and lessons added every week." Decorative orange gradient vertical bars fading at page bottom. |

### Static course data (from PNG)

| Course | Icon | Title | Description | Level | Duration | Modules |
|--------|------|-------|-------------|-------|----------|---------|
| 1 | Next.js (black square, white N) | Next.js for Production | Build fast, scalable React applications with the App Router, server components, and modern deployment patterns. | Intermediate | 18h 24m | 12 modules |
| 2 | Docker (blue whale) | Docker for Developers | Containerize your applications, orchestrate services, and deploy with confidence using Docker and Compose. | Beginner | 14h 10m | 9 modules |
| 3 | TypeScript (blue square, TS) | TypeScript Deep Dive | Master TypeScript's type system, generics, and advanced patterns for safer, more maintainable code. | Intermediate | 16h 45m | 11 modules |

## Decisions and assumptions

### Scope boundaries

- **In scope:** `/` homepage UI, static content, presentational nav/search/avatar/bell,
  responsive layout, minimal component extensions, course logo SVGs.
- **Out of scope:** Sanity CMS, Clerk, PostHog, search API/route, real `/courses`
  catalog page, real course detail links, keyboard shortcut handler for ⌘K,
  notifications panel, auth state.

### Component strategy — extend, don't duplicate

1. **Extract `VertexLogo`** from `Navbar.tsx` into `components/brand/VertexLogo.tsx`
   so nav and other pages share one mark. Update `Navbar` to import it.

2. **Extend `Navbar`** with optional props rather than a separate header:
   - `layout?: "default" | "homepage"` — homepage uses three-zone flex (logo | nav | actions)
   - `showActions?: boolean` — renders bell button + avatar placeholder when true
   - Nav links stay presentational (`href="#"` until real routes exist)

3. **Extend `Button`** with optional `trailingIcon?: ReactNode` and
   `showVariantIcon?: boolean` (default true for tertiary/text) so primary CTA
   can show `ArrowRightIcon` without play/external icons.

4. **Extend `Input`** with `size?: "md" | "lg"` — lg = taller field (~52–56px) and
   larger horizontal padding for the hero search bar.

5. **Extend `Badge`** with variant `"feature"` — uppercase tracking, primary-100
   background, primary-500 text, pill shape (`rounded-full`), for
   "INTELLIGENT LEARNING".

6. **New `CatalogCourseCard`** in `components/cards/CatalogCourseCard.tsx` rather
   than overloading design-system `CourseCard` — homepage/catalog layout is
   structurally different (centered logo block, Playfair title, icon footer).
   Keep existing `CourseCard` unchanged for `/design-system` showcase.

7. **Homepage section components** (composition only, no data fetching):
   - `components/home/HeroSection.tsx`
   - `components/home/CoursesSection.tsx`
   - `components/home/HomeFooter.tsx` — callout line + CSS gradient bar decoration

8. **Static data** in `lib/homepage-data.ts` — typed array of course objects plus
   hero copy strings. Keeps `app/page.tsx` thin.

9. **Background texture** — add `--color-page-cream: #fdfcf9` (or closest match
   to PNG) in `globals.css` and a reusable `.page-texture` utility class with a
   subtle diagonal line pattern via CSS `repeating-linear-gradient`. Apply on the
   homepage wrapper only; do not change global `body` background (design-system
   page stays on `neutral-50`).

10. **Course logos** — inline SVG components in
    `components/cards/course-logos/` (NextJsLogo, DockerLogo, TypeScriptLogo)
    matching PNG proportions. No external image URLs.

11. **Avatar placeholder** — circular div with neutral gradient or a simple
    user silhouette; presentational only (AGENTS.md §7).

12. **Links** — all hrefs are `#` or omitted until catalog/search routes exist.
    "View all courses →" and course cards are non-navigating placeholders.

13. **Responsive** — no mobile reference in PNG. Desktop layout exact; below `md`
    stack hero content, single-column course cards, collapse nav actions sensibly
    (avatar + bell remain visible, links may wrap).

14. **Search input** — render as `<Input>` inside a `<form>` with `action="#"` and
    `onSubmit` prevented client-side, or a plain div wrapper. No `/api/search` call.

## Files expected to touch

**Modified:**

- `app/page.tsx` — compose homepage from section components
- `app/globals.css` — add `--color-page-cream`, `.page-texture` utility
- `components/navigation/Navbar.tsx` — extract logo, add homepage layout + actions
- `components/ui/Button.tsx` — optional trailing icon, suppress default variant icons when needed
- `components/ui/Input.tsx` — `size="lg"` variant
- `components/ui/Badge.tsx` — `feature` variant

**New:**

- `components/brand/VertexLogo.tsx`
- `components/cards/CatalogCourseCard.tsx`
- `components/cards/course-logos/NextJsLogo.tsx`
- `components/cards/course-logos/DockerLogo.tsx`
- `components/cards/course-logos/TypeScriptLogo.tsx`
- `components/home/HeroSection.tsx`
- `components/home/CoursesSection.tsx`
- `components/home/HomeFooter.tsx`
- `lib/homepage-data.ts`

**Not touched:**

- `app/design-system/page.tsx` (unless shared component API changes require showcase updates)
- Sanity, Clerk, PostHog, env files, search routes, `app/layout.tsx` (unless metadata tweak needed)

## Requirements

### Navigation

- Match PNG: logo left, "Courses" + "My Learning" centered in nav cluster, bell +
  circular avatar right.
- Bell is a presentational button (no dropdown/panel).
- "Courses" appears active (primary-500) on homepage; "My Learning" neutral.

### Hero

- Pill badge: "INTELLIGENT LEARNING" (uppercase, feature badge variant).
- Headline: Playfair Display, `text-display-1` or equivalent, centered, max-width
  ~720px.
- Subtext: Inter, neutral-500, centered, max-width ~560px.
- Primary button: "Explore Courses" + right arrow icon.
- Search: lg Input, full width up to ~640px, placeholder "Ask anything about your
  learning…", search icon left, ⌘K hint right.

### All Courses section

- Section title "All Courses" in Playfair (`text-display-2` or `text-heading-1`
  per PNG scale — use Playfair semibold ~28–36px).
- "View all courses →" as primary-500 text link with arrow on the right.
- Three `CatalogCourseCard` instances in a responsive grid (3 cols desktop,
  1 col mobile).
- Each card matches PNG content, logo, and footer icon row.

### Footer / decoration

- Horizontal rule or spacing, then centered callout with star icon (Heroicons
  `StarIcon` outline or solid) + grey text.
- Bottom gradient bar decoration — CSS-only vertical bars with primary/orange
  gradient fade, no image asset.

### Visual fidelity

- Use theme tokens only — no hardcoded hex in components except inside
  `globals.css` token definitions and SVG logo fills where brand colors require it.
- Match spacing, shadows (`shadow-md` on cards), and 12px card radius from design system.
- Cream textured page background on homepage wrapper.

## Security considerations

None beyond normal static-page hygiene. No secrets, no API routes, no user input
persisted. Search form must not POST to external URLs.

## Acceptance criteria

- [ ] Visiting `/` renders the homepage matching `design/vertex-home.png` (nav, hero,
  three course cards, bottom callout, gradient decoration).
- [ ] Existing `/design-system` route still renders correctly and is unaffected.
- [ ] Reused components (`Navbar`, `Button`, `Input`, `Badge`) extended without
  breaking `/design-system` showcase.
- [ ] All course content matches the static data table above — no invented courses.
- [ ] Homepage is responsive: no horizontal scroll at 375px width; cards stack on mobile.
- [ ] No Sanity, Clerk, PostHog, or search integration added.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.

## Checks to run (AGENTS.md §13)

From repo root:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run dev   # visual verify / and /design-system
```

## Manual test steps

1. `npm run dev -- -p 3001` (or use existing dev server).
2. Open `http://localhost:3001/` and compare side-by-side with
   `design/vertex-home.png`.
3. Confirm nav: logo, Courses, My Learning, bell, avatar.
4. Confirm hero: badge, headline, subtext, Explore Courses button, search bar with ⌘K.
5. Confirm All Courses: three cards with correct titles, descriptions, metadata icons.
6. Confirm bottom callout and gradient bar decoration.
7. Open `http://localhost:3001/design-system` — verify design-system page unchanged.
8. Resize to ~375px — hero and cards stack without horizontal overflow.
9. Run lint, typecheck, build — all green.
