# Implementation Prompt: Lesson Page

## Goal

Implement the lesson details page from the attached UI design:

`design/vertex-lesson.png`

The page must be wired to the seeded Sanity content and display the actual lesson video.

The implementation should follow the existing architecture, conventions, components, styling, and data-access patterns already used throughout the Vertex project.

Do not replace existing working functionality unnecessarily.

---

## Route

Implement the lesson page at:

`/lessons/[slug]`

Example:

`/lessons/nextjs-app-router-in-depth-file-system-routing`

The page must load the lesson using its slug.

If the lesson does not exist, use Next.js `notFound()`.

---

## Existing Work

The project already has an initial lesson implementation.

Existing files include:

- `app/lessons/[slug]/page.tsx`
- `lib/sanity/lessons.ts`
- `types/lesson.ts`
- `sanity/queries/courses.ts`
- `lib/video.ts`

The current page already successfully loads a seeded lesson from Sanity.

Preserve and extend this implementation rather than rebuilding unrelated parts of the application.

---

## Sanity Data

Use the seeded Sanity lesson content.

A lesson can contain:

- `_id`
- `title`
- `slug`
- `videoUrl`
- `thumbnail`
- `duration`
- `freePreview`
- `studentCount`
- `notes`
- `keyPoints`
- `proTip`
- `resources`

The lesson document does not directly store its parent course.

Derive the parent course using a reverse Sanity reference.

The parent course should provide:

- `_id`
- `title`
- `slug`
- `coverImage`
- `level`
- `modules`
- lessons belonging to each module

Each course module should expose its lessons so the lesson curriculum can be rendered in the sidebar.

Do not hard-code the course or lesson content shown in the design image.

Use the seeded Sanity data.

---

## Data Fetching

Use a server-side Sanity fetch for the lesson page.

The page should fetch the required lesson and course curriculum data in one lesson-by-slug query where practical.

Follow the existing Sanity data-access architecture.

Expected flow:

Sanity
→ lesson query
→ `getLessonBySlug()`
→ `/lessons/[slug]/page.tsx`
→ lesson UI

Keep normalization/data transformation in the data layer rather than scattering it throughout the UI.

---

## Lesson Curriculum

The page must derive the current lesson's position within the course curriculum.

Determine:

- current module index
- current lesson index
- lesson number
- previous lesson
- next lesson
- all course modules and lessons

The sidebar should highlight the active lesson.

The active module should be visually expanded.

Other modules should be available to navigate.

Every lesson should link to:

`/lessons/[lesson-slug]`

---

## Page Layout

Reproduce the layout and hierarchy shown in:

`design/vertex-lesson.png`

The desktop layout contains:

1. Existing top application navigation
2. Course curriculum sidebar on the left
3. Main lesson content area on the right

Maintain responsive behavior for smaller screens.

Reuse existing Vertex design-system components and project styles whenever possible.

Do not create an unrelated visual system.

---

## Sidebar

The sidebar should include:

- Back to course link
- Course cover image
- Course title
- Course progress presentation
- Current module indicator
- Full list of course modules
- Module numbering
- Lesson list for the active/expanded module
- Active lesson state
- "Now playing" state for the current lesson

The sidebar should derive its information from the lesson's parent course.

Course progress may remain presentational unless the project already has real persisted learner progress available.

Do not invent a progress backend.

---

## Breadcrumbs

Render lesson breadcrumbs similar to the design.

Expected hierarchy:

All Courses
→ Course
→ Module
→ Lesson

Each navigable parent item should link to the appropriate existing route.

---

## Lesson Header

Display:

- lesson identifier/number
- lesson title
- lesson/course context
- lesson duration
- course level
- student count
- bookmark control matching the design

Use actual Sanity values.

Do not hard-code the sample Next.js text shown in the design except where it comes from the selected seeded lesson.

---

## Video Player

Display the lesson video prominently at the top of the lesson content.

Use the lesson's `videoUrl`.

Support the video providers expected by the project:

- YouTube
- Vimeo
- Bunny / MediaDelivery

Create or use a video URL parsing utility in:

`lib/video.ts`

The utility should convert the stored video URL into the correct embeddable URL.

For YouTube URLs such as:

`https://www.youtube.com/watch?v=VIDEO_ID`

produce the appropriate YouTube embed URL.

Prefer showing the Sanity thumbnail/poster before playback.

Do not mount the third-party iframe until the learner presses Play when practical.

After Play is pressed, render the provider iframe in the video area.

The video container should maintain the appropriate aspect ratio and match the design.

If the URL cannot be parsed, fail gracefully rather than crashing the page.

---

## Lesson Tabs

Provide the lesson tabs shown in the design:

