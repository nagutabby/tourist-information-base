<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto my-10 w-[90vw] sm:w-full">
  <form
    action="/locations"
    class="flex flex-col sm:flex-row justify-center gap-4"
  >
    <select
      name="prefecture"
      class="select select-bordered w-full sm:w-[30vw]"
      required
    >
      <option value="" disabled selected>都道府県を選択</option>
      {#each data.prefectures as prefecture}
        <option value={prefecture}>{prefecture}</option>
      {/each}
    </select>
    <button type="submit" class="btn btn-primary w-full sm:w-[15vw] text-lg"
      >検索</button
    >
  </form>
</div>
