export async function getLevels(request, env) {
  const db = env.DB;

  const comingSoon = await db.prepare("SELECT * FROM coming_soon LIMIT 1").first();
  const indie = await db.prepare("SELECT * FROM indie_levels ORDER BY id DESC").all();
  const plcr = await db.prepare("SELECT * FROM plcr_levels ORDER BY id DESC").all();
  const legacy = await db.prepare("SELECT * FROM legacy_level LIMIT 1").first();

  return {
    comingSoonLevel: comingSoon || null,
    indieLevels: indie.results || [],
    plcrLevels: plcr.results || [],
    legacyLevel: legacy || null
  };
}
