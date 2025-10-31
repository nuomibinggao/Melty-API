// routes/get-levels.js

export async function getLevels(request, env) {
  try {
    // Fetch coming soon level
    const comingSoon = await env.DB.prepare("SELECT * FROM coming_soon LIMIT 1").all();

    // Fetch indie levels
    const indie = await env.DB.prepare("SELECT * FROM indie_levels ORDER BY date DESC").all();

    // Fetch PLCR levels
    const plcr = await env.DB.prepare("SELECT * FROM plcr_levels ORDER BY date DESC").all();

    // Fetch legacy level
    const legacy = await env.DB.prepare("SELECT * FROM legacy_level LIMIT 1").all();

    // Format into the same structure as adofai-levels.js
    const data = {
      comingSoonLevel: comingSoon.results[0] || null,
      indieLevels: indie.results,
      plcrLevels: plcr.results,
      legacyLevel: legacy.results[0] || null
    };

    // Return JSON
    return new Response(JSON.stringify(data, null, 2), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
