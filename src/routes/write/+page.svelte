<script lang="ts">
  import IterableItem from '$lib/components/IterableItem.svelte';
  import SummarizePost from '$lib/components/post/SummarizePost.svelte';

  import { type Post } from '$lib/types/post.js';

  let { data } = $props();
  const { posts } = data;
</script>

{#snippet itemSnippet(post: Post, index: number)}
  <SummarizePost {index} {post} />
{/snippet}
<div class="max-w-content mx-1 md:mx-auto">
  <div class="divider text-base-content/60 text-sm">게시글</div>
  <IterableItem parent="ul" class="list" items={posts} {itemSnippet} itemIdentifier="slug"
  ></IterableItem>
</div>
