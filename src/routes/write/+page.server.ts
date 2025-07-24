import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const rawPosts = await fetch('/api/write');
    if (!rawPosts.ok) throw new Error('Could not fetch posts...');
    const posts: Post[] = await rawPosts.json();
    return { posts };
  } catch (e) {
    error(404, (e as Error).message);
  }
};
