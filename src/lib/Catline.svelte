<script lang="ts">
  import type { CatGif, Headline } from "src/types";

  import { fade } from "svelte/transition";
  import { getCatGIF, getHeadline } from "../utils/api";

  let catPromise: Promise<CatGif>;
  let headlinePromise: Promise<Headline>;
  let catlinePromise = awaitPromises("en");

  async function awaitPromises(language: string): Promise<{
    cat: CatGif;
    headline: Headline;
  }> {
    headlinePromise = getHeadline(language);
    catPromise = getCatGIF();

    return Promise.all([headlinePromise, catPromise]).then((values) => {
      const [headline, cat] = values;
      return { headline, cat };
    });
  }

  function handleClick(language: string) {
    catlinePromise = awaitPromises(language);
  }
</script>

<div class="btnContainer">
  <button class="btn btn-accent" on:click={() => handleClick("de")}>German Catline</button>
  <button class="btn btn-accent" on:click={() => handleClick("en")}>English Catline</button>
</div>

<div class="catlineContainer">
  {#await catlinePromise}
    <span class="text-8xl animate-spin">😺</span>
  {:then { cat, headline }}
    <div class="grid place-items-center gap-y-4" in:fade={{ delay: 0, duration: 250 }}>
      <a href={headline.url} target="_blank" rel="noreferrer noopener nofollow" class="hover:underline">
        <h2 class="text-2xl">{headline.title}</h2>
      </a>
      <img class="rounded-md" src={cat.url} alt={cat.title} width="300px" />
    </div>
  {:catch error}
    <div class="grid place-items-center gap-y-4">
      <span class="text-8xl">😿</span>
      <p class="text-2xl">Oops, something went wrong...</p>
    </div>
  {/await}
</div>

<style>
  .btnContainer {
    @apply flex justify-center gap-x-5;
  }

  .catlineContainer {
    @apply grid justify-items-center h-60 items-center max-h-60;
  }
</style>
