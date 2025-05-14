<script lang="ts">
    import ArticleEditor from '$lib/components/fragment/ArticleEditor.svelte';
    import { articleStore } from '$lib/stores/article';
    import { Save } from '@lucide/svelte';
    import { markdownToHtml } from '$lib/markdown';
    import { writable } from 'svelte/store';
    import { applyAction, enhance } from '$app/forms';
    import { redirect, type SubmitFunction } from '@sveltejs/kit';
    import { onMount } from 'svelte';

    const { categories, content, getContext, initFromLocalStorage, resetContext } = articleStore;

    const isLoading = writable(false);
    const isError = writable(false);

    let { data, form } = $props();

    const saveArticle: SubmitFunction = ({ formElement, formData, action, cancel }) => {
        isLoading.set(true);
        return async ({ result }) => {
            await applyAction(result);
            isLoading.set(false);
        };
    };

    onMount(() => {
        initFromLocalStorage();
    });
</script>

<pre>{JSON.stringify(form, null, 2)}</pre>

<div class="join m-4 flex flex-1">
    <form
        method="POST"
        action="?/saveArticle"
        use:enhance={saveArticle}
        class="join-item bg-base-100 flex w-1/2 flex-col gap-2 p-4"
    >
        <ArticleEditor avaliableCategories={data.categories} />
        <div
            class="rounded-bl-box bg-base-100/50 fixed top-16 right-0 z-10 flex justify-end gap-1 p-4 pt-2 shadow-md backdrop-blur-md"
        >
            <button aria-busy={$isLoading} type="submit" class="btn btn-success btn-square">
                {#if $isLoading}<span class="loading loading-spinner loading-xs"></span>
                {:else}
                    <Save class="h-4 w-4" />
                {/if}
            </button>
        </div>
    </form>
    <div class="join-item bg-base-100 flex flex-1 flex-col p-4">
        <div class="prose rounded-field bg-base-200 flex-1 p-4">
            {@html markdownToHtml($content)}
        </div>
    </div>
</div>
