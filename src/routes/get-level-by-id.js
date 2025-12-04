export async function getLevelById(request, env, type, id) {
  const db = env.DB;

  try {
    let level = null;
    if (type === "indie") {
      level = await db.prepare("SELECT * FROM indie_levels WHERE id = ?").bind(id).first();
      if (level) {
        return {
          type: "indie",
          level: level
        };
      }
    } else if (type === "plcr") {
      level = await db.prepare("SELECT * FROM plcr_levels WHERE id = ?").bind(id).first();
      if (level) {
        return {
          type: "plcr",
          level: level
        };
      }
    }

    // Level not found or invalid type
    return {
      type: null,
      level: null
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}