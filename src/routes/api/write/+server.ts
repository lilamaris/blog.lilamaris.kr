import { readPosts } from '$lib/server/posts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const posts = await readPosts();
  return json(posts);
};
