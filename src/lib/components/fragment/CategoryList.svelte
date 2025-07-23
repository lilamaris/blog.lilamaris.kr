<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';

    interface QueryOption {
        prefix: string;
    }

    interface Props extends HTMLAttributes<HTMLElement> {
        categories: string[];
        queryOption?: QueryOption;
    }

    const { categories, queryOption, ...attributes }: Props = $props();
</script>

{#snippet itemSnippet(category: string)}
    {@const el = queryOption ? 'a' : 'span'}
    <li>
        <svelte:element
            this={el}
            href={queryOption ? `${queryOption.prefix}?category=${category}` : ''}
            class="badge badge-outline badge-sm text-base-content/40 line-clamp-1 {queryOption
                ? 'hover:text-accent cursor-pointer transition-colors'
                : 'cursor-default'}"
        >
            {category}
        </svelte:element>
    </li>
{/snippet}

<IterableItem items={categories} {itemSnippet} {...attributes} />
