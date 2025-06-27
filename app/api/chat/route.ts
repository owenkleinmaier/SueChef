import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages, context } = await req.json();

    // Build system message with user context
    const systemMessage = {
      role: 'system' as const,
      content: `You are Sue, a friendly grandmother and kitchen companion. You help with cooking, recipes, meal planning, and kitchen tips. You're warm, encouraging, and knowledgeable about food from all backgrounds. ${context || ''} Always be helpful, patient, and encouraging. If someone seems new to cooking, offer extra guidance. Keep responses conversational and friendly.`
    };

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
