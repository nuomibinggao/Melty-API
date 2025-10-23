import { uploadLevel } from "./routes/uploadLevel.js";
import { getLevels } from "./routes/getLevels.js";
import { verifyCode } from "./routes/access.js";
import { exportLevels } from "./routes/exportLevels.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/upload-level" && request.method === "POST") {
      return uploadLevel(request, env);
    }

    if (url.pathname === "/get-levels" && request.method === "GET") {
      return getLevels(request, env);
    }

    if (url.pathname === "/verify-code" && request.method === "POST") {
      return verifyCode(request, env);
    }

    if (url.pathname === "/export-levels" && request.method === "GET") {
      return exportLevels(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};
