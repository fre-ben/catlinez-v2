<script lang="ts">
  import Catline from "./lib/Catline.svelte";
</script>

<main>
  <div class="headlineContainer">
    <h1>CATLINEZ</h1>
    <span class="badge">v2</span>
  </div>

  <Catline />
</main>
<footer>
  made by <a
    href="https://github.com/fre-ben"
    target="_blank"
    rel="noreferrer noopener nofollow"
    class="hover:underline text-accent">fre-ben</a
  >
</footer>

<style>
  main {
    @apply grid w-full p-4 justify-items-center gap-y-10;
  }

  footer {
    @apply text-center text-xs mb-10;
  }

  h1 {
    @apply text-6xl text-white;
  }

  .headlineContainer {
    @apply flex justify-center items-center gap-x-4 relative;
  }

  .headlineContainer > span {
    @apply absolute top-9 -right-10;
  }
</style>
