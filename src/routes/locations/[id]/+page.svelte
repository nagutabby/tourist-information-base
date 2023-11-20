<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>
  {data.elements[0].tags.name}
</h1>
