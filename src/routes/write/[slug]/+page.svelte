<script lang="ts">
    import { formatDate } from '$lib/utils';
    const { data } = $props();
    const post = data.post;
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-4 px-2">
    <div class="flex flex-col">
        <h1 class="text-flg font-bold">{post.title}</h1>
        <h2 class="text-base-content/80">{post.description}</h2>
        <div class="mt-4 flex gap-3">
            <small class="text-base-content/60">작성: {formatDate(post.createdAt)}</small>
            <small class="text-base-content/60">수정: {formatDate(post.updatedAt)}</small>
        </div>
    </div>
    <div class="flex flex-wrap gap-2">
        {#each post.categories as category}
            <span class="badge shadow">{category.name}</span>
        {/each}
    </div>
    <div class="prose mx-2">{@html data.html}</div>
    <div class="text-base-content/60 my-4 flex justify-start text-xs">
        <span>by {post.author?.name ?? '익명'}</span>
    </div>
</div>
