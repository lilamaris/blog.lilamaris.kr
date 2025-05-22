import type { Category } from '$lib/types/category';
import { context } from '$lib/utils/context';

export interface CategoryRetrieveOptions {
    search?: string;
}

const API_URL = `${context.apiBaseUrl}/category`;

/**
 * 모든 카테고리 목록을 조회합니다.
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('카테고리 목록 조회 실패');
        const data = await res.json();
        return data as Category[];
    } catch (err) {
        console.error(err);
        return [];
    }
};

/**
 * 특정 ID의 카테고리를 조회합니다.
 * @param id 카테고리 ID
 */
export const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('카테고리 조회 실패');
        const data = await res.json();
        return data as Category;
    } catch (err) {
        console.error(err);
        return null;
    }
};
