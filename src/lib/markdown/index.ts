import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const markdownProcessor = unified()
    .use(remarkParse) // convert markdown to abstract syntax tree
    .use(remarkRehype) // convert abstract syntax tree to html
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify); // convert html to string

export const markdownToHtml = (markdown: string) => {
    const result = markdownProcessor.processSync(markdown);
    return result.toString();
};
