"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/format-duration";
import { cn } from "@/lib/cn";
import type { CourseModule } from "@/types/course";

type CourseModulesSectionProps = {
  modules: CourseModule[];
  totalDuration: number;
};

const INITIAL_VISIBLE = 6;

export function CourseModulesSection({
  modules,
  totalDuration,
}: CourseModulesSectionProps) {
  const [showAllModules, setShowAllModules] = useState(false);
  const [expandedModuleIndexes, setExpandedModuleIndexes] = useState<Set<number>>(
    new Set(),
  );
  const hasMore = modules.length > INITIAL_VISIBLE;
  const visibleModules = showAllModules
    ? modules
    : modules.slice(0, INITIAL_VISIBLE);

  function toggleModule(index: number) {
    setExpandedModuleIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
          Course Content
        </h2>
        <p className="text-sm text-neutral-500">
          {modules.length} modules • {formatDuration(totalDuration)}
        </p>
      </div>

      <div className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        {visibleModules.map((module, index) => {
          const isExpanded = expandedModuleIndexes.has(index);

          return (
            <div key={`${module.title}-${index}`}>
              <button
                type="button"
                onClick={() => toggleModule(index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50"
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-display text-heading-3 font-semibold leading-[26px] text-neutral-900">
                      {module.title}
                    </h3>
                    {module.summary && (
                      <p className="mt-1 text-body leading-5 text-neutral-500">
                        {module.summary}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-sm text-neutral-500">
                  <span>{formatDuration(module.duration)}</span>
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded && "rotate-180",
                    )}
                    strokeWidth={2}
                  />
                </div>
              </button>

              {isExpanded && module.lessons.length > 0 && (
                <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.slug}
                      href={`/lessons/${lesson.slug}`}
                      className="flex items-center justify-between gap-4 border-b border-neutral-100 py-3 last:border-0 hover:opacity-80"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="w-10 shrink-0 text-sm text-neutral-500">
                          {index + 1}.{lessonIndex + 1}
                        </span>
                        <span className="min-w-0 text-body font-medium text-neutral-900">
                          {lesson.title}
                        </span>
                        {lesson.freePreview && (
                          <Badge variant="feature">Free preview</Badge>
                        )}
                      </div>
                      <span className="shrink-0 text-sm text-neutral-500">
                        {formatDuration(lesson.duration)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllModules((value) => !value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50",
            )}
          >
            {showAllModules
              ? "Show fewer modules"
              : `Show all ${modules.length} modules`}
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 transition-transform",
                showAllModules && "rotate-180",
              )}
              strokeWidth={2}
            />
          </button>
        </div>
      )}
    </section>
  );
}