- Lesson Content
- Notes

The selected tab should be visually clear.

Use a client component only where interactivity requires it.

Avoid turning the entire lesson page into a client component.

---

## Lesson Content

Use the Sanity content to render the main lesson information.

Include the relevant seeded lesson data:

### Overview

Render an appropriate lesson overview from the available Sanity content.

Do not invent a large hard-coded paragraph if the seed already provides lesson content.

### Key Points

Render `keyPoints` as the "In this lesson you will" checklist.

### Pro Tip

If `proTip` exists, display a Pro Tip callout matching the design.

Do not render an empty Pro Tip section if no value exists.

### Resources

Render the lesson `resources`.

Each resource may contain:

- type
- title
- description
- url

External links should be usable and open safely.

Do not render empty resource sections unnecessarily.

---

## Notes

Render the lesson's Sanity `notes` portable text.

Use the project's installed Portable Text tooling if available.

Check existing dependencies before installing a new package.

Support the basic content currently present in the seed, including:

- paragraphs
- headings
- bullet lists

Do not convert Sanity portable text into hard-coded HTML strings.

---

## Previous and Next Lesson Navigation

At the bottom of the page, render lesson navigation matching the design.

Show:

- Previous Lesson
- course/module context where useful
- Next Lesson

Previous and next should be derived from the ordered course curriculum.

Navigation should also work across module boundaries.

For example:

last lesson of Module 1
→ first lesson of Module 2

If there is no previous or next lesson, handle that edge cleanly.

---

## Lesson Links and Start Time

Lesson links should support an optional video start time parameter for future deep-link search behavior.

The standard lesson route remains:

`/lessons/[slug]`

When a start time is provided, the helper should be able to produce a URL containing the appropriate query parameter.

Do not implement the later search feature yet.

Only make the lesson route capable of receiving that future start-time value without breaking normal navigation.

---

## Components

Break the lesson UI into focused components when useful.

Likely responsibilities include:

- lesson sidebar / curriculum
- lesson header
- video player
- content tabs
- portable text / notes
- lesson resources
- previous/next navigation

Do not over-componentize trivial markup.

Reuse existing shared components where appropriate.

---

## Existing Navigation

Preserve the existing Vertex navbar and global application layout.

Do not recreate a second independent navbar inside the lesson page if the project already provides one globally.

---

## Styling

Match `design/vertex-lesson.png` as closely as practical using the project's existing Tailwind setup.

Focus on:

- spacing
- typography
- borders
- card shapes
- sidebar dimensions
- video proportions
- active curriculum states
- content hierarchy
- responsive behavior

Do not introduce a new styling framework.

---

## Image Handling

Use the existing Sanity image helper and Next.js image configuration already established in the project.

Use Sanity images for:

- course cover
- lesson thumbnail/poster

Do not hard-code external image URLs when Sanity already provides the image.

---

## Error Handling

The page should handle:

- unknown lesson slug
- missing video URL
- unsupported video provider
- missing thumbnail
- empty notes
- empty key points
- empty pro tip
- empty resources
- first lesson with no previous lesson
- final lesson with no next lesson

The page should not crash because optional seeded content is absent.

---

## TypeScript

Keep the implementation strongly typed.

Extend the existing lesson types when necessary.

Avoid using `any`.

Keep raw Sanity response types separate from normalized UI/domain types when appropriate.

---

## Scope

Implement only the Lesson Details experience required at this stage of the tutorial.

Do NOT implement yet:

- Context Search
- transcript ingestion
- chapter ingestion
- search page
- later PostHog lesson tracking
- CodeRabbit/security chapter
- assignment improvements

Those belong to later sections of the tutorial.

---

## Validation

Before considering the implementation complete:

1. Run:

`npx tsc --noEmit`

2. Run the project's lint command if available.

3. Verify the existing app still works.

4. Open a seeded lesson such as:

`/lessons/nextjs-app-router-in-depth-file-system-routing`

5. Confirm:

- lesson loads from Sanity
- correct course is derived
- modules and lessons render
- current lesson is highlighted
- video can play
- lesson content renders
- notes render
- resources render
- previous/next navigation works
- no React duplicate-key warnings appear
- no new TypeScript errors appear

---

## Git

Do not modify `main` directly.

Work on the existing:

`feat/lesson-details`

branch.

Do not create unnecessary tiny commits while implementation is incomplete.

Review changed files before staging.

Do not use destructive Git commands.

---

## Final Requirement

Build the Lesson Details page so that it visually follows:

`design/vertex-lesson.png`

while being powered by the real seeded Sanity content and the real lesson video.

The final result should feel like part of the existing Vertex application rather than a standalone demo.