<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  let dark: boolean = $state(false);

  onMount(() => {
    dark = document.documentElement.dataset.theme === 'dark';
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    matcher.addEventListener('change', handleChange);
  });

  function handleChange({ matches: dark }: MediaQueryListEvent) {
    if (!localStorage.getItem('theme')) {
      setMode(dark);
    }
  }

  function toggle() {
    setMode(!dark);
  }

  function setMode(value: boolean) {
    dark = value;
    value
      ? (document.documentElement.dataset.theme = 'dark')
      : (document.documentElement.dataset.theme = 'light');

    localStorage.setItem('theme', value ? 'dark' : 'light');

    if (window.matchMedia(`(prefers-color-scheme: ${localStorage.getItem('theme')})`).matches) {
      localStorage.removeItem('theme');
    }
  }

  interface Props {
    controller: Snippet<[boolean, () => void]>;
  }
  const { controller }: Props = $props();
</script>

<svelte:head>
  <script>
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.dataset.theme = 'dark';
    } else {
      document.documentElement.dataset.theme = 'light';
    }
  </script>
</svelte:head>

{@render controller(dark, toggle)}
