import { derived, writable } from 'svelte/store';

const STORAGE_KEY = 'article-draft';

export interface Article {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    published: boolean;
    categories: number[];
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
    const id = writable<number>(-1);
    const title = writable('');
    const slug = derived([title], ([title]) => makeSlug(title));
    const description = writable('');
    const content = writable('');
    const published = writable(false);
    const categories = writable<number[]>([]);

    const article = derived(
        [id, title, slug, description, content, published, categories],
        ([id, title, slug, description, content, published, categories]) => ({
            id,
            title,
            slug,
            description,
            content,
            published,
            categories
        })
    );

    const setArticle = (article: Partial<Article>) => {
        id.set(article.id ?? -1);
        title.set(article.title ?? '');
        description.set(article.description ?? '');
        content.set(article.content ?? '');
        published.set(article.published ?? false);
        categories.set(article.categories ?? []);
    };

    return {
        id,
        title,
        slug,
        description,
        content,
        published,
        categories,
        article,
        trackingChange: () => {
            const unsub = article.subscribe((article) => {
                saveToLocalStorage(article);
            });
            return () => unsub();
        },
        setArticle,
        resetArticle: () => setArticle(loadFromLocalStorage() ?? {})
    };
};

export const articleStore = createArticleStore();
