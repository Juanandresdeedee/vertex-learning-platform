import { anthropic } from "@ai-sdk/anthropic";
import { createMCPClient } from "@ai-sdk/mcp";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const runtime = "nodejs";

type ContextSearchRequest = {
  messages: UIMessage[];
};

async function fetchInitialContext(): Promise<string> {
  const mcpUrl = process.env.SANITY_CONTEXT_MCP_URL;
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!mcpUrl) {
    throw new Error("Missing SANITY_CONTEXT_MCP_URL");
  }

  if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
  }

  const url = new URL(mcpUrl);

  url.pathname = `${url.pathname.replace(/\/$/, "")}/initial-context`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to fetch Sanity initial context: ${response.status} ${errorText}`,
    );
  }

  return response.text();
}

export async function POST(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN;
  const mcpUrl = process.env.SANITY_CONTEXT_MCP_URL;

  if (!token) {
    return Response.json(
      {
        error: "Missing SANITY_API_READ_TOKEN",
      },
      {
        status: 500,
      },
    );
  }

  if (!mcpUrl) {
    return Response.json(
      {
        error: "Missing SANITY_CONTEXT_MCP_URL",
      },
      {
        status: 500,
      },
    );
  }

  const body = (await request.json()) as ContextSearchRequest;

  let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | undefined;

  try {
    const [client, initialContext] = await Promise.all([
      createMCPClient({
        transport: {
          type: "http",
          url: mcpUrl,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
      fetchInitialContext(),
    ]);

    mcpClient = client;

    const allTools = await mcpClient.tools();

    const {
      initial_context: _initialContextTool,
      ...contextTools
    } = allTools;

    const result = streamText({
      model: anthropic("claude-sonnet-4-5"),

      system: `
You are the search assistant for Vertex, an online learning platform.

Your job is to help learners discover relevant courses, modules, lessons,
and educational content stored in Sanity.

Use Sanity Context tools when needed to inspect the dataset and answer
questions accurately.

Prefer grounded answers based on the available Sanity content.

Do not invent courses, lessons, instructors, slugs, timestamps, or learning
material that does not exist in the dataset.

When you mention a course, query and use its real slug and format the course
title as a Markdown link using this relative URL pattern:

/courses/{course-slug}

Example:

[Building AI Apps with LLMs](/courses/building-ai-apps-with-llms)

When you mention a lesson, query and use its real slug and format the lesson
title as a Markdown link using this relative URL pattern:

/lessons/{lesson-slug}

Example:

[Building an agent loop](/lessons/building-ai-apps-with-llms-agent-loops)

If retrieved content explicitly provides a relevant start time in seconds,
you may link directly to that point using:

/lessons/{lesson-slug}?t={seconds}

Do not invent timestamps. Only use a start time when the retrieved data
explicitly supports it.

When useful, include:
- course title
- lesson title
- instructor
- duration
- module
- a short explanation of why the result is relevant

Prefer concise, useful search results rather than long general explanations.

Sanity schema context:

${initialContext}
      `.trim(),

      messages: await convertToModelMessages(body.messages),

      tools: contextTools,

      stopWhen: stepCountIs(5),

      onError: ({ error }) => {
        console.error("Context Search stream error:", error);
      },

      onFinish: async () => {
        await mcpClient?.close();
      },
    });

    return result.toUIMessageStreamResponse({
      originalMessages: body.messages,
    });
  } catch (error) {
    await mcpClient?.close();

    console.error("Context Search route error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      {
        status: 500,
      },
    );
  }
}