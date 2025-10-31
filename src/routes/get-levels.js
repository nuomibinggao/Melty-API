export async function getLevels(request, env) {
  // same logic as onRequestGet
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

  return data;
}

export async function onRequestGet(context) {
  const data = await getLevels(context.request, context.env);
  const moduleContent = `
export const comingSoonLevel = ${JSON.stringify(data.comingSoonLevel)};
export const indieLevels = ${JSON.stringify(data.indieLevels)};
export const plcrLevels = ${JSON.stringify(data.plcrLevels)};
export const legacyLevel = ${JSON.stringify(data.legacyLevel)};
  `;

  return new Response(moduleContent, {
    headers: { "Content-Type": "application/javascript" },
  });
}
