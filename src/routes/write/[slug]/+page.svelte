<script lang="ts">
    import PostAbstract from '$lib/components/write/PostAbstract.svelte';
    import SEO from '$lib/components/SEO.svelte';

    const { data } = $props();
    const { post, html, toc } = data;
</script>

<SEO title={post.title} description={post.description} />

<div class="max-w-content mx-1 flex flex-col gap-4 md:mx-auto">
    <PostAbstract {post} />
    <article class="prose max-w-content relative">
        <div class="absolute left-full">
            <ul class="menu fixed w-max">
                {#each toc as item}
                    <li>
                        <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                {/each}
            </ul>
        </div>
        {@html html}
    </article>
    <div class="text-base-content/60 my-4 flex justify-start text-xs">
        <span>by {post.author?.name ?? '익명'}</span>
    </div>
</div>
