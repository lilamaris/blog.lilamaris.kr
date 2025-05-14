<script lang="ts">
    import { markdownToHtml } from '$lib/markdown';
    import { page } from '$app/state';
    import { applyAction, enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { articleStore } from '$lib/stores/article';
    import { writable } from 'svelte/store';
    import { BookText } from '@lucide/svelte';
    import type { SubmitFunction } from '@sveltejs/kit';
    import CodeEditor from '$lib/components/fragment/CodeEditor.svelte';
    import { goto } from '$app/navigation';

    const { article, title, slug, description, content, published, categories } = articleStore;

    const { data } = $props();

    const isLoading = writable(<boolean>false);
    const toast = writable<string | null>(null);

    /**
     * 게시글 저장 submit 핸들러 (formaction progressive enhancement)
     */
    const saveArticle: SubmitFunction = () => {
        isLoading.set(true);
        return async ({ result, update }) => {
            isLoading.set(false);

            if (result.type === 'redirect') {
                articleStore.resetArticle();
                goto(result.location);
            } else if (result.type === 'failure') {
                const message = Object.entries(result?.data?.errors ?? {})
                    .map(([key, value]) => {
                        if (value === 'required') {
                            return `${key} 필수 입력 항목입니다.`;
                        } else if (value === 'duplicated') {
                            return `${key} 이미 존재하는 항목입니다.`;
                        }
                        return `${key} 입력값을 확인해주세요.`;
                    })
                    .join('\n');
                toast.set(message);
            }
            await applyAction(result);
        };
    };

    onMount(() => {
        if (data.article) {
            articleStore.setArticle(data.article);
        } else {
            articleStore.resetArticle();
        }

        const unsub = articleStore.trackingChange();
        return () => unsub();
    });
</script>

<div class="join m-4 flex flex-1">
    <form method="POST" class="join-item bg-base-100 flex flex-1 flex-col p-4">
        <div class="flex gap-2">
            <label class="input flex-1">
                <BookText class="h-4 w-4" />
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    bind:value={$title}
                />
            </label>
            <label class="input flex-1">
                <BookText class="h-4 w-4" />
                <input
                    type="text"
                    name="slug"
                    placeholder="슬러그는 이렇게 표시됩니다."
                    bind:value={$slug}
                    readonly
                />
            </label>
        </div>
        <div class="flex gap-2">
            <label class="label select-none">
                <input
                    type="checkbox"
                    name="published"
                    class="checkbox checkbox-sm"
                    bind:checked={$published}
                />
                <span> 공개 </span>
            </label>
            <label class="input flex-1">
                <BookText class="h-4 w-4" />
                <input
                    type="text"
                    name="description"
                    class="grow"
                    placeholder="설명을 입력해주세요."
                    bind:value={$description}
                />
            </label>
        </div>
        <fieldset
            class="fieldset bg-base-100 border-base-300 rounded-box flex flex-wrap border p-4"
        >
            <legend class="fieldset-legend">카테고리</legend>
            {#each data.categories as category}
                <label class="label select-none">
                    <input
                        type="checkbox"
                        name="categories"
                        class="checkbox checkbox-sm"
                        value={category.id}
                        bind:group={$categories}
                    />
                    <span>{category.name}</span>
                </label>
            {/each}
        </fieldset>
        <CodeEditor bind:value={$content} />
    </form>
    <div class="join-item bg-base-100 flex flex-1 flex-col p-4">
        <div class="prose rounded-field bg-base-200 flex-1 p-4">
            {@html markdownToHtml($content)}
        </div>
    </div>
</div>
