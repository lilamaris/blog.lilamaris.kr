import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { readPostMetadata } from '$lib/server/posts';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const posts = await readPostMetadata();

    return { posts };
  } catch (e) {
    error(404, 'Post not exists');
  }
};
