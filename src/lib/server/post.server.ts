import type { Post } from '../types/post';
import { getBaseUrl } from './util.server';

export interface PostRetrieveOptions {
    page?: number;
    limit?: number;
    search?: string;
}

const API_URL = `${getBaseUrl()}/posts`;

/**
 * 모든 포스트 목록을 조회합니다.
 */
export const getPosts = async (options: PostRetrieveOptions = {}): Promise<Post[]> => {
    try {
        console.log('Post service API URL: ', API_URL);
        const queryParams = new URLSearchParams();
        if (options.page) queryParams.set('page', options.page.toString());
        if (options.limit) queryParams.set('limit', options.limit.toString());
        if (options.search) queryParams.set('search', options.search);

        const res = await fetch(`${API_URL}?${queryParams.toString()}`);
        if (!res.ok) throw new Error('포스트 목록 조회 실패');
        const data = await res.json();
        return data as Post[];
    } catch (err) {
        console.error(err);
        return [];
    }
};

/**
 * 특정 ID의 포스트를 조회합니다.
 * @param slug 포스트 Slug
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    try {
        const res = await fetch(`${API_URL}/${slug}`);
        if (!res.ok) throw new Error('포스트 조회 실패');
        const data = await res.json();
        return data as Post;
    } catch (err) {
        console.error(err);
        return null;
    }
};
