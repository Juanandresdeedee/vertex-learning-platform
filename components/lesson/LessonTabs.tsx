"use client";

import { useMemo, useState } from "react";
import { PortableText } from "@portabletext/react";
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import type { PortableTextBlock } from "@portabletext/types";

import { cn } from "@/lib/cn";
import { portableTextComponents } from "@/lib/portable-text";
import type { LessonResource } from "@/types/lesson";

type LessonTabsProps = {
  notes: PortableTextBlock[];
  keyPoints: string[];
  proTip?: string;
  resources: LessonResource[];
};

type Tab = "content" | "notes";

function getOverview(notes: PortableTextBlock[]): string | null {
  for (const block of notes) {
    if (
      block._type !== "block" ||
      block.style !== "normal" ||
      !Array.isArray(block.children)
    ) {
      continue;
    }

    const text = block.children
      .map((child) => {
        if (
          typeof child === "object" &&
          child !== null &&
          "text" in child &&
          typeof child.text === "string"
        ) {
          return child.text;
        }

        return "";
      })
      .join("")
      .trim();

    if (text) {
      return text;
    }
  }

  return null;
}

export function LessonTabs({
  notes,
  keyPoints,
  proTip,
  resources,
}: LessonTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("content");

  const overview = useMemo(() => getOverview(notes), [notes]);

  return (
    <section className="mt-8">
      <div className="flex border-b border-neutral-200">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={cn(
            "border-b-2 px-1 pb-3 pr-6 text-sm font-medium transition-colors",
            activeTab === "content"
              ? "border-primary-500 text-neutral-950"
              : "border-transparent text-neutral-500 hover:text-neutral-900",
          )}
        >
          Lesson Content
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={cn(
            "border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
            activeTab === "notes"
              ? "border-primary-500 text-neutral-950"
              : "border-transparent text-neutral-500 hover:text-neutral-900",
          )}
        >
          Notes
        </button>
      </div>

      {activeTab === "content" ? (
        <div className="py-8">
          {overview ? (
            <section>
              <h2 className="text-xl font-semibold text-neutral-950">
                Overview
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
                {overview}
              </p>
            </section>
          ) : null}

          {keyPoints.length > 0 ? (
            <section className={cn(overview && "mt-8")}>
              <h2 className="text-xl font-semibold text-neutral-950">
                In this lesson you will:
              </h2>

              <ul className="mt-4 space-y-3">
                {keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-6 text-neutral-700"
                  >
                    <CheckCircleIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                      strokeWidth={2}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {proTip ? (
            <section className="mt-8 rounded-xl border border-primary-100 bg-primary-100/40 p-5">
              <div className="flex items-start gap-3">
                <LightBulbIcon
                  className="h-5 w-5 shrink-0 text-primary-500"
                  strokeWidth={2}
                />

                <div>
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Pro Tip
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    {proTip}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {resources.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-neutral-950">
                Resources
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {resources.map((resource) => (
                  <a
                    key={resource._key}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {resource.type ? (
                          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                            {resource.type}
                          </p>
                        ) : null}

                        <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                          {resource.title}
                        </h3>

                        {resource.description ? (
                          <p className="mt-2 text-sm leading-6 text-neutral-600">
                            {resource.description}
                          </p>
                        ) : null}
                      </div>

                      <ArrowTopRightOnSquareIcon
                        className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-700"
                        strokeWidth={2}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <div className="py-8">
          {notes.length > 0 ? (
            <div className="max-w-3xl space-y-4">
              <PortableText
                value={notes}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              No notes are available for this lesson.
            </p>
          )}
        </div>
      )}
    </section>
  );
}