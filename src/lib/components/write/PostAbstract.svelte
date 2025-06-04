<script lang="ts">
    import { formatDate } from '$lib/utils/form';
    import CategoryList from '$lib/components/fragment/CategoryList.svelte';
    import { Route } from '$lib/utils/context';
    import type { Post } from '$lib/types/post';

    interface Props {
        post: Post;
    }

    const { post }: Props = $props();
</script>

<section class="flex flex-col gap-1">
    <h1 class="text-2xl font-bold">{post.title}</h1>
    <p class="text-base-content/80 text-sm">{post.description}</p>
    <div class="flex gap-3">
        <small class="text-base-content/40">작성: {formatDate(post.createdAt)}</small>
        <small class="text-base-content/40">수정: {formatDate(post.updatedAt)}</small>
    </div>
    <CategoryList
        class="mt-4 flex gap-1"
        categories={post.categories}
        queryOption={{ prefix: Route.Write }}
    />
</section>
