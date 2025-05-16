<script lang="ts">
    import type { Post, Category } from '$generated/prisma';
    import { Route } from '$lib/config';
    import { formatDate } from '$lib/utils';
    import CategoryList from '$lib/components/fragment/CategoryList.svelte';

    interface Props {
        index: number;
        post: Post;
        categories: Category[];
    }

    const { index, post, categories }: Props = $props();
</script>

<a href={`${Route.Write}/${post.slug}`} aria-label={post.title} class="list-row hover:bg-base-300">
    <div class="text-4xl font-thin tabular-nums opacity-30 select-none">
        {index + 1}
    </div>
    <div>
        <h1 class="text-fmd line-clamp-2">{post.title}</h1>
        <small class="list-col-wrap text-fsm text-base-content/60 line-clamp-2">
            {post.description}
        </small>
        <CategoryList class="mt-1 flex gap-1 flex-wrap" {categories} />
    </div>
    <small class="text-base-content/40 truncate">
        {formatDate(post.createdAt)}
    </small>
</a>
