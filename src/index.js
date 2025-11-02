import { uploadLevel } from "./routes/upload-level.js";
import { getLevels } from "./routes/get-levels.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/get-levels" && request.method === "GET") {
      const data = await getLevels(request, env);

      const moduleContent = `
export const comingSoonLevel = ${JSON.stringify(data.comingSoonLevel)};
export const indieLevels = ${JSON.stringify(data.indieLevels)};
export const plcrLevels = ${JSON.stringify(data.plcrLevels)};
export const legacyLevel = ${JSON.stringify(data.legacyLevel)};
      `;

      return new Response(moduleContent, {
        headers: { "Content-Type": "application/javascript; charset=utf-8", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (url.pathname === "/upload-level" && request.method === "POST") {
      return uploadLevel(request, env);
    }

    // Optional: 404 fallback
    return new Response("Not Found", { status: 404 });
  },
};
