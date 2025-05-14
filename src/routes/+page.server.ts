import prisma from '$lib/prisma';
import type { PostModel } from '../generated/prisma/models/Post';
import type { CategoryModel } from '../generated/prisma/models/Category';
import type { UserModel } from '../generated/prisma/models/User';

/**
 * 전체 게시글 목록을 조회합니다.
 * @returns 게시글(Post) 배열과 카테고리, 작성자 정보 포함
 */
export async function load(): Promise<{
    articles: (PostModel & { categories: CategoryModel[]; author: UserModel })[];
}> {
    const articles = await prisma.post.findMany({
        include: {
            categories: true,
            author: true
        }
    });
    return {
        articles
    };
}
