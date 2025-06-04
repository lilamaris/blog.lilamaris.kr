import { error } from '@sveltejs/kit';
import { markdownToHtml } from '$lib/markdown';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getPostBySlug } from '$lib/server/post.server';

/**
 * slug로 단일 게시글을 조회하고, 마크다운을 HTML로 변환합니다.
 * @param params - URL 파라미터(slug)
 * @returns 게시글(Post) + 카테고리, 작성자, 변환된 html
 */
export const load: PageServerLoad = async ({
    params
}): Promise<{
    post: Post;
    html: string;
}> => {
    try {
        const post = await getPostBySlug(params.slug);
        if (!post) throw new Error('포스트를 찾을 수 없습니다.');
        const html = await markdownToHtml(post.content);
        return { post, html };
    } catch (err) {
        console.error(err);
        error(404, '포스트를 찾을 수 없습니다.');
    }
};
