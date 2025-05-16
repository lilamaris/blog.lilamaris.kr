<script lang="ts" generics="T">
    import type { Component, ComponentProps, Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    type Item = T extends { id: string | number } ? T : never;

    interface Props extends HTMLAttributes<HTMLElement> {
        parent?: string;
        children?: Snippet;
        itemSnippet: Snippet<[Item, number]>;
        items: Item[];
    }

    const { parent = 'ul', children, items, itemSnippet, ...attributes }: Props = $props();
</script>

<svelte:element this={parent} {...attributes}>
    {@render children?.()}
    {#each items as item, index (item.id)}
        {@render itemSnippet(item, index)}
    {/each}
</svelte:element>
