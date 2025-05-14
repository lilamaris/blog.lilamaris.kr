<script lang="ts">
    import { writable, derived } from 'svelte/store';
    const dummyText = `
    <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  </p>
  `;

    let iterations = writable(10);
    const dummyTextArray = derived(iterations, ($iterations) =>
        Array.from({ length: $iterations }, () => dummyText)
    );
</script>

<input type="range" min="1" max="100" bind:value={$iterations} class="range range-primary" />

<div class="prose">
    {#each $dummyTextArray as text}
        {@html text}
    {/each}
</div>
