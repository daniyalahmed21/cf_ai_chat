import { routeChat } from "./router";

export class ChatHistory {
  state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    return routeChat(this.state, request);
  }
}
