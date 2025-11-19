import { ChatService } from './chat-service';
import { AIService } from './ai-service';
import { checkRateLimit } from './rateLimiter';
import { validateMessage } from './messageValidator';
import { buildPrompt, flattenPrompt } from './promptBuilder';
import { getAIStream } from './streaming';

export async function handleChatPOST(request: Request, env: Env, userId: string) {
	try {
		await checkRateLimit(env, userId);

		const { message } = (await request.json()) as { message: string };
		validateMessage(message);

		const chat = new ChatService(env, userId);
		const ai = new AIService(env);

		await chat.addMessage(message);
		const history = await chat.getHistory();

		const messages = buildPrompt(history, message);
		const promptText = flattenPrompt(messages);

		const { streamResponse, result } = await getAIStream(ai, promptText);

		async function saveFinalAIResponse(chat: ChatService, result: any) {
			const finalText = await result.text();
			await chat.addMessage(finalText);
		}

		saveFinalAIResponse(chat, result);

		return streamResponse;
		
	} catch (err) {
		console.error('handleChatPOST error:', err);
		return new Response('Internal Error', { status: 500 });
	}
}
