import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

import { context } from '$lib/config';
import { rehypeCollectHeadings, type TocItem } from './plugins';

export const markdownProcessor = unified()
    .use(remarkParse) // convert markdown to abstract syntax tree
    .use(remarkRehype, { allowDangerousHtml: true }) // convert abstract syntax tree to html
    .use([rehypeSlug, rehypeAutolinkHeadings, rehypeCollectHeadings])
    .use(rehypePrettyCode, {
        keepBackground: false,
        theme: {
            dark: 'github-dark-dimmed',
            light: 'github-light'
        },
        transformers: [
            transformerCopyButton({
                visibility: 'always',
                feedbackDuration: 3_000
            })
        ]
    })
    .use(rehypeStringify, { allowDangerousHtml: true }); // convert html to string

const replaceImageAlias = (content: string) => {
    // Image alias format: {% img src="<source-here>" alt="<alt-text-here>" %}
    const imageAliasRegex = /{% img src="(.*?)" alt="(.*?)" %}/g;
    let imageCount = 0;

    const buildImageTag = (src: string, alt: string) => {
        imageCount++;
        const imageUrl = `${context.assetBaseUrl}${src}`;
        console.log(imageUrl);
        return `<figure class="figure">
                <img src="${imageUrl}" alt="${alt}" loading="lazy" />
                <figcaption>그림 ${imageCount}. ${alt}</figcaption>
            </figure>`;
    };

    return content.replace(imageAliasRegex, (match, src, alt) => {
        return buildImageTag(src, alt);
    });
};

export const markdownToHtml = async (content: string) => {
    const processReplaceImageAlias = replaceImageAlias(content);
    const file = await markdownProcessor.process(processReplaceImageAlias);

    const html = String(file.value);
    const toc = (file.data?.toc as TocItem[]) || [];
    return { html, toc };
};
