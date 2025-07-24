<script lang="ts" module>
  import type { TocItem } from '$lib/markdown/plugins';

  export interface Props {
    toc: TocItem[];
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  const { toc }: Props = $props();

  let currentId = $state('');

  const targetHeadings = ['h1[id]', 'h2[id]', 'h3[id]', 'h4[id]', 'h5[id]', 'h6[id]'];
  const refHeadings = targetHeadings.map((heading) => `article ${heading}`).join(', ');

  onMount(() => {
    const headings = document.querySelectorAll(refHeadings);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentId = entry.target.id;
        }
      });
    });
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  });
</script>

<ul class="border-base-content/30 ml-20 w-max border-l-2 pl-4">
  {#each toc as item}
    <li>
      <a
        class={`link  hover:text-base-content transition-transform ${currentId === item.id ? 'text-base-content block scale-105' : 'text-base-content/50'}`}
        style={`padding-left: ${item.depth * 1}rem`}
        href={`#${item.id}`}
      >
        {item.text}
      </a>
    </li>
  {/each}
</ul>
