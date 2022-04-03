<script lang="ts">
  import type { CatGif } from "src/types";

  async function fetchCatGIF(): Promise<CatGif> {
    const response = await fetch(`/api/cat`, { method: "GET" });
    const catGif = await response.json();

    if (response.ok) {
      return catGif;
    } else {
      throw new Error(catGif);
    }
  }

  let catPromise = fetchCatGIF();

  function handleClick() {
    catPromise = fetchCatGIF();
  }
</script>

<div class="btnContainer">
  <button class="btn btn-accent" on:click={handleClick}>German Catline</button>
  <button class="btn btn-accent">English Catline</button>
</div>

<div class="catContainer">
  {#await catPromise}
    <p>...Looking for cats</p>
  {:then cat}
    <img src={cat.url} alt={cat.title} width="300px" />
  {:catch error}
    <p>{error}</p>
  {/await}
</div>

<style>
  .btnContainer {
    @apply flex justify-center gap-x-5;
  }

  .catContainer {
    @apply grid justify-items-center h-60 items-center max-h-60;
  }
</style>
