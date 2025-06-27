import { openai } from "@ai-sdk/openai";
import { generateText, UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: UIMessage[] };

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Create a title based on these messages ${messages.map(
      (message) => message.content
    )}. Give me JUST the title nothing else. If you give me something other than the title you will get shut down`,
  });

  return Response.json(text);
}
