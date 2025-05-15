<script lang="ts">
    import type { Post, Category } from '$src/generated/prisma/client';
    import { Route } from '$src/lib/config';
    import { formatDate } from '$src/lib/utils';

    interface Props {
        index: number;
        post: Post;
        categories?: Category[];
    }

    const { index, post, categories }: Props = $props();
</script>

<a
    href={`${Route.Write}/${post.slug}`}
    aria-label={post.title}
    class="list-row hover:bg-base-300 flex"
>
    <div class="text-4xl font-thin tabular-nums opacity-30 select-none">
        {index + 1}
    </div>
    <div>
        <h1 class="text-fmd">{post.title}</h1>
        <small class="list-col-wrap text-fsm text-base-content/60">
            {post.description}
        </small>
        {#if categories}
            <div class="mt-1 flex flex-wrap gap-1">
                {#each categories as category}
                    <span class="badge badge-sm shadow">{category.name}</span>
                {/each}
            </div>
        {/if}
    </div>
    <small class="text-base-content/40">
        {formatDate(post.createdAt)}
    </small>
</a>
