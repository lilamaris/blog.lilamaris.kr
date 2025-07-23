import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { markdownToHtml } from '$lib/markdown';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const slug = params.slug;
    try {
        const rawPost = await fetch(`/api/write/${slug}`);
        if (!rawPost.ok) throw new Error(`Post ${slug} is not exists.`);
        const { data, content } = await rawPost.json();
        const { html, toc } = await markdownToHtml(content);
        return { metadata: data, html, toc };
    } catch (e) {
        error(404, 'Post not exists');
    }
};
