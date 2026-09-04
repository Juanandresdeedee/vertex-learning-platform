"use client";

import { FormEvent, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { Input } from "@/components/ui/Input";

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

            if (!text) {
              return null;
            }

            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
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
                      }}
                    >
                      {text}
                    </ReactMarkdown>
                  )}
                </div>
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