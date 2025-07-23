import { z } from 'zod';

export interface Category {
    name: string;
}

export interface PostMetadata {
    title: string;
    description: string;
    slug: string;
    publishedAt: Date;
    categories: Category[];
}

export interface Post {
    metadata: PostMetadata;
    content: string;
}

export const CategorySchema = z.object({
    name: z.string()
});

export const PostMetadataSchema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.coerce.date(),
    categories: z.array(CategorySchema)
});

export const PostSchema = z.object({
    metadata: PostMetadataSchema,
    content: z.string()
});

export type ZT_Category = z.infer<typeof CategorySchema>;
export type ZT_PostMetadata = z.infer<typeof PostMetadataSchema>;
export type ZT_POST = z.infer<typeof PostSchema>;
