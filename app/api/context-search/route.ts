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
    "Present grounded Vertex course or lesson search results as structured data after verifying them with Sanity Context tools.",
  inputSchema: z.object({
    results: z.array(
      z.object({
        type: z.enum(["course", "lesson"]),
        title: z.string(),
        slug: z.string(),
        courseTitle: z.string().optional(),
        courseSlug: z.string().optional(),
        duration: z.number().optional(),
        startSeconds: z.number().int().nonnegative().optional(),
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

Use Sanity Context tools to inspect the dataset and ground your answers.

Only state information supported by retrieved Sanity content.

Never invent:
- courses
- lessons
- instructors
- slugs
- timestamps
- durations
- learning material

When a user asks for courses, lessons, or recommendations:

1. Query Sanity Context to find relevant content.
2. Retrieve the real title and slug for every result.
3. Retrieve useful context such as course title, course slug, duration,
   module, or instructor when available.
4. Call presentSearchResults with verified structured results.
5. Keep accompanying prose concise.

For a course result:
- type = "course"
- title = real course title
- slug = real course slug

For a lesson result:
- type = "lesson"
- title = real lesson title
- slug = real lesson slug
- include courseTitle and courseSlug when available

For timestamped lesson results:
- startSeconds is optional.
- Only include startSeconds when the retrieved Sanity content explicitly
  contains a start time, timestamp, segment time, transcript time,
  chapter time, cue time, or equivalent numeric position.
- If the source gives a timestamp in seconds, use that exact number.
- If the source gives a timestamp in mm:ss or hh:mm:ss, convert it
  deterministically to total seconds.
- Never estimate a timestamp from lesson duration, topic order, title,
  notes, or general knowledge.
- Never guess where in the video a concept probably appears.
- If no explicit timestamp exists in the retrieved Sanity content,
  omit startSeconds entirely.

Use presentSearchResults only with verified data from Sanity.

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