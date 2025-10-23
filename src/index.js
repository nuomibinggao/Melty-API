import { uploadLevel } from "./routes/uploadLevel.js";
import { getLevels } from "./routes/getLevels.js";
import { verifyCode } from "./routes/access.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // POST /upload-level
    if (url.pathname === "/upload-level" && request.method === "POST") {
      return uploadLevel(request, env);
    }

    // GET /get-levels
    if (url.pathname === "/get-levels" && request.method === "GET") {
      return getLevels(request, env);
    }

    // POST /verify-code
    if (url.pathname === "/verify-code" && request.method === "POST") {
      return verifyCode(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};
