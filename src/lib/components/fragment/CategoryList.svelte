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
    <li>
        <svelte:element
            this={el}
            href={queryOption ? `${queryOption.prefix}?category=${category.name}` : ''}
            class="badge badge-outline badge-sm text-base-content/40 line-clamp-1 {queryOption ? 'cursor-pointer transition-colors hover:text-accent' : 'cursor-default'}"
        >
            {category.name}
        </svelte:element>
    </li>
{/snippet}

<IterableItem items={categories} {itemSnippet} {...attributes} />
