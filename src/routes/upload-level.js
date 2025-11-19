// routes/upload-level.js
export async function uploadLevel(request, env) {
  const { DB } = env;

  try {
    const body = await request.json();
    const { type, level } = body;

    if (!type || !level) {
      return new Response(JSON.stringify({ error: "Missing type or level data" }), { status: 400 });
    }

    let sql = "";
    let values = [];

    switch (type) {
      case "coming_soon":
        sql = `INSERT INTO coming_soon (title, icon, date, duration, description)
               VALUES (?, ?, ?, ?, ?)`;
        values = [level.title, level.icon, level.date, level.duration, level.description];
        break;

      case "indie":
        sql = `INSERT INTO indie_levels (id, title, icon, secondary_icon, date, duration, bilibili_bvid, description, tuf_link, soundcloud_link, variation_of, variation_name)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
          level.id,
          level.title,
          level.icon,
          level.secondary_icon || "",
          level.date,
          level.duration,
          level.bilibili_bvid,
          level.description,
          level.tuf_link,
          level.soundcloud_link || "",
          level.variation_of || null,
          level.variation_name || "",
        ];
        break;

      case "plcr":
        sql = `INSERT INTO plcr_levels (id, title, icon, secondary_icon, date, duration, description, tuf_link, youtube_link, soundcloud_link, variation_of, variation_name)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
          level.id,
          level.title,
          level.icon,
          level.secondary_icon || "",
          level.date,
          level.duration,
          level.description,
          level.tuf_link,
          level.youtube_link || "",
          level.soundcloud_link || "",
          level.variation_of || null,
          level.variation_name || "",
        ];
        break;

      case "legacy":
        sql = `INSERT INTO legacy_level (title, icon, date, meta, link)
               VALUES (?, ?, ?, ?, ?)`;
        values = [level.title, level.icon, level.date, level.meta, level.link];
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid level type" }), { status: 400 });
    }

    await DB.prepare(sql).bind(...values).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
