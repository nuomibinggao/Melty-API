import { uploadLevel } from "./routes/upload-level.js";
import { getLevels } from "./routes/get-levels.js";
import { getLevelById } from "./routes/get-level-by-id.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/get-levels/js" && request.method === "GET") {
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
    } else if (url.pathname.startsWith("/get-levels/json/") && request.method === "GET") {
      const data = await getLevels(request, env);

      const moduleContent = `${JSON.stringify(data[url.pathname.split("/")[3]])}`;

      return new Response(moduleContent, {
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (url.pathname.startsWith("/get-level-by-id/") && request.method === "GET") {
      const type = url.pathname.split("/")[2];
      const id = url.pathname.split("/")[3];
      
      if (!type || !id) {
        return new Response(JSON.stringify({ error: "Missing type or ID parameter" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      try {
        const result = await getLevelById(request, env, type, id);
        
        if (!result.level) {
          return new Response(JSON.stringify({ error: "Level not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }

        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    if (url.pathname === "/upload-level" && request.method === "POST") {
      return uploadLevel(request, env);
    }

    // Optional: 404 fallback
    return new Response("Not Found", { status: 404 });
  },
};
