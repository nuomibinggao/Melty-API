export async function onRequestGet({ env }) {
  try {
    // Fetch data from D1
    const comingSoon = await env.DB.prepare("SELECT * FROM coming_soon LIMIT 1").first();
    const indie = await env.DB.prepare("SELECT * FROM indie_levels ORDER BY date DESC").all();
    const plcr = await env.DB.prepare("SELECT * FROM plcr_levels ORDER BY date DESC").all();
    const legacy = await env.DB.prepare("SELECT * FROM legacy_level LIMIT 1").first();

    const data = {
      comingSoonLevel: comingSoon || null,
      indieLevels: indie.results,
      plcrLevels: plcr.results,
      legacyLevel: legacy || null
    };

    // Convert to JS module string with literal Unicode characters
    function toJsModule(obj) {
      let json = JSON.stringify(obj, null, 2);
      json = json.replace(/\\u([\dA-Fa-f]{4})/g, (_, g1) =>
        String.fromCharCode(parseInt(g1, 16))
      );
      return `
export const comingSoonLevel = ${json.comingSoonLevel};
export const indieLevels = ${json.indieLevels};
export const plcrLevels = ${json.plcrLevels};
export const legacyLevel = ${json.legacyLevel};
      `;
    }

    const moduleContent = toJsModule(data);

    return new Response(moduleContent, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
      },
    });

  } catch (err) {
    return new Response(`console.error("Error fetching levels: ${err.message}");`, {
      headers: { "Content-Type": "application/javascript" },
      status: 500
    });
  }
}
