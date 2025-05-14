import { derived, get, writable } from 'svelte/store';

const STORAGE_KEY = 'article-draft';

export interface ArticleStoreValues {
    title: string;
    slug: string;
    description: string;
    content: string;
    categories: number[];
    published: boolean;
}

function saveToLocalStorage(data: ArticleStoreValues) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromLocalStorage(): Partial<ArticleStoreValues> | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function makeSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9가-힣-_]/g, '')
        .replace(/-+/g, '-');
}

function createArticleStore() {
    const title = writable('');
    const slug = derived(title, ($title) => makeSlug($title));
    const description = writable('');
    const content = writable('');
    const categories = writable<number[]>([]);
    const published = writable(true);

    function getContext(): ArticleStoreValues {
        return {
            title: get(title),
            slug: get(slug),
            description: get(description),
            content: get(content),
            categories: get(categories),
            published: get(published)
        };
    }

    function setContext(article: Partial<ArticleStoreValues>) {
        title.set(article.title ?? '');
        description.set(article.description ?? '');
        content.set(article.content ?? '');
        categories.set(article.categories ?? []);
        published.set(article.published ?? false);
    }

    function resetContext() {
        title.set('');
        description.set('');
        content.set('');
        categories.set([]);
        published.set(false);
    }

    function initFromLocalStorage() {
        const data = loadFromLocalStorage();
        if (data) {
            setContext(data);
        }

        if (typeof window !== 'undefined') {
            [title, description, content, categories, published].forEach((store) => {
                store.subscribe(() => {
                    saveToLocalStorage(getContext());
                });
            });
        }
    }

    return {
        title,
        slug,
        description,
        content,
        categories,
        published,
        setContext,
        resetContext,
        getContext,
        initFromLocalStorage
    };
}

export const articleStore = createArticleStore();
