import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
  if (!platform) {
    throw error(500, 'Cloudflare Platform not detected');
  }

  const data = await platform.env.KV.get('leveldata');

  if (!data) {
    throw error(404, 'Data not found in KV');
  }

  return new Response(data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};