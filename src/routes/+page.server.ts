import prisma from '$lib/prisma';
import type { Post, Category, User } from '$generated/prisma';

/**
 * 가장 최근 게시글 3개를 조회합니다.
 * @returns 최근 게시글(Post) 배열 (카테고리, 작성자 포함)
 */
const getRecentPosts = async (): Promise<(Post & { categories: Category[]; author: User })[]> => {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
            categories: true,
            author: true
        }
    });
    return posts;
};

/**
 * 전체 게시글 목록을 조회합니다.
 * @returns 게시글(Post) 배열과 카테고리, 작성자 정보 포함
 */
export async function load(): Promise<{
    recentPosts: (Post & { categories: Category[]; author: User })[];
}> {
    return {
        recentPosts: await getRecentPosts()
    };
}
