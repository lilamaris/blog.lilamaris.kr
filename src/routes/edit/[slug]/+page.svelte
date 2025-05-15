<script lang="ts">
    import { markdownToHtml } from '$lib/markdown';
    import { applyAction, enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { articleStore } from '$lib/stores/article';
    import { writable } from 'svelte/store';
    import { BookText, Save } from '@lucide/svelte';
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
        articleStore.resetArticle();
        if (data.article && data.article.id !== $article.id) {
            articleStore.setArticle(data.article);
        }

        const unsub = articleStore.trackingChange();
        return () => unsub();
    });
</script>

{#if $toast}
    <div class="toast toast-top toast-center z-10">
        <div class="alert alert-error">
            <span>{$toast}</span>
        </div>
    </div>
{/if}

<div class="join mb-4 flex min-w-[calc(var(--container-2xl)_*_2)] flex-1">
    <form
        method="POST"
        action="?/saveArticle"
        use:enhance={saveArticle}
        class="join-item bg-base-100 flex flex-1 flex-col gap-2 p-4"
    >
        <div
            class="rounded-bl-box bg-base-100/50 fixed top-16 right-0 z-10 flex justify-end gap-1 p-4 pt-2 shadow-md backdrop-blur-md"
        >
            <button
                aria-busy={$isLoading}
                formaction="?/saveArticle"
                type="submit"
                class="btn btn-success btn-square"
            >
                {#if $isLoading}<span class="loading loading-spinner loading-xs"></span>
                {:else}
                    <Save class="h-4 w-4" />
                {/if}
            </button>
        </div>
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
        <input type="hidden" name="content" bind:value={$content} />
    </form>
    <div class="join-item bg-base-100 flex flex-1 flex-col p-4">
        <div class="prose rounded-field bg-base-200 flex-1 p-4">
            {@html markdownToHtml($content)}
        </div>
    </div>
</div>
