<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#each data.elements as element}
  {#if element.tags.attraction !== "animal"}
    {#if element.tags["name:ja"] !== undefined}
      <a href="/locations/{element.id}">
        <h1 class="text-3xl">
          {element.tags["name:ja"]}
        </h1>
      </a>
    {:else if element.tags.name !== undefined}
      <a href="/locations/{element.id}">
        <h1 class="text-3xl">
          {element.tags["name"]}
        </h1>
      </a>
    {/if}
  {/if}
{/each}
