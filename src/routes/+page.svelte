<script lang="ts">
    import type { Post } from '$lib/types/post';
    import type { Category } from '$lib/types/category';
    import { ArrowUpRight } from '@lucide/svelte';
    import { Route } from '$lib/utils/context';

    import AvatarIntroduce from '$lib/components/home/AvatarIntroduce.svelte';
    import SummarizePost from '$lib/components/fragment/SummarizePost.svelte';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';
    import SEO from '$lib/components/SEO.svelte';

    const { data } = $props();
    const { recentPosts } = data;
</script>

{#snippet itemSnippet(post: Post & { categories: Category[] }, index: number)}
    <SummarizePost {index} {post} categories={post.categories} />
{/snippet}

<SEO title="홈" description="홈" />

<div class="max-w-content mx-1 md:mx-auto">
    <AvatarIntroduce />
    <div class="divider text-base-content/60 text-sm">최근 게시글</div>
    <IterableItem parent="ul" class="list" items={recentPosts} {itemSnippet}>
        <a
            href={Route.Write}
            class="hover:text-accent text-base-content/40 mb-2 ml-auto flex w-fit items-center gap-1 transition-colors"
            data-sveltekit-preload-data
        >
            <small>더 보기</small>
            <ArrowUpRight class="h-4 w-4" />
        </a>
    </IterableItem>
</div>
