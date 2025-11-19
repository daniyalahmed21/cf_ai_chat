import { addMessage } from "./handlers/addMessage";
import { getHistory } from "./handlers/clearHistory";
import { clearHistory } from "./handlers/getHistory";
import { getSize } from "./handlers/getSize";

export async function routeChat(state: DurableObjectState, request: Request) {
  const url = new URL(request.url);

  switch (true) {
    case url.pathname === "/chat" && request.method === "POST":
      return addMessage(state, request);

    case url.pathname === "/chat/history" && request.method === "GET":
      return getHistory(state);

    case url.pathname === "/chat/history" && request.method === "DELETE":
      return clearHistory(state);

    case url.pathname === "/chat/size":
      return getSize(state);

    default:
      return new Response("Not found", { status: 404 });
  }
}
