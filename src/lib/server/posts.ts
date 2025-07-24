import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PostSchema, type Post, type PostMetadata } from '$lib/type';
import { markdownTo } from '$lib/markdown';

const postBase = path.resolve('posts');

export interface PostReadOption {
  format: 'html' | 'markdown' | 'plain';
  draft: boolean;
}

const defaultReadOptions: PostReadOption = { format: 'markdown', draft: false };

export const readRawPost = async (postPath: string): Promise<string> => {
  try {
    const raw = await fs.readFile(postPath, 'utf-8');
    return raw;
  } catch (e) {
    console.error((e as Error).message);
    throw new Error('Could not read markdown file');
  }
};

export const readPost = async (
  slug: string,
  options?: Partial<PostReadOption>
): Promise<Post | null> => {
  const opts = { ...defaultReadOptions, ...(options ?? {}) };

  const postPath = path.join(postBase, slug, `${slug}.md`);
  try {
    const raw = await readRawPost(postPath);
    const { data: frontmatter, content } = matter(raw);
    const parsed = await markdownTo(opts.format, content);
    const validatedPost = PostSchema.safeParse({
      metadata: frontmatter,
      content: parsed.content,
      toc: parsed.toc
    });
    if (!validatedPost.success) return null;
    const post = validatedPost.data;

    return opts.draft !== Boolean(post.metadata.publishedAt) ? post : null;
  } catch (e) {
    console.error((e as Error).message);
    throw new Error('Could not read post... Wuuut....');
  }
};

export const readPosts = async (options?: Partial<PostReadOption>) => {
  try {
    const posts: Post[] = [];
    for (const dir of await fs.readdir(postBase)) {
      const post = await readPost(dir, options);
      post && posts.push(post);
    }
    return posts;
  } catch (e) {
    throw new Error('Could not read posts');
  }
};

export const readPostMetadata = async (options?: Partial<PostReadOption>) => {
  try {
    const metadatas: PostMetadata[] = (await readPosts(options)).map((post) => post.metadata);
    return metadatas;
  } catch (e) {
    throw new Error('Could not read post metadata');
  }
};
