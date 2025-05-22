<script lang="ts">
    import { derived, writable } from 'svelte/store';
    import { page } from '$app/state';
    import type { Category, Post } from '$generated/prisma';

    import SummarizePost from '$lib/components/fragment/SummarizePost.svelte';
    import { onMount } from 'svelte';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';
    import SEO from '$lib/components/SEO.svelte';
    
    const { data } = $props();
    const { categories, posts } = data;

    const selectedCategory = writable<Category | null>(null);

    onMount(() => {
        const categoryUrlQuery = page.url.searchParams.get('category');
        const category = categories.find((c) => c.name === categoryUrlQuery);
        if (!category) return;
        selectedCategory.set(category);
    });

    const filteredPosts = derived([selectedCategory], ([$selectedCategory]) => {
        if (!$selectedCategory) {
            return posts;
        }

        const selId = $selectedCategory.id;
        return posts.filter((post) => post.categories.values().some((c) => c.id === selId));
    });
</script>

{#snippet postItemSnippet(post: Post & { categories: Category[] }, index: number)}
    <li>
        <SummarizePost {index} {post} categories={post.categories} />
    </li>
{/snippet}

{#snippet categoryItemSnippet(category: (typeof categories)[number])}
    <div class="tooltip tooltip-bottom" data-tip={`${category._count?.posts ?? 0}개의 글`}>
        <input
            class="btn btn-sm mr-1"
            type="radio"
            bind:group={$selectedCategory}
            value={category}
            aria-label={category.name}
        />
    </div>
{/snippet}

<SEO title="게시글" description="게시글 목록" />

<div class="max-w-content mx-1 md:mx-auto">
    <div class="divider text-fsm text-base-content/60">게시글</div>
    <IterableItem
        parent="form"
        class=" filter"
        items={categories}
        itemSnippet={categoryItemSnippet}
    >
        <input class="btn btn-square btn-sm" type="reset" value="×" />
    </IterableItem>

    <IterableItem
        parent="ul"
        class="list mt-4"
        items={$filteredPosts}
        itemSnippet={postItemSnippet}
    />
</div>
