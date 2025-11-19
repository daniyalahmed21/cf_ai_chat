import { ChatService } from "./chat-service";
import { AIService } from "./ai-service";

export async function handleChatPOST(request: Request, env: Env) {
  const { message } = await request.json<{ message: string }>();

  const chat = new ChatService(env);
  const ai = new AIService(env);

  // Save user message
  await chat.addMessage(message);

  // Fetch history
  const history = await chat.getHistory();

  // Build prompt + run AI
  const prompt = ai.buildPrompt(history, message);
  const reply = await ai.getAIResponse(prompt);

  // Save AI response
  if (reply) {
    await chat.addMessage(reply);
  }else {
    throw new Error("AI response is empty");
  }

  return Response.json({ reply });
}
