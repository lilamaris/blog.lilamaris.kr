<script lang="ts" generics="T">
    import type { Component, Snippet } from 'svelte';

    interface Props {
        class?: string;
        children?: Snippet;
        itemSnippet: Snippet<[number, T]>;
        items: T extends { id: string | number } ? T[] : never;
    }

    const { children, itemSnippet, items, class: className }: Props = $props();
</script>

{@render children?.()}
<ul class={className}>
    {#each items as item, index (item.id)}
        <li>
            {@render itemSnippet(index, item)}
        </li>
    {/each}
</ul>
