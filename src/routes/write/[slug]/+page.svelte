<script lang="ts">
    import { formatDate } from '$lib/utils';
    import CategoryList from '$lib/components/layout/CategoryList.svelte';
    import { Route } from '$lib/config';
    const { data } = $props();
    const post = data.post;
</script>

<div class="max-w-content mx-auto">
    <div class="flex flex-col">
        <h1 class="text-flg font-bold">{post.title}</h1>
        <h2 class="text-base-content/80">{post.description}</h2>
        <div class="mt-4 flex gap-3">
            <small class="text-base-content/60">작성: {formatDate(post.createdAt)}</small>
            <small class="text-base-content/60">수정: {formatDate(post.updatedAt)}</small>
        </div>
    </div>
    <CategoryList
        class="mt-4 flex gap-1"
        categories={post.categories}
        queryOption={{ prefix: Route.Write }}
    />
    <div class="prose mx-2">{@html data.html}</div>
    <div class="text-base-content/60 my-4 flex justify-start text-xs">
        <span>by {post.author?.name ?? '익명'}</span>
    </div>
</div>
