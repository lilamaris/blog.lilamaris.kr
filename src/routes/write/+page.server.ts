import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { readPostMetadata } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
  try {
    const posts = await readPostMetadata();
    return { posts };
  } catch (e) {
    error(404, (e as Error).message);
  }
};
