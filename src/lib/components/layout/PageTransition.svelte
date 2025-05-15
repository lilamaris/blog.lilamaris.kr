<script lang="ts">
    import { blur } from 'svelte/transition';

    interface Props {
        class?: string;
        url: string;
        children: any;
    }

    const { class: className, url, children }: Props = $props();
</script>

{#key url}
    <div class={className} in:blur={{ duration: 150 }}>
        {@render children()}
    </div>
{/key}
