import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageServerLoad = async ({ fetch }) => {
    const rawPosts = await fetch('/api/write');
    if (!rawPosts.ok) error(404, 'Something goes wrong');
    const posts: Post[] = await rawPosts.json();

    return { posts };
};
