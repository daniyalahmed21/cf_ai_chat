import { handleChatPOST } from './routes';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Attach ExecutionContext to env if needed
    (env as any).ctx = ctx;

    const url = new URL(request.url);
    const userId = request.headers.get('x-user-id') || 'default';

    // ---------------- CORS Preflight ----------------
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,x-user-id,Authorization',
        },
      });
    }

    // Helper to add CORS to actual responses
    const withCors = (response: Response) => {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      return newResponse;
    };

    try {
      // ---------------- POST /chat ----------------
      if (url.pathname.startsWith('/chat') && request.method === 'POST') {
        const res = await handleChatPOST(request, env, userId);
        return withCors(res);
      }

      // ---------------- GET /chat/history ----------------
      if (url.pathname.startsWith('/chat/history') && request.method === 'GET') {
        const id = env.CHAT_HISTORY.idFromName(userId);
        const stub = env.CHAT_HISTORY.get(id);
        const res = await stub.fetch(request);
        return withCors(res);
      }

      return new Response('Not found', { status: 404 });
    } catch (err) {
      console.error('Worker fetch error:', err);
      return withCors(new Response('Internal Error', { status: 500 }));
    }
  },
};
