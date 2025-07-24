<script lang="ts">
  import { Loader, Loader2, Search } from '@lucide/svelte';
  import HotKey from '$lib/components/HotKey.svelte';

  import { Popover } from 'melt/builders';
  import { fly } from 'svelte/transition';
  import { debounce } from '$lib/util';
  import type { Post } from '$lib/type';
  import IterableItem from '../IterableItem.svelte';

  let searchKeyword = $state('');
  let searchResults: Post[] = $state([]);
  let searchState: 'idle' | 'listen' | 'load' = $state('idle');

  let open = $derived(searchKeyword.length > 0);
  const popover = new Popover({
    open: () => open,
    onOpenChange(value) {
      open = value;
      if (!open) searchKeyword = '';
    },
    forceVisible: true,
    sameWidth: true
  });

  const search = async () => {
    searchState = 'load';
    const res = await fetch(`/api/search?keyword=${searchKeyword}`);
    const value = await res.json();
    searchResults = value;
    searchState = 'idle';
  };

  const debounceSearch = debounce(search, 200);
</script>

<svelte:window
  onkeydown={(event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      open = true;
      (document.querySelector('input[name="search"]') as HTMLInputElement).focus();
    }
  }}
/>

{#snippet SearchState(state: 'idle' | 'listen' | 'load')}
  {#if state != 'idle'}
    <div>
      <p>
        {#if state == 'listen'}
          <Loader2 class="animate-spin" />
        {:else}
          <Loader class="animate-spin" />
        {/if}
      </p>
    </div>
  {/if}
{/snippet}

{#snippet SearchResultRow(post: Post)}
  <li class="flex flex-col">
    <a
      href={`/write/${post.metadata.slug}`}
      aria-label={post.metadata.title}
      class="list-row group hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-content rounded-field p-2"
    >
      <h3 class="font-bold">
        {@html post.metadata.title}
      </h3>
      <p class="text-sm">
        {@html post.metadata.description}
      </p>
      <p class="group-hover:text-primary-content/70 text-xs">
        {@html post.content}
      </p>
    </a>
  </li>
{/snippet}

<label
  {...popover.trigger}
  class="input hidden focus-within:outline-none sm:flex"
  aria-label="검색"
>
  <Search class="h-4 opacity-50" />
  <input
    bind:value={searchKeyword}
    oninput={() => {
      searchState = 'listen';
      debounceSearch();
    }}
    type="text"
    name="search"
    placeholder="검색"
    class="grow"
  />
  <HotKey keys={['⌘', 'K']} />
</label>
{#if open}
  <div
    class="rounded-field border-base-300 bg-base-100 border-1 p-2 shadow-md"
    {...popover.content}
    transition:fly
  >
    {@render SearchState(searchState)}
    {#if searchState === 'load'}
      <p>Load...</p>
    {:else if searchState === 'idle'}
      {#if !searchResults.length}
        <p>Nothing here!</p>
      {:else}
        <IterableItem parent="ul" itemSnippet={SearchResultRow} items={searchResults} />
      {/if}
    {/if}
  </div>
{/if}
