import { anthropic } from "@ai-sdk/anthropic";
import { createMCPClient } from "@ai-sdk/mcp";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";

export const runtime = "nodejs";

type ContextSearchRequest = {
  messages: UIMessage[];
};

const presentSearchResults = tool({
  description:
    "Present grounded Vertex course or lesson search results to the user as structured data after you have verified them using Sanity Context tools.",
  inputSchema: z.object({
    results: z.array(
      z.object({
        type: z.enum(["course", "lesson"]),
        title: z.string(),
        slug: z.string(),
        courseTitle: z.string().optional(),
        courseSlug: z.string().optional(),
        duration: z.number().optional(),
        reason: z.string().optional(),
      }),
    ),
  }),
  execute: async ({ results }) => {
    return {
      results,
    };
  },
});

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

When a user asks for courses, lessons, or content recommendations:

1. Use Sanity Context tools to verify the relevant content.
2. Retrieve the real title and slug for every result.
3. When useful, also retrieve course title, course slug, duration, module,
   instructor, or other relevant context.
4. After verifying the results, call the presentSearchResults tool with the
   structured results.
5. Keep the accompanying prose concise.

For course results:
- type must be "course"
- title must be the real course title
- slug must be the real course slug

For lesson results:
- type must be "lesson"
- title must be the real lesson title
- slug must be the real lesson slug
- include courseTitle and courseSlug when available

Do not call presentSearchResults with guessed data.

Sanity schema context:

${initialContext}
      `.trim(),

      messages: await convertToModelMessages(body.messages),

      tools: {
        ...contextTools,
        presentSearchResults,
      },

      stopWhen: stepCountIs(6),

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