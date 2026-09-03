"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

import { formatDuration } from "@/lib/format-duration";
import { lessonHref } from "@/lib/lesson";
import { cn } from "@/lib/cn";
import type { LessonCourseModule } from "@/types/lesson";

type LessonSidebarProps = {
  courseTitle: string;
  courseSlug: string;
  courseCoverUrl?: string;
  modules: LessonCourseModule[];
  currentModuleIndex: number;
  currentLessonSlug: string;
};

export function LessonSidebar({
  courseTitle,
  courseSlug,
  courseCoverUrl,
  modules,
  currentModuleIndex,
  currentLessonSlug,
}: LessonSidebarProps) {
  const [expandedModuleIndex, setExpandedModuleIndex] =
    useState(currentModuleIndex);

  return (
    <aside className="w-full border-r border-neutral-200 bg-white lg:w-[340px] lg:shrink-0">
      <div className="border-b border-neutral-200 p-5">
        <Link
          href={`/courses/${courseSlug}`}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          ← Back to course
        </Link>

        <div className="mt-5 flex items-center gap-3">
          {courseCoverUrl ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={courseCoverUrl}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold text-neutral-950">
              {courseTitle}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              {modules.length} modules
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-700">
              Course progress
            </span>
            <span className="text-neutral-500">0%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-0 rounded-full bg-primary-500" />
          </div>
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Module {currentModuleIndex + 1} of {modules.length}
        </p>
      </div>

      <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
        {modules.map((module, moduleIndex) => {
          const isExpanded = expandedModuleIndex === moduleIndex;
          const isCurrentModule = currentModuleIndex === moduleIndex;

          return (
            <div
              key={`${module.title}-${moduleIndex}`}
              className="border-b border-neutral-200"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedModuleIndex(
                    isExpanded ? -1 : moduleIndex,
                  )
                }
                className={cn(
                  "flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50",
                  isCurrentModule && "bg-neutral-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                    isCurrentModule
                      ? "border-primary-500 text-primary-500"
                      : "border-neutral-200 text-neutral-500",
                  )}
                >
                  {moduleIndex + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {module.title}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {module.lessons.length} lessons ·{" "}
                    {formatDuration(module.duration)}
                  </p>
                </div>

                {isExpanded ? (
                  <ChevronDownIcon className="mt-1 h-4 w-4 shrink-0 text-neutral-500" />
                ) : (
                  <ChevronRightIcon className="mt-1 h-4 w-4 shrink-0 text-neutral-500" />
                )}
              </button>

              {isExpanded ? (
                <div className="pb-3">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isActive =
                      lesson.slug === currentLessonSlug;

                    return (
                      <Link
                        key={lesson._id}
                        href={lessonHref(lesson.slug)}
                        className={cn(
                          "flex items-start gap-3 border-l-2 px-5 py-3 pl-10 transition-colors",
                          isActive
                            ? "border-primary-500 bg-primary-100/50"
                            : "border-transparent hover:bg-neutral-50",
                        )}
                      >
                        <PlayCircleIcon
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isActive
                              ? "text-primary-500"
                              : "text-neutral-400",
                          )}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-sm",
                              isActive
                                ? "font-semibold text-neutral-950"
                                : "text-neutral-700",
                            )}
                          >
                            {moduleIndex + 1}.{lessonIndex + 1}{" "}
                            {lesson.title}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                            {isActive ? (
                              <span className="font-medium text-primary-500">
                                Now playing
                              </span>
                            ) : (
                              <span>
                                {formatDuration(lesson.duration)}
                              </span>
                            )}

                            {lesson.freePreview ? (
                              <span className="font-medium uppercase text-primary-500">
                                Free preview
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}