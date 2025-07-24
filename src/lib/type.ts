import { z } from 'zod';

export interface PostMetadata {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date | null;
  categories: string[];
}

export interface Post {
  metadata: PostMetadata;
  content: string;
  toc: TocItem[];
}

export interface TocItem {
  depth: number;
  text: string;
  id: string;
}

export const PostMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  publishedAt: z.coerce.date().nullable(),
  categories: z.array(z.string())
});

export const TocItemSchema = z.object({
  depth: z.number(),
  text: z.string(),
  id: z.string()
});

export const PostSchema = z.object({
  metadata: PostMetadataSchema,
  content: z.string(),
  toc: z.array(TocItemSchema)
});

export type ZT_PostMetadata = z.infer<typeof PostMetadataSchema>;
export type ZT_Post = z.infer<typeof PostSchema>;
export type ZT_TocItem = z.infer<typeof TocItemSchema>;
