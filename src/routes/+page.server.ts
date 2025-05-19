import { getPosts } from '$lib/server/post.server';
import type { Post } from '$lib/types/post';
import type { Category } from '$lib/types/category';
import type { User } from '$lib/types/user';

/**
 * 전체 게시글 목록을 조회합니다.
 * @returns 게시글(Post) 배열과 카테고리, 작성자 정보 포함
 */
export async function load(): Promise<{
    recentPosts: (Post & { categories: Category[]; author: User })[];
}> {
    const posts = await getPosts({ limit: 3 });
    return { recentPosts: posts };
}
