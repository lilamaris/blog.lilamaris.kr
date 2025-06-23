<script lang="ts">
    import { blur } from 'svelte/transition';
    import { context } from '$lib/utils/context';
    import { scrollTracker } from '$lib/action/scrollTracker';
    import { isScrolled } from '$lib/stores/layout';
    import Header from '$lib/components/home/Header.svelte';
    import Footer from '$lib/components/home/Footer.svelte';
    import '../app.css';

    const { data, children } = $props();
</script>

<svelte:head>
    <title>{context.title}</title>
    <meta name="description" content={context.description} />
</svelte:head>

<div class="flex min-h-screen flex-col">
    <div class="basis-header" use:scrollTracker={isScrolled}>
        <Header isScrolled={$isScrolled} />
    </div>
    {#key data.url}
        <main class="flex-1" in:blur={{ duration: 150 }}>
            {@render children()}
        </main>
    {/key}
    <Footer />
</div>
