<script lang="ts">
    import { Search } from '@lucide/svelte';
    import HotKey from '$lib/components/HotKey.svelte';
</script>

<svelte:window
    onkeydown={(event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            (document.querySelector('input[name="search"]') as HTMLInputElement).focus();
        }
    }}
/>

<label class="input hidden focus-within:outline-none sm:flex" aria-label="검색">
    <Search class="h-4 opacity-50" />
    <input type="text" name="search" placeholder="검색" class="grow" />
    <HotKey keys={['⌘', 'K']} />
</label>
