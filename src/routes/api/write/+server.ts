import { readPostMetadata } from '$lib/server/posts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const posts = await readPostMetadata();

  return json(posts);
};
