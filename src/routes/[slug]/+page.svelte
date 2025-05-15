<script lang="ts">
    import { formatDate } from '$lib/utils';
    const { data } = $props();
    const post = data.post;
</script>

<div class="mx-auto mt-24 max-w-2xl px-2">
    <div class="mb-4 flex flex-col">
        <h1 class="text-flg font-bold">{post.title}</h1>
        <h2 class="text-base-content/80">{post.description}</h2>
        <small class="text-base-content/60">{formatDate(post.createdAt)}</small>
    </div>
    <div class="mb-4 flex flex-wrap gap-2">
        {#each post.categories as category}
            <span class="badge badge-primary badge-outline">{category.name}</span>
        {/each}
    </div>
    <div class="prose">{@html data.html}</div>
    <div class="text-base-content/60 my-4 flex justify-start text-xs">
        <span>by {post.author?.name ?? '익명'}</span>
    </div>
</div>
