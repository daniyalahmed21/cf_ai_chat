import { handleChatPOST } from "./routes";

export async function handleRequest(request: Request, env: Env) {
  if (request.method === "POST") {
    return handleChatPOST(request, env);
  }

  return new Response("Send a POST with { message: \"Hello\" }");
}
