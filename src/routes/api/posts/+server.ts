import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types/post';

async function getPosts() {
    let posts: Post[] = [];

    const paths = import.meta.glob('/posts/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');
        console.log(file);
        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>;
            const post = { ...metadata, slug } satisfies Post;
            posts.push(post);
        }
    }

    posts.sort((l, r) => new Date(r.publishedAt).getTime() - new Date(l.publishedAt).getTime());
    return posts;
}

export async function GET() {
    const posts = await getPosts();
    return json(posts);
}
