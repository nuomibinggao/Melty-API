import { uploadLevel } from "./routes/upload-level.js";
import { getLevels } from "./routes/get-levels.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/upload-level" && request.method === "POST") {
      return uploadLevel(request, env);
    }

    if (url.pathname === "/get-levels" && request.method === "GET") {
      return getLevels(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};
