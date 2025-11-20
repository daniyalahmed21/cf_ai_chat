import { AIService } from '../services/ai-service';

export async function getAIStream(
  ai: AIService,
  history: string[],
  message: string,
  summary?: string
) {
  const stream = await ai.streamAIResponse(history, message, summary);

  let fullText = '';
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const finalTextPromise = (async () => {
    for await (const chunk of stream) {
      const text = chunk.response || '';
      fullText += text;
      await writer.write(encoder.encode(text));
    }
    await writer.close();
    return fullText;
  })();

  const streamResponse = new Response(readable, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  });

  return {
    streamResponse,
    finalTextPromise,
  };
}