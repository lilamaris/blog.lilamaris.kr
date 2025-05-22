<script lang="ts">
    import type { Post } from '$lib/types/post';
    import type { Category } from '$lib/types/category';
    import { ArrowUpRight } from '@lucide/svelte';
    import { Route } from '$lib/utils/context';

    import AvatarIntroduce from '$lib/components/home/AvatarIntroduce.svelte';
    import SummarizePost from '$lib/components/fragment/SummarizePost.svelte';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';

    const { data } = $props();
    const { recentPosts } = data;
</script>

{#snippet itemSnippet(post: Post & { categories: Category[] }, index: number)}
    <SummarizePost {index} {post} categories={post.categories} />
{/snippet}

<div class="max-w-content mx-1 md:mx-auto">
    <AvatarIntroduce />
    <div class="divider text-fsm text-base-content/60">최근 게시글</div>
    <IterableItem parent="ul" class="list" items={recentPosts} {itemSnippet}>
        <a
            href={Route.Write}
            class="hover:text-accent text-base-content/40 mb-2 flex flex-row-reverse gap-1 transition-colors"
            data-sveltekit-preload-data
        >
            <ArrowUpRight class="h-4 w-4" />
            <small>더 보기</small>
        </a>
    </IterableItem>
</div>
