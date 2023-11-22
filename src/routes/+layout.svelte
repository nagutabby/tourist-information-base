<script lang="ts">
  import OpenGraph from "$lib/components/OpenGraph.svelte";
  import "../main.css";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <OpenGraph title={$page.data.title} description={$page.data.description} />
</svelte:head>

<slot />
