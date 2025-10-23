// routes/getLevels.js
export async function getLevels(request, env) {
  try {
    // Query all levels from D1
    const res = await env.DB.prepare(`
      SELECT * FROM levels
      ORDER BY date DESC
    `).all();

    const rows = res.results;

    // Separate by category
    const comingSoonLevel = rows.find(r => r.category === 'coming-soon') || null;
    const indieLevels = rows.filter(r => r.category === 'indie');
    const plcrLevels = rows.filter(r => r.category === 'plcr');
    const legacyLevel = rows.find(r => r.category === 'legacy') || null;
    const levelsData = [...indieLevels, ...plcrLevels];

    return new Response(JSON.stringify({
      comingSoonLevel,
      indieLevels,
      plcrLevels,
      legacyLevel,
      levelsData
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
