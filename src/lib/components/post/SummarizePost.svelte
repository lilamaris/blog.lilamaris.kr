<script lang="ts">
    import { Route } from '$lib/config';
    import { type Post } from '$lib/types/post';

    import { formatDate } from '$lib/util';
    import CategoryList from './CategoryList.svelte';

    interface Props {
        index: number;
        post: Post;
    }

    const { index, post }: Props = $props();
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
        <h1 class="line-clamp-2 text-lg">{post.title}</h1>
        <small class="list-col-wrap text-base-content/60 line-clamp-2 text-sm">
            {post.description}
        </small>
        <CategoryList class="mt-1 flex flex-wrap gap-1" categories={post.categories} />
    </div>
    <small class="text-base-content/40 hidden truncate sm:block">
        {formatDate(post.publishedAt)}
    </small>
</a>
