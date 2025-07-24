import type { Element, Properties, Root } from 'hast';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

export interface TocItem {
  depth: number;
  text: string;
  id: string;
}

export const rehypeCollectHeadings = (options: { toc: boolean }) => {
  return (tree: Root, file: VFile) => {
    const toc: TocItem[] = [];

    const visitor = (node: Element) => {
      if (!node.tagName) return;

      const headingRegex = /^h([1-6])$/;
      const match = node.tagName.match(headingRegex);
      if (!match) return;

      const depth = parseInt(match[1], 10);
      const props: Properties = node.properties || {};
      const id = typeof props.id === 'string' ? props.id : '';

      let text = '';
      visit(node, 'text', (textNode) => {
        text += textNode.value;
      });

      toc.push({ depth, text, id });
    };

    visit(tree, 'element', visitor);

    file.data = file.data || {};
    file.data.toc = toc;
  };
};

export const rehypePlaneText = (options: { seperator: string } = { seperator: '' }) => {
  return (tree: Root, file: VFile) => {
    const parts: string[] = [];
    const visitor = (node: Element) => {
      parts.push(node.value);
    };
    visit(tree, 'text', visitor);
    file.data = file.data || {};
    file.data.planeText = parts.join(options.seperator);
  };
};
