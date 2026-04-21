import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
  const filePath = params.path;

  if (!platform) {
    throw error(500, 'Cloudflare Platform not detected');
  }

  const object = await platform.env.CDN.get(filePath);
  console.log('Looking up R2 key:', filePath);

  if (!object) {
    throw error(404, `Not found, requested path: ${filePath}`);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  

  return new Response(object.body, {
    headers
  });
};