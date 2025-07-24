import { readPost } from '$lib/server/posts';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const post = await readPost(params.slug);
  return json(post);
};
