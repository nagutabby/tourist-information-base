<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<form action="/locations" class="flex justify-center gap-4">
  <select
    name="prefecture"
    class="select select-bordered w-full max-w-xs"
    required
  >
    <option value="" disabled selected>都道府県を選択</option>
    {#each data.prefectures as prefecture}
      <option value="{prefecture}">{prefecture}</option>
    {/each}
  </select>
  <button type="submit" class="btn btn-primary w-[10vw] text-lg">検索</button>
</form>
