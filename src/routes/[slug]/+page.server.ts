import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import { markdownToHtml } from '$lib/markdown';
import type { PageServerLoad } from './$types';
import type { PostModel } from '../../generated/prisma/models/Post';
import type { CategoryModel } from '../../generated/prisma/models/Category';
import type { UserModel } from '../../generated/prisma/models/User';

/**
 * slug로 단일 게시글을 조회하고, 마크다운을 HTML로 변환합니다.
 * @param params - URL 파라미터(slug)
 * @returns 게시글(Post) + 카테고리, 작성자, 변환된 html
 */
export const load: PageServerLoad = async ({
    params
}): Promise<{
    post: (PostModel & { categories: CategoryModel[]; author: UserModel }) | null;
    html: string | null;
}> => {
    const post = await prisma.post.findFirst({
        where: { slug: params.slug },
        include: { categories: true, author: true }
    });
    if (!post) throw error(404, '포스트를 찾을 수 없습니다.');
    const html = markdownToHtml(post.content);
    return { post, html };
};
