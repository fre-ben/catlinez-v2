<script lang="ts">
  import { getCatGIF } from "../utils/api";

  let catPromise = getCatGIF();

  function handleClick() {
    catPromise = getCatGIF();
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
