# Implement the Course Details Page

## Goal

Build the course details page from `design/vertex-course.png` at a dynamic route
`/courses/[slug]`, fetching real course data from Sanity. Wire the homepage
`CatalogCourseCard` grid to seeded Sanity courses instead of hardcoded
`lib/homepage-data.tsx` course entries.

Presentational-only for now: bookmark button, Continue Learning CTA, progress
footer (35%), and module accordion expand state. No lesson pages, progress API,
or PostHog events in this task.

## Skills read

- **AGENTS.md** (full) — sections 2, 3, 5 (server-only Sanity reads, read-only
  pages), 7 (bookmark/progress presentational until wired), 8 (course/module/lesson
  model), 13 (checks).
- **sanity-best-practices** — GROQ with `defineQuery`, Next.js server fetching,
  image URL builder, private dataset token on server only.

## Code inspected

### Design reference (`design/vertex-course.png`)

| Region | Contents |
|--------|----------|
| **Nav** | Same homepage nav: logo, Courses, My Learning, bell, Clerk auth |
| **Breadcrumbs** | `All Courses > {Course Title}` |
| **Hero** | Cover image (left), POPULAR badge, Playfair title, summary, metadata row (level, duration, module count, student count), Continue Learning + Bookmark buttons |
| **What you'll learn** | 2×2 grid of outcome cards (icon, title, description) |
| **Course Content** | Section header + module count/duration summary; numbered module rows with title, summary, duration, chevron; "Show all N modules" |
| **Sticky footer** | Your Progress, 35% bar, Continue Learning button |

### Existing UI (reuse)

- `Navbar`, `Breadcrumbs`, `Badge` (`popular`), `Button`, `ProgressBar`
- `CatalogCourseCard` — homepage card; extend to accept cover image + Sanity-driven meta
- `page-texture` background from homepage
- `sanity/lib/image.ts` — `urlFor()` for cover images
- `sanity/lib/client.ts` — base client (no read token yet)
- `sanity/lib/live.ts` — `sanityFetch` via `defineLive` (exists, not used by pages yet)

### Homepage (to wire)

- `app/page.tsx` — server component shell
- `components/home/CoursesSection.tsx` — reads hardcoded `homepageCourses`
- `lib/homepage-data.tsx` — static courses with SVG logos; **hero/footer copy stays**

### Sanity schema files vs seeded dataset (important)

Committed schema in `sanity/schemaTypes/` is a **stub** (flat `lessons[]`,
`description`, no modules/outcomes). The **seeded dataset** in
`studio/scripts/seed/seed.ndjson` matches AGENTS.md §8:

- **Course:** `title`, `slug`, `summary`, `coverImage`, `instructor`, `category`,
  `level`, `price`, `popular`, `studentCount`, `learningOutcomes[]`, `modules[]`
- **Module (embedded):** `title`, `summary`, `lessons[]` (references)
- **Lesson:** `title`, `slug`, `duration` (seconds), `videoUrl`, `thumbnail`,
  `notes`, `keyPoints`, etc.
- **Instructor:** `name`, `slug`, `photo`, `expertise`, `bio`

**Decision:** Query the live dataset shape via GROQ. Do **not** change schema files
in this task — seed data is already imported with the full shape; local schema
files are out of sync and should be updated in a separate follow-up for Studio
and TypeGen.

### Seeded courses for homepage wiring

Design homepage cards map thematically to these **real slugs**:

| Design theme | Seed course | Slug |
|--------------|-------------|------|
| Next.js | Next.js App Router in Depth | `nextjs-app-router-in-depth` |
| Docker | DevOps with Docker and Kubernetes | `devops-with-docker-and-kubernetes` |
| TypeScript | TypeScript for Application Developers | `typescript-for-application-developers` |

Homepage query: fetch these three courses by slug (ordered to match card order),
not the old hardcoded titles/descriptions.

### Example course for detail page testing

`nextjs-app-router-in-depth` — 4 modules, 4 learning outcomes, `popular: true`,
`level: intermediate`, ~12 lessons total, ~2h total duration (computed from lesson
seconds in seed).

## Decisions and assumptions

### Data layer

1. **Server read client** — add `sanity/lib/serverClient.ts` (or extend
   `client.ts`) with `token: process.env.SANITY_API_READ_TOKEN`, `useCdn: false`
   for server fetches. Token stays server-only; never import in client components.

2. **Fetch helper** — use `sanityFetch` from `sanity/lib/live.ts` with
   `serverToken` configured, OR a thin `fetchFromSanity()` wrapper around the
   tokenized client. Prefer existing `sanityFetch` if `defineLive` supports
   server-only token in this project's next-sanity version.

3. **Queries** in `sanity/queries/courses.ts`:
   - `COURSES_FOR_HOMEPAGE_QUERY` — 3 courses by slug list, projected fields for
     cards (title, slug, summary, coverImage, level, module count, total duration)
   - `COURSE_BY_SLUG_QUERY` — full course with dereferenced instructor, modules
     with dereferenced lessons (title, slug, duration, summary from module)
   - `COURSE_SLUGS_QUERY` — for `generateStaticParams` (optional, or dynamic)

4. **Duration math** — lesson `duration` is seconds in seed. Compute:
   - Module duration = sum of lesson durations in module
   - Course duration = sum across all modules
   - Format as `Xh Ym` / `Ym` via `lib/format-duration.ts`

5. **Student count** — format `18240` → `18.2k students` via `lib/format-count.ts`

6. **Level** — capitalize seed value (`intermediate` → `Intermediate`)

