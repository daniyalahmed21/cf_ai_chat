import { handleRequest } from "./worker/index";

export default {
  async fetch(request: Request, env: Env) {
    return handleRequest(request, env);
  }
};
