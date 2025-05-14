import { derived, get, writable } from 'svelte/store';

const STORAGE_KEY = 'article-draft';

export interface Article {
    title: string;
    slug: string;
    description: string;
    content: string;
    published: boolean;
    categories: { id: number; name: string }[];
}

const makeSlug = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9가-힣-_]/g, '')
        .replace(/-+/g, '-');
};

const saveToLocalStorage = (data: Article) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = (): Partial<Article> | null => {
    const raw = localStorage.getItem(STORAGE_KEY) ?? '';
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const createArticleStore = () => {
    const title = writable('');
    const slug = derived([title], ([title]) => makeSlug(title));
    const description = writable('');
    const content = writable('');
    const published = writable(false);
    const categories = writable<{ id: number; name: string }[]>([]);

    const article = derived(
        [title, slug, description, content, published, categories],
        ([title, slug, description, content, published, categories]) => ({
            title,
            slug,
            description,
            content,
            published,
            categories
        })
    );

    return {
        title,
        slug,
        description,
        content,
        published,
        categories,
        article,
        trackingChange: () => {
            return () =>
                article.subscribe((article) => {
                    saveToLocalStorage(article);
                });
        },
        setArticle: (article: Partial<Article>) => {
            title.set(article.title ?? '');
            description.set(article.description ?? '');
            content.set(article.content ?? '');
            published.set(article.published ?? false);
            categories.set(article.categories ?? []);
        },
        resetArticle: () => {
            title.set('');
            description.set('');
            content.set('');
            published.set(false);
            categories.set([]);
        }
    };
};

export const articleStore = createArticleStore();
