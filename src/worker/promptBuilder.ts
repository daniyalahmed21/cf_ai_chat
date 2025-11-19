export function buildPrompt(history: string[], userMessage: string, systemPrompt?: string) {
  const messages = [
    { role: 'system', content: systemPrompt || 'You are a helpful AI assistant.' },
    ...history.map((msg) => ({ role: 'user', content: msg })),
    { role: 'user', content: userMessage },
  ];
  return messages;
}

export function flattenPrompt(messages: { role: string; content: string }[]) {
  return messages.map(m => `${m.role}: ${m.content}`).join('\n');
}
