<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/layout/Header.svelte';
    import { isScrolled } from '$lib/stores/layout';
    import { onMount } from 'svelte';
    import { config } from '$lib/config';
    import PageTransition from '$lib/components/layout/PageTransition.svelte';

    const { data, children } = $props();

    onMount(() => {
        const scrollHandler = () => {
            isScrolled.set(window.scrollY > 0);
        };
        window.addEventListener('scroll', scrollHandler);
        isScrolled.set(window.scrollY > 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    });
</script>

<svelte:head>
    <title>{config.title}</title>
    <meta name="description" content={config.description} />
</svelte:head>

<div class="flex min-h-screen flex-col items-center overflow-hidden">
    <Header isScrolled={$isScrolled} />
    <PageTransition url={data.url}>
        <main class="mt-24 flex flex-1 flex-col">
            {@render children()}
        </main>
    </PageTransition>
</div>
