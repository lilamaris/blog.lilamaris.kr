<script lang="ts">
    import type { Category } from '$generated/prisma';
    import type { HTMLAttributes } from 'svelte/elements';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';

    interface QueryOption {
        prefix: string;
    }

    interface Props extends HTMLAttributes<HTMLElement> {
        categories: Category[];
        queryOption?: QueryOption;
    }

    const { categories, queryOption, ...attributes }: Props = $props();
</script>

{#snippet itemSnippet(category: Category)}
    {@const el = queryOption ? 'a' : 'span'}
    <svelte:element
        this={el}
        href={queryOption ? `${queryOption.prefix}?category=${category.name}` : ''}
        class="badge badge-outline badge-sm text-base-content/40 line-clamp-1"
    >
        {category.name}
    </svelte:element>
{/snippet}

<IterableItem items={categories} {itemSnippet} {...attributes} />
