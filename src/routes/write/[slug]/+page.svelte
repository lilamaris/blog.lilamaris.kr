<script lang="ts">
    import PostAbstract from '$lib/components/write/PostAbstract.svelte';
    import TableOfContent from '$lib/components/write/TableOfContent.svelte';
    import SEO from '$lib/components/SEO.svelte';

    const { data } = $props();
    const { metadata, html, toc } = data;
</script>

<SEO title={metadata.title} description={metadata.description} />

<div class="max-w-content mx-1 flex flex-col gap-4 md:mx-auto">
    <PostAbstract post={metadata} />
    <article class="prose max-w-content relative">
        <div class="not-prose absolute left-full">
            <div class="fixed">
                <TableOfContent {toc} />
            </div>
        </div>
        {@html html}
    </article>
</div>
