<script lang="ts">
  import type { PageData } from "./$types";
  import Map from "$lib/components/Map.svelte";

  export let data: PageData;
</script>

<Map
  locations={data.locations}
  prefectureLat={data.lat}
  prefectureLon={data.lon}
/>
