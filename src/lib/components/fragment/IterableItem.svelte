<script lang="ts" generics="T,I extends keyof T">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    type Item = T[I] extends string | number ? T : never;

    interface Props extends HTMLAttributes<HTMLElement> {
        parent?: string;
        children?: Snippet;
        itemSnippet: Snippet<[Item, number]>;
        items: Item[];
        itemIdentifier: I;
    }

    const {
        parent = 'ul',
        children,
        items,
        itemSnippet,
        itemIdentifier,
        ...attributes
    }: Props = $props();
</script>

<svelte:element this={parent} {...attributes}>
    {@render children?.()}
    {#each items as item, index (item[itemIdentifier] ?? index)}
        {@render itemSnippet(item, index)}
    {/each}
</svelte:element>
