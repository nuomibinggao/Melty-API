export async function uploadLevel(request, env) {
  const level = await request.json();

  await env.DB.prepare(`
    INSERT INTO levels
      (title, icon, secondary_icon, date, duration, description, bilibili_bvid, tuf_link, soundcloud_link, youtube_link, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    level.title || null,
    level.icon || null,
    level.secondary_icon || null,
    level.date || null,
    level.duration || null,
    level.description || null,
    level.bilibili_bvid || null,
    level.tuf_link || null,
    level.soundcloud_link || null,
    level.youtube_link || null,
    level.category || null
  )
  .run();

  return new Response(JSON.stringify({ status: "ok" }), {
    status: 201,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}
