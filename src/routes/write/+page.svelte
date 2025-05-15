<script lang="ts">
    import PostSummarize from '$lib/components/fragment/PostSummarize.svelte';

    const { data } = $props();
    const posts = data.posts;
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-2 px-2">
    <h1 class="text-fmd">게시글</h1>
    <PostSummarize {posts} />
</div>
