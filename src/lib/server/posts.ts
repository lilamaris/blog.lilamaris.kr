import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { type Post } from '$lib/types/post';

export const readPosts = async () => {
    try {
        const posts: Post[] = [];
        const postsPath = path.resolve('posts');
        for (const dir of await fs.readdir(postsPath)) {
            const markdownPath = path.join(postsPath, dir, `${dir}.md`);
            const markdownContent = await fs.readFile(markdownPath, 'utf-8');
            const { data } = matter(markdownContent);
            posts.push(data as Post);
        }
        return posts;
    } catch (e) {
        throw new Error('Could not parse Markdown files');
    }
};
