import type { Category } from './category';
import type { User } from './user';

export interface Post {
    id: number;
    title: string;
    description: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    authorId: number;
    author: User;
    categories: Category[];
}
