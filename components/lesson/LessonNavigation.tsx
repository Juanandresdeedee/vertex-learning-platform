import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import { lessonHref } from "@/lib/lesson";

type LessonNavigationItem = {
  title: string;
  slug: string;
  moduleTitle: string;
};

type LessonNavigationProps = {
  previousLesson?: LessonNavigationItem;
  nextLesson?: LessonNavigationItem;
};

export function LessonNavigation({
  previousLesson,
  nextLesson,
}: LessonNavigationProps) {
  if (!previousLesson && !nextLesson) {
    return null;
  }

  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-10 grid gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2"
    >
      <div>
        {previousLesson ? (
          <Link
            href={lessonHref(previousLesson.slug)}
            className="group flex h-full items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <ArrowLeftIcon
              className="mt-1 h-4 w-4 shrink-0 text-neutral-500 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={2}
            />

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Previous Lesson
              </p>

              <p className="mt-1 text-sm font-semibold text-neutral-950">
                {previousLesson.title}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {previousLesson.moduleTitle}
              </p>
            </div>
          </Link>
        ) : null}
      </div>

      <div>
        {nextLesson ? (
          <Link
            href={lessonHref(nextLesson.slug)}
            className="group flex h-full items-start justify-end gap-3 rounded-xl border border-neutral-200 p-4 text-right transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Next Lesson
              </p>

              <p className="mt-1 text-sm font-semibold text-neutral-950">
                {nextLesson.title}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {nextLesson.moduleTitle}
              </p>
            </div>

            <ArrowRightIcon
              className="mt-1 h-4 w-4 shrink-0 text-neutral-500 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}