<script lang="ts">
    import type { Post, Category } from '$generated/prisma';
    import { Route } from '$lib/utils/context';
    import { formatDate } from '$lib/utils/form';
    import CategoryList from '$lib/components/fragment/CategoryList.svelte';

    interface Props {
        index: number;
        post: Post;
        categories: Category[];
    }

    const { index, post, categories }: Props = $props();
</script>

<a
    href={`${Route.Write}/${post.slug}`}
    aria-label={post.title}
    class="list-row hover:bg-base-300"
    data-sveltekit-preload-data
>
    <div class="text-4xl font-thin tabular-nums opacity-30 select-none">
        {index + 1}
    </div>
    <div>
        <h1 class="text-md line-clamp-2">{post.title}</h1>
        <small class="list-col-wrap text-base-content/60 line-clamp-2 text-sm">
            {post.description}
        </small>
        <CategoryList class="mt-1 flex flex-wrap gap-1" {categories} />
    </div>
    <small class="text-base-content/40 hidden truncate sm:block">
        {formatDate(post.createdAt)}
    </small>
</a>
