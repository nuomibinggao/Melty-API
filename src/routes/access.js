export async function verifyCode(request, env) {
  const { code } = await request.json();

  const record = await env.DB.prepare("SELECT * FROM codes WHERE code = ? AND used = 0")
    .bind(code)
    .first();

  if (!record) return new Response(JSON.stringify({ authorized: false }), { status: 401, headers: { "Content-Type": "application/json" } });

  // Optionally mark code as used
  await env.DB.prepare("UPDATE codes SET used = 1 WHERE code = ?").bind(code).run();

  return new Response(JSON.stringify({ authorized: true }), { headers: { "Content-Type": "application/json" } });
}
