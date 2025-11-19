export class ChatService {
  env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  getDO() {
    const id = this.env.CHAT_HISTORY.idFromName("main");
    return this.env.CHAT_HISTORY.get(id);
  }

  async addMessage(message: string) {
    const obj = this.getDO();
    await obj.fetch("https://dummy", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    });
  }

  async getHistory() {
    const obj = this.getDO();
    const res = await obj.fetch("https://dummy", { method: "GET" });
    const data = (await res.json()) as { history: string[] };
    return data.history;
  }
}
