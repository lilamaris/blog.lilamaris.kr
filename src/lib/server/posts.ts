import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostSchema, type Post, type PostMetadata } from '$lib/type';
import { markdownTo } from '$lib/markdown';

const postBase = path.resolve('posts');

export interface PostReadOption {
  format: 'html' | 'markdown' | 'plain';
}

export const readPostFromPath = async (
  postPath: string,
  options: PostReadOption = { format: 'markdown' }
): Promise<Post> => {
  try {
    const raw = matter(await fs.readFile(postPath, 'utf-8'));
    let { content, toc } = await markdownTo(options.format, raw.content);

    const post = PostSchema.safeParse({ metadata: raw.data, content, toc });
    if (!post.success)
      throw new Error(`Failed to parse to post format: ${postPath}\nReason: ${post.error.message}`);
    return post.data;
  } catch (e) {
    console.error((e as Error).message);
    throw new Error('Could not read post... Whoops');
  }
};

export const readPost = async (
  slug: string,
  options: PostReadOption = { format: 'markdown' }
): Promise<Post> => {
  try {
    const postPath = path.join(postBase, slug, `${slug}.md`);
    const post = readPostFromPath(postPath, options);
    return post;
  } catch (e) {
    console.error((e as Error).message);
    throw e as Error;
  }
};

export const readPosts = async (options: PostReadOption = { format: 'markdown' }) => {
  try {
    const posts: Post[] = [];
    for (const dir of await fs.readdir(postBase)) {
      const postPath = path.join(postBase, dir, `${dir}.md`);
      const post = await readPostFromPath(postPath, options);
      posts.push(post);
    }
    return posts;
  } catch (e) {
    throw new Error('Could not read posts');
  }
};

export const readPostMetadata = async (options: PostReadOption = { format: 'markdown' }) => {
  try {
    const metadatas: PostMetadata[] = (await readPosts(options)).map((post) => post.metadata);
    return metadatas;
  } catch (e) {
    throw new Error('Could not read post metadata');
  }
};
