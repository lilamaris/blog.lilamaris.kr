import type { Post } from '$lib/type';
import { Index } from 'flexsearch';
import { readPosts } from './posts';

let postsIndex: Index;
let posts: Post[];

export const createPostIndex = async () => {
  postsIndex = new Index({ tokenize: 'forward' });

  posts = await readPosts();
  posts.forEach((post, i) => {
    const item = `${post.metadata.title} ${post.metadata.description}`;
    postsIndex.add(i, item);
  });
};

export const searchByKeyword = async (keyword: string) => {
  if (!postsIndex) createPostIndex();
  const match = keyword.replace(/[.**?^${}()|[\]\\]/g, '\\$&');
  const results = postsIndex.search(match);
  return results
    .map((index) => posts[index as number])
    .map(({ metadata, content }) => {
      return {
        metadata: {
          ...metadata,

          title: replaceTextWithMarker(metadata.title, match)
        },
        content: getMatches(content, match)
      };
    });
};

function replaceTextWithMarker(text: string, match: string) {
  const regex = new RegExp(match, 'gi');
  return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}

function getMatches(text: string, searchTerm: string, limit = 1) {
  const regex = new RegExp(searchTerm, 'gi');
  const indexes = [];
  let matches = 0;
  let match;

  while ((match = regex.exec(text)) !== null && matches < limit) {
    indexes.push(match.index);
    matches++;
  }

  return indexes.map((index) => {
    const start = index - 20;
    const end = index + 80;
    const excerpt = text.substring(start, end).trim();
    return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
  });
}
