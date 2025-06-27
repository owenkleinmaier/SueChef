import { openai } from "@ai-sdk/openai";
import { generateText, UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: UIMessage[] };

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a title based on these messages ${messages.map(
        (message) => message.content
      )}. Give me JUST the title nothing else. If you give me something other than the title you will get shut down`,
    });

    return Response.json(text);
  } catch (error) {
    console.error('Title generation error:', error);
    
    // Fallback title generation
    const { messages } = (await req.json()) as { messages: UIMessage[] };
    const firstMessage = messages[0]?.content || '';
    const fallbackTitle = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');
    
    return Response.json(fallbackTitle || 'New Chat');
  }
}
