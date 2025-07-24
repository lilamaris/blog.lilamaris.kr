import type { Post, PostMetadata } from '$lib/type';
import { Index } from 'flexsearch';

let postsIndex: Index;
let posts: Pick<PostMetadata, 'title' | 'description'> & Pick<Post, 'content'>;

const createPostIndex = () => {
  postsIndex = new Index({ tokenize: 'forward' });
};
