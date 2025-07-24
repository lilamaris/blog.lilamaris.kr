import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { readPost } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;
  try {
    const post = await readPost(slug, { format: 'html' });

    return { post };
  } catch (e) {
    error(404, 'Post not exists');
  }
};
