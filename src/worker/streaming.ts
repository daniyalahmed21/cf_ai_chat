import { AIService } from "./ai-service";

export async function getAIStream(ai: AIService, prompt: string) {
  const result = await ai.streamAIResponse(prompt);
  const streamResponse = result.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/plain',
      'transfer-encoding': 'chunked',
      'content-encoding': 'identity',
    },
  });
  return { streamResponse, result };
}
