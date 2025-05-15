<script lang="ts">
    import { ArrowUpRight } from '@lucide/svelte';
    import type { Category, Post } from '$src/generated/prisma';
    import ListWithHeader from '../../fragment/ListWithHeader.svelte';
    import { Route } from '$src/lib/config';
    import SummarizePost from '../../fragment/SummarizePost.svelte';

    interface Props {
        recentPosts: (Post & { categories?: Category[] })[];
    }

    const { recentPosts }: Props = $props();
</script>

{#snippet itemSnippet(index: number, post: Post & { categories?: Category[] })}
    <SummarizePost {index} {post} categories={post.categories} />
{/snippet}

<ListWithHeader class="list" items={recentPosts} {itemSnippet}>
    <a
        href={Route.Write}
        class="hover:text-accent text-base-content/40 mb-2 flex flex-row-reverse gap-1 transition-colors"
    >
        <ArrowUpRight class="h-4 w-4" />
        <small>더 보기</small>
    </a>
</ListWithHeader>
