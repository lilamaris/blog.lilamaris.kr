import prisma from '$lib/prisma';
import type { Post, Category, User } from '$generated/prisma';
/**
 * 전체 게시글 목록을 조회합니다.
 * @returns 게시글(Post) 배열과 카테고리, 작성자 정보 포함
 */
export async function load(): Promise<{
    posts: (Post & { categories: Category[]; author: User })[];
    categories: (Category & { _count: { posts: number } })[];
}> {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });

    const posts = await prisma.post.findMany({
        include: {
            categories: true,
            author: true
        }
    });
    return { posts, categories };
}
