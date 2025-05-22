<script lang="ts">
    import { Icon, type IconNode, type IconProps } from '@lucide/svelte';
    import type { Component } from 'svelte';

    interface Props {
        name: string;
        href: string;
        icon: IconNode | Component<IconProps, {}, ''>;
    }

    const { name, href, icon }: Props = $props();
</script>

<a
    class="btn btn-sm btn-square tooltip tooltip-bottom"
    {href}
    target="_blank"
    data-tip={name}
    aria-label={name}
>
    {#if typeof icon === 'function'}
        {@const IconComponent = icon}
        <IconComponent class="h-4 w-4" />
    {:else}
        <Icon class="h-4 w-4" iconNode={icon} />
    {/if}
</a>
