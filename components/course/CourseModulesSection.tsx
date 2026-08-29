"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
  const [expanded, setExpanded] = useState(false);
  const hasMore = modules.length > INITIAL_VISIBLE;
  const visibleModules = expanded ? modules : modules.slice(0, INITIAL_VISIBLE);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
          Course Content
        </h2>
        <p className="text-sm text-neutral-500">
          {modules.length} modules · {formatDuration(totalDuration)}
        </p>
      </div>

      <div className="divide-y divide-neutral-200 rounded-md border border-neutral-200 bg-white">
        {visibleModules.map((module, index) => (
          <div
            key={`${module.title}-${index}`}
            className="flex items-start justify-between gap-4 px-6 py-5"
          >
            <div className="flex min-w-0 flex-1 gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-700">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-heading-3 font-medium leading-[26px] text-neutral-900">
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
              <ChevronDownIcon className="h-4 w-4" strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50",
            )}
          >
            {expanded
              ? "Show fewer modules"
              : `Show all ${modules.length} modules`}
            <ChevronDownIcon
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              strokeWidth={2}
            />
          </button>
        </div>
      )}
    </section>
  );
}
