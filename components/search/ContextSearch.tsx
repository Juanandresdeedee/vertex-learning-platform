"use client";

import { FormEvent, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  isToolUIPart,
} from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatDuration } from "@/lib/format-duration";

type SearchResult = {
  type: "course" | "lesson";
  title: string;
  slug: string;
  courseTitle?: string;
  courseSlug?: string;
  duration?: number;
  reason?: string;
};

type SearchResultsOutput = {
  results: SearchResult[];
};

function SearchResultCard({
  result,
}: {
  result: SearchResult;
}) {
  const href =
    result.type === "course"
      ? `/courses/${result.slug}`
      : `/lessons/${result.slug}`;

  return (
    <a
      href={href}
      className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={result.type === "lesson" ? "lesson" : "feature"}
            >
              {result.type === "lesson" ? "Lesson" : "Course"}
            </Badge>

            {result.duration != null ? (
              <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                <ClockIcon className="h-4 w-4" strokeWidth={2} />
                {formatDuration(result.duration)}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-lg font-semibold text-neutral-950">
            {result.title}
          </h3>

          {result.courseTitle ? (
            <p className="mt-1 text-sm text-neutral-500">
              {result.courseTitle}
            </p>
          ) : null}

          {result.reason ? (
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {result.reason}
            </p>
          ) : null}
        </div>

        <ArrowRightIcon
          className="mt-1 h-5 w-5 shrink-0 text-primary-500"
          strokeWidth={2}
        />
      </div>
    </a>
  );
}

export function ContextSearch() {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/context-search",
    }),
  });

  const isLoading =
    status === "submitted" || status === "streaming";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = input.trim();

    if (!value || isLoading) {
      return;
    }

    sendMessage({
      text: value,
    });

    setInput("");
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
          <SparklesIcon
            className="h-5 w-5 text-primary-500"
            strokeWidth={2}
          />
        </div>

        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
          Search across Vertex
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-500">
          Ask a question about courses, lessons, technologies, or concepts
          you want to learn.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mt-8"
        >
          <Input
            size="lg"
            showSearchIcon
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What do you want to learn?"
            disabled={isLoading}
            className="pr-16"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Search Vertex"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-primary-500 text-white transition-colors hover:bg-primary-400 disabled:cursor-not-allowed disabled:bg-primary-200"
          >
            <ArrowUpIcon
              className="h-5 w-5"
              strokeWidth={2}
            />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-neutral-500">
          <span>Try:</span>
          <span>“How do AI agents work?”</span>
          <span>·</span>
          <span>“Teach me Docker”</span>
          <span>·</span>
          <span>“Find lessons about RAG”</span>
        </div>
      </div>

      {messages.length > 0 ? (
        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {messages.map((message) => {
            const text = message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            const searchResults = message.parts.flatMap((part) => {
              if (!isToolUIPart(part)) {
                return [];
              }

              if (part.type !== "tool-presentSearchResults") {
                return [];
              }

              if (part.state !== "output-available") {
                return [];
              }

              const output = part.output as SearchResultsOutput;

              return output.results ?? [];
            });

            const isUser = message.role === "user";

            if (!text && searchResults.length === 0) {
              return null;
            }

            return (
              <div
                key={message.id}
                className="space-y-4"
              >
                {text ? (
                  <div
                    className={
                      isUser
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        isUser
                          ? "max-w-[85%] rounded-xl bg-primary-500 px-5 py-4 text-sm leading-6 text-white"
                          : "max-w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm leading-7 text-neutral-700 shadow-sm"
                      }
                    >
                      {isUser ? (
                        text
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-4 last:mb-0">
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-neutral-900">
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-4 list-disc space-y-1 pl-5 last:mb-0">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-4 list-decimal space-y-1 pl-5 last:mb-0">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="pl-1">
                                {children}
                              </li>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                className="font-semibold text-primary-500 underline decoration-primary-200 underline-offset-4 transition-colors hover:text-primary-400"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ) : null}

                {searchResults.length > 0 ? (
                  <div className="grid gap-4">
                    {searchResults.map((result) => (
                      <SearchResultCard
                        key={`${result.type}-${result.slug}`}
                        result={result}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <SparklesIcon
                className="h-4 w-4 animate-pulse text-primary-500"
                strokeWidth={2}
              />
              Searching Vertex...
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Something went wrong while searching Vertex.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}