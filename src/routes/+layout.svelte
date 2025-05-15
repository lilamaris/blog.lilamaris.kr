<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { blur } from 'svelte/transition';

    import Header from '$lib/components/layout/Header.svelte';
    import { isScrolled } from '$lib/stores/layout';
    import { config } from '$lib/config';
    import { scrollTracker } from '$lib/action/scrollTracker';

    const { data, children } = $props();
</script>

<svelte:head>
    <title>{config.title}</title>
    <meta name="description" content={config.description} />
</svelte:head>

<div class="flex min-h-screen flex-col">
    <div class="basis-header" use:scrollTracker={isScrolled}>
        <Header isScrolled={$isScrolled} />
    </div>
    {#key data.url}
        <main class="min-w-none flex flex-1 flex-col md:min-w-2xl" in:blur={{ duration: 150 }}>
            {@render children()}
        </main>
    {/key}
</div>
