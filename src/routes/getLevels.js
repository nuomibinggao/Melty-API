export async function getLevels(request, env) {
  try {
    // Fetch all levels from the database
    const { results } = await env.DB.prepare("SELECT * FROM levels").all();

    // Separate by category
    const comingSoon = results.find(l => l.category === "coming-soon") || null;
    const indieLevels = results.filter(l => l.category === "indie");
    const plcrLevels = results.filter(l => l.category === "plcr");
    const legacyLevel = results.find(l => l.category === "legacy") || null;

    // Generate JS content as a string
    const jsContent = `
/* Auto-generated levels.js from D1 database */

export const comingSoonLevel = ${JSON.stringify(comingSoon, null, 2)};
export const indieLevels = ${JSON.stringify(indieLevels, null, 2)};
export const plcrLevels = ${JSON.stringify(plcrLevels, null, 2)};
export const legacyLevel = ${JSON.stringify(legacyLevel, null, 2)};
export const levelsData = [...indieLevels, ...plcrLevels];
`;

    return new Response(jsContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
