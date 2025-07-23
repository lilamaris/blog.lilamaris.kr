<script lang="ts" generics="T,I extends keyof T">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    interface PropBase extends HTMLAttributes<HTMLElement> {
        parent?: string;
        children?: Snippet;
        itemSnippet: Snippet<[T, number]>;
        items: T[];
        itemIdentifier?: I;
    }

    type WithIdentifier = { itemIdentifier: I } & (T[I] extends string | number ? {} : never);
    type WithoutIdentifier = { itemIdentifier?: undefined };
    type Props = PropBase & (WithIdentifier | WithoutIdentifier);

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
    {#each items as item, index (itemIdentifier ? item[itemIdentifier] : index)}
        {@render itemSnippet(item, index)}
    {/each}
</svelte:element>
