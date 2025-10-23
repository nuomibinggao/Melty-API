export async function getLevels(request, env) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category"); // optional filter

    let query = "SELECT * FROM levels";
    const params = [];

    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
