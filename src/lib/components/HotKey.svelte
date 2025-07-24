<script lang="ts">
  interface Props {
    keys: string[];
  }

  const { keys }: Props = $props();
</script>

<div class="flex items-center gap-1">
  {#each keys as key, index}
    <kbd class="kbd kbd-sm">{key}</kbd>
    {#if index < keys.length - 1}
      <span class="text-base-content/60">+</span>
    {/if}
  {/each}
</div>
