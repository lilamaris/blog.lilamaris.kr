<script lang="ts">
    import { formatDate } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { Post } from '$src/generated/prisma/models';

    interface Props {
        posts: Post[];
    }

    const { posts } = $props();
</script>

<ul class="list">
    {#each posts as post, i}
        <li>
            <a
                class="list-row hover:bg-base-300 transition-colors duration-150"
                href="/write/{post.slug}"
            >
                <div class="text-4xl font-thin tabular-nums opacity-30 select-none">
                    {i + 1}
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <small class="list-col-wrap text-fsm text-base-content/60">
                        {post.description}
                    </small>
                    <div class="mt-1 flex flex-wrap gap-1">
                        {#each post.categories as category}
                            <span class="badge badge-sm shadow">{category.name}</span>
                        {/each}
                    </div>
                </div>
                <small class="text-base-content/40">
                    {formatDate(post.createdAt)}
                </small>
            </a>
        </li>
    {/each}
</ul>
