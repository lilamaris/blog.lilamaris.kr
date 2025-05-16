<script lang="ts">
    import PostAbstract from '$lib/components/write/PostAbstract.svelte';
    const { data } = $props();
    const { post, html } = data;
</script>

<div class="max-w-content mx-auto flex flex-col gap-4">
    <PostAbstract {post} />
    <div class="prose">{@html html}</div>
    <div class="text-base-content/60 my-4 flex justify-start text-xs">
        <span>by {post.author?.name ?? '익명'}</span>
    </div>
</div>
