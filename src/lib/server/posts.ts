import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostSchema, type Post, type PostMetadata } from '$lib/type';

const postBase = path.resolve('posts');
export const readPost = async (slug: string) => {
    try {
        const postPath = path.join(postBase, slug, `${slug}.md`);
        const raw = await fs.readFile(postPath, 'utf-8');
        const { data, content } = matter(raw);
        return { data, content };
    } catch (e) {
        throw new Error(`Could not read post ${slug}`);
    }
};

export const readPosts = async () => {
    try {
        const posts: Post[] = [];
        for (const dir of await fs.readdir(postBase)) {
            const postPath = path.join(postBase, dir, `${dir}.md`);
            const raw = await fs.readFile(postPath, 'utf-8');
            const { data, content } = matter(raw);
            const post = PostSchema.safeParse({ ...data, content });
            if (!post.success) continue;
            posts.push(post.data);
        }
        return posts;
    } catch (e) {
        throw new Error('Could not read posts');
    }
};

export const readPostMetadata = async () => {
    try {
        const metadatas: PostMetadata[] = (await readPosts()).map((post) => post.metadata);
        return metadatas;
    } catch (e) {
        throw new Error('Could not read post metadata');
    }
};