7. **Module count label** — `{n} modules` from `count(modules)`

### Routing

- `app/courses/[slug]/page.tsx` — async server component, `await params`, fetch
  course, `notFound()` if missing
- `generateMetadata` from course title/summary

### UI components (new)

- `components/course/CourseHero.tsx` — cover image (`next/image` + `urlFor`),
  badge, title, summary, metadata row, instructor byline (small, below summary —
  required by task, not shown in PNG), CTAs
- `components/course/LearningOutcomesGrid.tsx` — 2×2 cards; map outcome `icon`
  string to Heroicons (`layers`, `database`/`cylinder`, `gauge`, `cloud`, etc.)
- `components/course/CourseModulesSection.tsx` — client component for accordion +
  "Show all" toggle; first 6 modules visible by default (or all if ≤6)
- `components/course/CourseProgressFooter.tsx` — sticky footer; presentational
  35% progress until progress API exists

### Homepage changes

- `CoursesSection.tsx` → async server component (or parent `page.tsx` fetches and
  passes props). Remove course array from `homepage-data.tsx`; keep `heroCopy` /
  `footerCopy`.
- `CatalogCourseCard.tsx` — add optional `coverImage` prop (Sanity image); when
  present, render `next/image` instead of SVG logo slot. Keep logo slot for
  fallback.

### Presentational / deferred

- **Bookmark** — button only, no persistence
- **Continue Learning** — `href="#"` or first lesson slug path
  `/lessons/[slug]` as placeholder (route not built yet → `#` with comment)
- **Progress footer** — static 35% per design (AGENTS.md §7: progress wiring later)
- **Module chevrons** — expand/collapse UI only; lesson list inside module optional
  stretch goal (design shows modules not expanded lessons — summaries only)
- **PostHog** — not in this task
- **Instructor page link** — defer; show name only

### Responsive

- Desktop matches PNG; mobile stacks hero (image above text), single-column
  outcomes, full-width modules, sticky footer stacks

## Files expected to touch

**New:**

- `prompts/course-page.md` (this file)
- `sanity/queries/courses.ts` — GROQ queries
- `sanity/lib/serverClient.ts` — tokenized read client (if not folded into live.ts)
- `lib/format-duration.ts`, `lib/format-count.ts`, `lib/format-level.ts`
- `lib/course-icons.ts` — map learningOutcome icon strings → Heroicon components
- `types/course.ts` — TypeScript interfaces matching GROQ projections (until TypeGen)
- `app/courses/[slug]/page.tsx`
- `components/course/CourseHero.tsx`
- `components/course/LearningOutcomesGrid.tsx`
- `components/course/CourseModulesSection.tsx`
- `components/course/CourseProgressFooter.tsx`

**Modified:**

- `sanity/lib/live.ts` — ensure `serverToken` from `SANITY_API_READ_TOKEN`
- `sanity/lib/client.ts` — optionally export tokenized client for non-live fetches
- `.env.example` — add `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_SANITY_*` if missing
- `components/home/CoursesSection.tsx` — fetch from Sanity
- `components/cards/CatalogCourseCard.tsx` — cover image support, link to `/courses/[slug]`
- `lib/homepage-data.tsx` — remove hardcoded courses; keep hero/footer copy
- `app/page.tsx` — fetch courses server-side, pass to `CoursesSection`

**Not touched:**

- `sanity/schemaTypes/*` (schema drift noted; separate task)
- Search, PostHog instrumentation, progress API, lesson pages
- Clerk, `proxy.ts`, design-system page

## Requirements

- `/courses/[slug]` renders layout matching `vertex-course.png` using **real** Sanity data
- Homepage cards link to `/courses/{slug}` for the three seeded courses above
- Cover image from Sanity via `urlFor` + `next/image`
- Display: title, summary, level, duration, module count, student count, popular
  badge, learning outcomes, modules, instructor name
- No hardcoded course titles/descriptions on homepage or course page
- Server-only token; no Sanity secrets in client bundles
- Reuse Vertex tokens and existing primitives

## Security considerations

- `SANITY_API_READ_TOKEN` used only in server modules / `sanityFetch`
- Do not pass token to client components
- Do not read or commit `.env.local`
- Course pages are public (no `auth.protect()`)

## Acceptance criteria

- [ ] `/courses/nextjs-app-router-in-depth` loads with seeded Next.js course data
- [ ] Homepage shows 3 real courses with cover images and links to course pages
- [ ] Breadcrumbs: All Courses → course title
- [ ] Hero, outcomes grid, modules list, sticky progress footer match PNG structure
- [ ] Durations and counts derived from Sanity data, not hardcoded
- [ ] Unknown slug returns 404
- [ ] `/design-system` and `/` still work
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` pass

## Checks to run (AGENTS.md §13)

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run dev -- -p 3001
```

## Manual test steps

1. Ensure seed is imported and `SANITY_API_READ_TOKEN` is set in `.env.local`
2. Open `http://localhost:3001/` — three course cards with real titles/images
3. Click Next.js card → `/courses/nextjs-app-router-in-depth`
4. Compare page to `design/vertex-course.png` (layout, typography, sections)
5. Verify POPULAR badge, metadata, outcomes (4), modules (4), progress footer
6. Test invalid slug → 404
7. Confirm `/design-system` unchanged
8. Run lint, typecheck, build

## Follow-up (out of scope)

- Sync `sanity/schemaTypes/` with AGENTS.md model and seed shape
- Lesson detail routes and Continue Learning deep links
- Real learner progress in footer
- Instructor profile page link
