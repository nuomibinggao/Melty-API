// routes/get-levels-module.js
export async function getLevelsModule(request, env) {
  const comingSoon = await env.DB.prepare("SELECT * FROM coming_soon LIMIT 1").all();
  const indie = await env.DB.prepare("SELECT * FROM indie_levels ORDER BY date DESC").all();
  const plcr = await env.DB.prepare("SELECT * FROM plcr_levels ORDER BY date DESC").all();
  const legacy = await env.DB.prepare("SELECT * FROM legacy_level LIMIT 1").all();

  // Convert results to JS string
  const js = `
export const comingSoonLevel = ${JSON.stringify(comingSoon.results[0] || null)};
export const indieLevels = ${JSON.stringify(indie.results)};
export const plcrLevels = ${JSON.stringify(plcr.results)};
export const legacyLevel = ${JSON.stringify(legacy.results[0] || null)};
`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript"
    }
  });
}
