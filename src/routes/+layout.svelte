<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/layout/Header.svelte';
    let { children } = $props();
    import { isScrolled } from '$lib/stores/layout';
    import { onMount } from 'svelte';
    import { config } from '$lib/config';

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

<div class="flex min-h-screen flex-col justify-stretch">
    <Header isScrolled={$isScrolled} />
    <main class="flex flex-1 flex-col" class:scrolledOffset={$isScrolled}>
        {@render children()}
    </main>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    .scrolledOffset {
        @apply pt-16;
    }
</style>
