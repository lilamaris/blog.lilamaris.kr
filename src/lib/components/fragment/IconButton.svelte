<script lang="ts">
    import { Icon, type IconNode, type IconProps } from '@lucide/svelte';
    import type { Component } from 'svelte';

    interface Props {
        name: string;
        href: string;
        icon: IconNode | Component<IconProps, {}, ''>;
    }

    const { name, href, icon: IconComponent }: Props = $props();
</script>

<a
    class="btn btn-sm btn-square tooltip tooltip-bottom"
    {href}
    target="_blank"
    data-tip={name}
    aria-label={name}
>
    {#if typeof IconComponent === 'function'}
        <IconComponent class="h-4 w-4" />
    {:else}
        <Icon class="h-4 w-4" iconNode={IconComponent} />
    {/if}
</a>
