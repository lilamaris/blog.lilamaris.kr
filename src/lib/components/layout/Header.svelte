<script lang="ts">
    import { config } from '$lib/config';
    import { browser } from '$app/environment';
    import { preloadData, goto } from '$app/navigation';
    import { Home, Search, ArrowLeft, Sun, Moon } from '@lucide/svelte';
    import ThemeController from '$lib/components/fragment/ThemeController.svelte';
    import { onMount, onDestroy } from 'svelte';
    interface Props {
        isScrolled?: boolean;
    }

    let { isScrolled = false }: Props = $props();

    // Ctrl + K 키 이벤트 -> search input 포커스
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            (document.querySelector('input[name="search"]') as HTMLInputElement).focus();
        }
    };

    onMount(() => {
        if (browser) {
            window.addEventListener('keydown', handleKeyDown);
        }
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });
</script>

{#snippet themeController(onClick: () => void)}
    <label class="btn btn-square swap swap-rotate tooltip tooltip-bottom" data-tip="테마 변경">
        <input type="checkbox" class="theme-controller" onclick={onClick} />

        <Sun class="swap-on h-4" />
        <Moon class="swap-off h-4" />
    </label>
{/snippet}

<header
    class="fixed top-5 left-1/2 z-10 flex max-w-max shrink -translate-x-1/2 justify-between gap-2 p-2 transition-all select-none {isScrolled
        ? 'bg-base-100/80 rounded-box shadow-md backdrop-blur-md'
        : 'bg-inherit shadow-none'}"
>
    <a class="btn btn-square tooltip tooltip-base-100 tooltip-bottom" data-tip="홈으로" href="/">
        <Home class="h-4" />
    </a>
    <button class="tooltip btn btn-square tooltip-bottom" data-tip="뒤로 가기">
        <ArrowLeft class="h-4" />
    </button>
    <label class="input hidden focus-within:outline-none sm:flex">
        <Search class="h-4 opacity-50" />
        <input type="text" name="search" placeholder="검색" class="grow" />
        <kbd class="kbd kbd-sm">⌘</kbd>
        <kbd class="kbd kbd-sm">K</kbd>
    </label>

    <div class="flex items-center justify-end gap-2">
        <ThemeController controller={themeController} />
    </div>
</header>
