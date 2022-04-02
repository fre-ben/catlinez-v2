<script lang="ts">
  import Catline from "./lib/Catline.svelte";
</script>

<main>
  <h1>CATLINEZ</h1>

  <Catline />
</main>

<style>
  main {
    @apply grid w-full p-4 justify-items-center gap-y-10;
  }

  h1 {
    @apply text-6xl text-white;
  }
</style>
