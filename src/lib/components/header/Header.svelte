<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  import { Home, ArrowLeft, Sun, Moon, Send } from '@lucide/svelte';
  import ThemeController from '../ThemeController.svelte';
  import SearchBar from './SearchBar.svelte';

  interface Props {
    isScrolled?: boolean;
  }

  let { isScrolled = false }: Props = $props();

  const goToParentRoute = (): void => {
    if (!browser) return;
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) {
      goto('/');
      return;
    }
    segments.pop();
    const parent = '/' + segments.join('/');
    goto(parent === '' ? '/' : parent);
  };
</script>

{#snippet themeController(dark: boolean, onClick: () => void)}
  <label
    class={`btn btn-square swap swap-rotate tooltip tooltip-base-100 tooltip-bottom focus-within:outline-2 ${isScrolled ? 'bg-base-100' : 'bg-base-300'}`}
    data-tip="테마 변경"
  >
    <input
      type="checkbox"
      class="theme-controller outline-0"
      onclick={onClick}
      checked={dark}
      aria-label="테마 변경"
    />

    <Sun class="swap-on h-4" />
    <Moon class="swap-off h-4" />
  </label>
{/snippet}

<header
  class="rounded-field fixed top-5 left-1/2 z-10 flex max-w-max shrink -translate-x-1/2 justify-between gap-2 p-2 transition-all select-none {isScrolled
    ? 'bg-base-300/60  shadow-md backdrop-blur-lg'
    : 'bg-inherit shadow-none'}"
>
  <a
    class={`btn btn-square tooltip tooltip-base-100 tooltip-bottom ${isScrolled ? 'bg-base-100' : 'bg-base-300'}`}
    data-tip="홈으로"
    href="/"
    aria-label="홈으로"
  >
    <Home class="h-4" />
  </a>
  <button
    class={`btn btn-square tooltip tooltip-base-100 tooltip-bottom ${isScrolled ? 'bg-base-100' : 'bg-base-300'}`}
    data-tip="뒤로 가기"
    aria-label="뒤로 가기"
    onclick={goToParentRoute}
  >
    <ArrowLeft class="h-4" />
  </button>
  <SearchBar />

  <ThemeController controller={themeController} />
  <button
    class={`btn btn-square tooltip tooltip-base-100 tooltip-bottom ${isScrolled ? 'bg-base-100' : 'bg-base-300'}`}
    data-tip="공유"
  >
    <Send class="h-4" />
  </button>
</header>
