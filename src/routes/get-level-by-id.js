export async function getLevelById(request, env, id) {
  const db = env.DB;

  try {
    // Try to find the level in indie_levels table
    let level = await db.prepare("SELECT * FROM indie_levels WHERE id = ?").bind(id).first();
    if (level) {
      return {
        type: "indie",
        level: level
      };
    }

    // Try to find the level in plcr_levels table
    level = await db.prepare("SELECT * FROM plcr_levels WHERE id = ?").bind(id).first();
    if (level) {
      return {
        type: "plcr",
        level: level
      };
    }

    // Level not found in any table
    return {
      type: null,
      level: null
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}