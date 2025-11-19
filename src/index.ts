export default {
	async fetch(request, env, ctx): Promise<Response> {
	 if (request.method === 'POST') {
      const { message } = await request.json<{ message: string }>();
      const prompt = `You are a helpful AI. Respond to: ${message}`;
      
      const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        prompt,
        max_tokens: 150,
      });

      return new Response(JSON.stringify({ reply: response.response }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Send a POST with { "message": "your prompt" }', { status: 200 });
  },
} satisfies ExportedHandler<Env>;

