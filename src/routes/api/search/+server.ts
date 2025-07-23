import type { RequestHandler } from './$types';

import { readPosts } from '$lib/server/posts';

export const GET: RequestHandler = ({ url }) => {
    const keyword = url.searchParams.get('keyword');
    const posts = readPosts();
};
