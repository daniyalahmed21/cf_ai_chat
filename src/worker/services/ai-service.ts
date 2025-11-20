import { buildPrompt, flattenPrompt } from '../utils/promptBuilder';
import { AI_MODEL, SUMMARY_PROMPT } from '../config/aiConfig';

export class AIService {
  constructor(private env: Env) {}

  async streamAIResponse(history: string[], message: string, summary?: string) {
    const messages = buildPrompt(history, message, summary);
    const prompt = flattenPrompt(messages);

    const response = await this.env.AI.run(AI_MODEL, {
      prompt,
      stream: true,
    });

    return response;
  }

  async generateSummary(messages: string[]): Promise<string> {
    const response = await this.env.AI.run(AI_MODEL, {
      prompt: SUMMARY_PROMPT + messages.join('\n'),
    });

    return response.response || '';
  }

  async getAIResponse(prompt: string): Promise<string> {
    const response = await this.env.AI.run(AI_MODEL, {
      prompt,
    });

    return response.response || '';
  }
}
