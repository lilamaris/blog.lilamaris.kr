<script lang="ts">
    import { blur } from 'svelte/transition';

    const { url, children } = $props();
</script>

{#key url}
    <div in:blur={{ duration: 150, delay: 100 }}>
        {@render children()}
    </div>
{/key}
