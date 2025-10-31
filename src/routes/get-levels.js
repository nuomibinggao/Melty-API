// routes/get-levels.js
export async function getLevels(request, env) {
  const comingSoon = await env.DB.prepare("SELECT * FROM coming_soon LIMIT 1").all();
  const indie = await env.DB.prepare("SELECT * FROM indie_levels ORDER BY date DESC").all();
  const plcr = await env.DB.prepare("SELECT * FROM plcr_levels ORDER BY date DESC").all();
  const legacy = await env.DB.prepare("SELECT * FROM legacy_level LIMIT 1").all();

  // Convert results to JS string
  function escapeUnicode(str) {
    return str.replace(/[\u007F-\uFFFF]/g, function(ch) {
      return '\\u' + ('0000' + ch.charCodeAt(0).toString(16)).slice(-4);
    });
  }

  // Example
  const js = `
  export const comingSoonLevel = ${escapeUnicode(JSON.stringify(comingSoon.results[0] || null))};
  export const indieLevels = ${escapeUnicode(JSON.stringify(indie.results))};
  export const plcrLevels = ${escapeUnicode(JSON.stringify(plcr.results))};
  export const legacyLevel = ${escapeUnicode(JSON.stringify(legacy.results[0] || null))};
  `;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript"
    }
  });
}
