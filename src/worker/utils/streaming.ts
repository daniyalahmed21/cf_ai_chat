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
    try {
      if (stream && typeof stream[Symbol.asyncIterator] === 'function') {
        for await (const chunk of stream) {
          const text = chunk?.response || chunk?.text || '';
          if (text) {
            fullText += text;
            await writer.write(encoder.encode(text));
          }
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
    } finally {
      await writer.close();
    }
    return fullText;
  })();

  const streamResponse = new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });

  return {
    streamResponse,
    finalTextPromise,
  };
}