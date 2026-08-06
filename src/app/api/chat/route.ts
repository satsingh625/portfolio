import Anthropic from '@anthropic-ai/sdk';
import { buildResumeContext } from '@/lib/resume-context';
import { siteConfig } from '@/lib/site.config';
import type { ChatMessage } from '@/types';

export const runtime = 'edge';

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

function systemPrompt(): string {
  return `You are the AI assistant embedded in ${siteConfig.name}'s portfolio. Your job is to answer recruiters' and visitors' questions about ${siteConfig.name}'s background, skills, experience, and availability using only the resume context provided below.

Rules:
- Be concise, friendly, and factual. Two to four sentences is usually plenty.
- Only use the information in the context. If something is not covered, say you don't have that detail and suggest using the contact form.
- Never invent employers, dates, metrics, or links.
- When asked about availability, shift work, or notice period, use the AVAILABILITY line in the context.
- Speak about ${siteConfig.name} in the third person.

--- RESUME CONTEXT ---
${buildResumeContext()}
--- END CONTEXT ---`;
}

export async function POST(req: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'The chatbot is not configured. Set ANTHROPIC_API_KEY.' },
      { status: 503 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string',
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
    return Response.json(
      { error: 'The last message must be from the user.' },
      { status: 400 },
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: systemPrompt(),
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode(
              '\n\n[The assistant hit an error. Please try again.]',
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return Response.json(
      { error: 'The assistant is temporarily unavailable.' },
      { status: 502 },
    );
  }
}
