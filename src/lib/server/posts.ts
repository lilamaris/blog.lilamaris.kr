import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostSchema, type Post, type PostMetadata } from '$lib/type';
import { markdownToHtml } from '$lib/markdown';

const postBase = path.resolve('posts');

export interface PostReadOption {
  format: 'html' | 'markdown' | 'plain';
}

export const readPostFromPath = async (
  postPath: string,
  options: PostReadOption
): Promise<Post> => {
  try {
    const raw = matter(await fs.readFile(postPath, 'utf-8'));
    let content = raw.content;
    if (options.format == 'html') content = await markdownToHtml(content);
    const post = PostSchema.safeParse({ metadata: data, content: markdownContent.html });
    if (!post.success)
      throw new Error(`Failed to parse to post format: ${postPath}\nReason: ${post.error.message}`);
    return post.data;
  } catch (e) {
    console.error((e as Error).message);
    throw new Error('Could not read post... Whoops');
  }
};

export const readPost = async (slug: string): Promise<Post> => {
  try {
    const postPath = path.join(postBase, slug, `${slug}.md`);
    const post = readPostFromPath(postPath);
    return post;
  } catch (e) {
    console.error((e as Error).message);
    throw e as Error;
  }
};

export const readPosts = async () => {
  try {
    const posts: Post[] = [];
    for (const dir of await fs.readdir(postBase)) {
      const postPath = path.join(postBase, dir, `${dir}.md`);
      const post = await readPostFromPath(postPath);
      posts.push(post);
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
