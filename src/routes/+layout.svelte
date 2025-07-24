<script lang="ts">
  import { blur } from 'svelte/transition';
  import { context } from '$lib/config';

  import { scrollTracker } from '$lib/action/scrollTracker';
  import Header from '$lib/components/header';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  const { data, children } = $props();
</script>

<svelte:head>
  <title>{context.title}</title>
  <meta name="description" content={context.description} />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <div class="basis-header">
    <Header />
  </div>
  {#key data.url}
    <main class="flex-1" in:blur={{ duration: 150 }}>
      {@render children()}
    </main>
  {/key}
  <Footer />
</div>
