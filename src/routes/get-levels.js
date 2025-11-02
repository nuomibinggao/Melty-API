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
