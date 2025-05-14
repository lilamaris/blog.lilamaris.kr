<script lang="ts">
    import { config } from '$lib/config';
    import { Search } from '@lucide/svelte';
    import ThemeController from '$lib/components/fragment/ThemeController.svelte';
    import SVGIcons from '$lib/components/fragment/SVGIcons.svelte';
    interface Props {
        isScrolled?: boolean;
    }

    let { isScrolled = false }: Props = $props();
</script>

<header
    class="navbar flex items-center transition-colors select-none {isScrolled
        ? 'bg-base-100/80 fixed top-0 left-0 z-10 shadow-md backdrop-blur-md'
        : ''}"
>
    <a class="flex flex-1 items-center gap-2 justify-self-center" href="/">
        <SVGIcons class="fill-base-content h-10 w-10" name="logo" />
        <h1 class="text-fmd font-bold">{config.title}</h1>
    </a>
    <label class="input">
        <Search class="h-4 opacity-50" />
        <input type="search" placeholder="Search" class="grow" />
        <kbd class="kbd kbd-sm">⌘</kbd>
        <kbd class="kbd kbd-sm">K</kbd>
    </label>

    <div class="flex flex-1 items-center justify-end gap-2">
        <ThemeController />
    </div>
</header>
