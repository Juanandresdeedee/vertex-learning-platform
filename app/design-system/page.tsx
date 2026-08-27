import {
  BellIcon,
  BookmarkIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ChevronRightIcon as ChevronRightIconSolid,
  ClockIcon as ClockIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PlayCircleIcon as PlayCircleIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import { CourseCard } from "@/components/cards/CourseCard";
import { LessonCard } from "@/components/cards/LessonCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Navbar } from "@/components/navigation/Navbar";
import { Pagination } from "@/components/navigation/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Select } from "@/components/ui/Select";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

const outlineIcons = [
  { Icon: BellIcon, label: "bell" },
  { Icon: MagnifyingGlassIcon, label: "search" },
  { Icon: PlayCircleIcon, label: "play" },
  { Icon: DocumentTextIcon, label: "file" },
  { Icon: BookmarkIcon, label: "bookmark" },
  { Icon: ChartBarIcon, label: "chart" },
  { Icon: ClockIcon, label: "clock" },
  { Icon: UserIcon, label: "user" },
  { Icon: ChevronRightIcon, label: "chevron" },
] as const;

const solidIcons = [
  { Icon: BellIconSolid, label: "bell" },
  { Icon: MagnifyingGlassIconSolid, label: "search" },
  { Icon: PlayCircleIconSolid, label: "play" },
  { Icon: DocumentTextIconSolid, label: "file" },
  { Icon: BookmarkIconSolid, label: "bookmark" },
  { Icon: ChartBarIconSolid, label: "chart" },
  { Icon: ClockIconSolid, label: "clock" },
  { Icon: UserIconSolid, label: "user" },
  { Icon: ChevronRightIconSolid, label: "chevron" },
] as const;

const primaryColors = [
  { name: "Primary 500", token: "primary-500", hex: "#F97316" },
  { name: "Primary 400", token: "primary-400", hex: "#FB923C" },
  { name: "Primary 300", token: "primary-300", hex: "#FDBA74" },
  { name: "Primary 200", token: "primary-200", hex: "#FED7AA" },
  { name: "Primary 100", token: "primary-100", hex: "#FFEEE5" },
] as const;

const neutralColors = [
  { name: "Neutral 900", token: "neutral-900", hex: "#0F172A" },
  { name: "Neutral 700", token: "neutral-700", hex: "#334155" },
  { name: "Neutral 500", token: "neutral-500", hex: "#64748B" },
  { name: "Neutral 300", token: "neutral-300", hex: "#CBD5E1" },
  { name: "Neutral 200", token: "neutral-200", hex: "#E2E8F0" },
  { name: "Neutral 100", token: "neutral-100", hex: "#F1F5F9" },
  { name: "Neutral 50", token: "neutral-50", hex: "#FAFAFC" },
  { name: "White", token: "white", hex: "#FFFFFF" },
] as const;

const spacingScale = [
  { px: 4, token: "1", rem: "0.25rem" },
  { px: 8, token: "2", rem: "0.5rem" },
  { px: 12, token: "3", rem: "0.75rem" },
  { px: 16, token: "4", rem: "1rem" },
  { px: 24, token: "6", rem: "1.5rem" },
  { px: 32, token: "8", rem: "2rem" },
  { px: 40, token: "10", rem: "2.5rem" },
  { px: 48, token: "12", rem: "3rem" },
  { px: 64, token: "16", rem: "4rem" },
] as const;

const radiusSamples = [
  { label: "xs — 4px", className: "rounded-xs" },
  { label: "sm — 8px", className: "rounded-sm" },
  { label: "md — 12px", className: "rounded-md" },
  { label: "lg — 16px", className: "rounded-lg" },
  { label: "xl — 24px", className: "rounded-xl" },
  { label: "full", className: "rounded-full" },
] as const;

const shadowSamples = [
  { label: "Sm", className: "shadow-sm" },
  { label: "Md", className: "shadow-md" },
  { label: "Lg", className: "shadow-lg" },
  { label: "Xl", className: "shadow-xl" },
] as const;

const typeScale = [
  {
    label: "Display 1",
    sample: "Page titles",
    className: "font-display text-display-1 font-bold leading-[56px]",
  },
  {
    label: "Display 2",
    sample: "Section titles",
    className: "font-display text-display-2 font-bold leading-[44px]",
  },
  {
    label: "Heading 1",
    sample: "Card titles",
    className: "text-heading-1 font-semibold leading-[36px]",
  },
  {
    label: "Heading 2",
    sample: "Sub section",
    className: "text-heading-2 font-semibold leading-[30px]",
  },
  {
    label: "Heading 3",
    sample: "Small titles",
    className: "text-heading-3 font-medium leading-[26px]",
  },
  {
    label: "Body Large",
    sample: "Body copy for longer passages of text.",
    className: "text-body-lg leading-6",
  },
  {
    label: "Body",
    sample: "Supporting text and descriptions.",
    className: "text-body leading-5",
  },
  {
    label: "Small",
    sample: "Captions, meta",
    className: "text-small leading-4 text-neutral-500",
  },
] as const;

const principles = [
  {
    title: "Clarity First",
    description: "Every element should communicate clearly.",
  },
  {
    title: "Consistency",
    description:
      "Use components and patterns consistently across the platform.",
  },
  {
    title: "Focus & Calm",
    description: "Remove noise and help learners focus on what matters.",
  },
  {
    title: "Accessible",
    description: "Design with accessibility and inclusivity in mind.",
  },
] as const;

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-small font-medium uppercase tracking-wide text-neutral-500">
          {number}
        </p>
        <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({
  name,
  hex,
}: {
  name: string;
  token: string;
  hex: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-sm border border-neutral-200"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-sm font-medium text-neutral-900">{name}</p>
        <p className="text-small text-neutral-500">{hex}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-full bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white px-6 py-8">
        <p className="text-small text-neutral-500">Vertex Design System · v1.0</p>
        <h1 className="font-display text-display-1 font-bold leading-[56px] text-neutral-900">
          Design System
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-neutral-500">
          A unified design language for the Vertex learning platform. Clean,
          modern, and focused on clarity, consistency, and intuitive learning
          experiences.
        </p>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        <Section number="01" title="Colors">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-heading-3 font-medium text-neutral-900">
                Primary
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {primaryColors.map((color) => (
                  <ColorSwatch key={color.token} {...color} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-heading-3 font-medium text-neutral-900">
                Neutral
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {neutralColors.map((color) => (
                  <ColorSwatch key={color.token} {...color} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section number="02" title="Typography">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-md border border-neutral-200 bg-white p-6">
              <p className="font-display text-3xl font-bold text-neutral-900">
                Playfair Display
              </p>
              <p className="mt-2 text-body text-neutral-500">
                Elegant · Readable · Timeless
              </p>
              <p className="mt-4 font-display text-display-2 font-bold">
                Display headings
              </p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-white p-6">
              <p className="text-3xl font-semibold text-neutral-900">Inter</p>
              <p className="mt-2 text-body text-neutral-500">
                Clean · Modern · Highly legible
              </p>
              <p className="mt-4 text-heading-1 font-semibold">
                UI and body text
              </p>
            </div>
          </div>
        </Section>

        <Section number="03" title="Type Scale">
          <div className="flex flex-col gap-6 rounded-md border border-neutral-200 bg-white p-6">
            {typeScale.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-neutral-100 pb-4 last:border-0 last:pb-0 md:grid-cols-[140px_1fr]"
              >
                <p className="text-small font-medium text-neutral-500">
                  {item.label}
                </p>
                <p className={item.className}>{item.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="04" title="Spacing System">
          <p className="text-body text-neutral-500">
            Base unit: 4px. Tailwind default scale.
          </p>
          <div className="flex flex-col gap-3">
            {spacingScale.map((space) => (
              <div
                key={space.token}
                className="flex flex-wrap items-center gap-4"
              >
                <span className="w-24 text-small text-neutral-500">
                  {space.px}px ({space.rem})
                </span>
                <div
                  className="h-4 bg-primary-500"
                  style={{ width: space.px }}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section number="05" title="Radius & Shadows">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {radiusSamples.map((sample) => (
                <div key={sample.label} className="flex flex-col gap-2">
                  <div
                    className={`h-16 w-full border border-neutral-200 bg-white ${sample.className}`}
                  />
                  <p className="text-small text-neutral-500">{sample.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {shadowSamples.map((sample) => (
                <div key={sample.label} className="flex flex-col gap-2">
                  <div
                    className={`h-16 w-full rounded-md bg-white ${sample.className}`}
                  />
                  <p className="text-small text-neutral-500">{sample.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section number="06" title="Icons">
          <p className="text-body text-neutral-500">
            24×24 grid · 2px stroke · outline and filled styles
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-medium text-neutral-700">
                Outline
              </p>
              <div className="flex flex-wrap gap-6">
                {outlineIcons.map(({ Icon, label }) => (
                  <Icon
                    key={label}
                    className="h-6 w-6 text-neutral-900"
                    strokeWidth={2}
                    aria-label={label}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-neutral-700">
                Filled
              </p>
              <div className="flex flex-wrap gap-6">
                {solidIcons.map(({ Icon, label }) => (
                  <Icon
                    key={label}
                    className="h-6 w-6 text-neutral-900"
                    aria-label={label}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section number="07" title="Buttons">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="pb-3 pr-4 font-medium">Variant</th>
                  <th className="pb-3 pr-4 font-medium">Default</th>
                  <th className="pb-3 pr-4 font-medium">Hover</th>
                  <th className="pb-3 font-medium">Disabled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {(["primary", "secondary", "tertiary", "text"] as const).map(
                  (variant) => (
                    <tr key={variant}>
                      <td className="py-4 pr-4 capitalize text-neutral-700">
                        {variant}
                      </td>
                      <td className="py-4 pr-4">
                        <Button variant={variant}>Label</Button>
                      </td>
                      <td className="py-4 pr-4">
                        <Button variant={variant} className="pointer-events-none">
                          Label
                        </Button>
                        <p className="mt-1 text-xs text-neutral-400">
                          Hover in browser
                        </p>
                      </td>
                      <td className="py-4">
                        <Button variant={variant} disabled>
                          Label
                        </Button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="08" title="Inputs">
          <div className="grid max-w-xl gap-6">
            <Input
              showSearchIcon
              placeholder="Search courses, lessons, topics..."
              shortcutHint="⌘ K"
            />
            <Select defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              <option value="nextjs">Next.js</option>
              <option value="react">React</option>
            </Select>
          </div>
        </Section>

        <Section number="09" title="Badges / Tags">
          <div className="flex flex-wrap gap-3">
            <Badge variant="video">Video</Badge>
            <Badge variant="lesson">Lesson</Badge>
            <Badge variant="popular">Popular</Badge>
          </div>
        </Section>

        <Section number="10" title="Status / Indicators">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            <StatusIndicator variant="in-progress" label="In Progress" />
            <StatusIndicator variant="completed" label="Completed" />
            <StatusIndicator variant="now-playing" label="Now Playing" />
            <StatusIndicator variant="locked" label="Locked" />
          </div>
        </Section>

        <Section number="11" title="Progress Bar">
          <div className="max-w-md">
            <ProgressBar value={35} label="35% complete" />
          </div>
        </Section>

        <Section number="12" title="Cards">
          <div className="grid gap-6 lg:grid-cols-2">
            <CourseCard
              courseIcon="N"
              title="Next.js for Production"
              description="Build fast, scalable React applications with the App Router, server components, and modern deployment patterns."
              level="Intermediate"
              duration="12 hours"
              moduleCount="8 modules"
            />
            <LessonCard
              variant="video"
              title="Understanding Server Components"
              description="Learn when and how to use React Server Components in your Next.js application."
              lessonLabel="Lesson 3.2 · Server Components"
              ctaText="Watch from 12:45"
            />
            <LessonCard
              variant="lesson"
              title="Data Fetching Patterns"
              description="Explore caching strategies and data loading in the App Router."
              lessonLabel="Lesson 5.1 · Data Fetching"
              keyPoints={[
                "Static and dynamic rendering",
                "Cache revalidation",
                "Parallel data fetching",
              ]}
            />
            <ResourceCard
              title="Server Components Cheat Sheet"
              description="Quick reference for RSC patterns and best practices."
              fileType="PDF"
              fileSize="1.2 MB"
            />
          </div>
        </Section>

        <Section number="13" title="Navigation">
          <div className="flex flex-col gap-8 overflow-hidden rounded-md border border-neutral-200 bg-white">
            <Navbar />
            <div className="px-6 pb-4">
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div className="border-t border-neutral-100 px-6 py-4">
              <Pagination currentPage={2} totalPages={5} />
            </div>
          </div>
        </Section>

        <Section number="14" title="Principles">
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-md border border-neutral-200 bg-white p-6"
              >
                <h3 className="text-heading-3 font-medium text-neutral-900">
                  {principle.title}
                </h3>
                <p className="mt-2 text-body text-neutral-500">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
