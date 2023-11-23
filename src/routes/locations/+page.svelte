<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="overflow-y-auto [scrollbar-gutter:stable] h-[100vh]">
  <div class="container flex justify-center mx-auto my-10 w-[90%] sm:w-full">
    <details class="dropdown sm:w-[50%] flex justify-center">
      <summary class="btn">都道府県を選択</summary>
      <ul
        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full"
      >
        {#each data.prefectures as prefecture}
          <li>
            <a href="/locations/{prefecture}" class="flex justify-center"
              >{prefecture}</a
            >
          </li>
        {/each}
      </ul>
    </details>
  </div>
</div>
